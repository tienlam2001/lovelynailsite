"use client";

import { useEffect, useState } from "react";

export type GalleryItem = { title: string; image: string; category?: string };
type GalleryDocument = { fields?: Record<string, { stringValue?: string }> };
const galleryEndpoint = "https://firestore.googleapis.com/v1/projects/casabellanailsspawebsite/databases/(default)/documents/galleryImages";

export function galleryCategory(item: GalleryItem) {
  if (item.category) return item.category;
  if (/salon|interior|studio|reception|spa chair/i.test(item.title)) return "Salon";
  if (/french|tips/i.test(item.title)) return "French tips";
  return "Nail art";
}

export function useSalonGallery(fallback: GalleryItem[]) {
  const [images, setImages] = useState(fallback);
  useEffect(() => {
    const controller = new AbortController();
    async function load() {
      const photos: GalleryItem[] = [];
      let pageToken = "";
      do {
        const url = new URL(galleryEndpoint);
        url.searchParams.set("pageSize", "1000");
        if (pageToken) url.searchParams.set("pageToken", pageToken);
        const response = await fetch(url, { signal: controller.signal });
        if (!response.ok) throw new Error("Gallery unavailable");
        const data: { documents?: GalleryDocument[]; nextPageToken?: string } = await response.json();
        for (const { fields = {} } of data.documents ?? []) {
          const salon = fields.salonname?.stringValue?.trim().toLowerCase();
          const image = fields.imageUrl?.stringValue?.trim();
          if (salon !== "lovely nail & spa" || !image || !URL.canParse(image)) continue;
          const imageUrl = new URL(image);
          if (imageUrl.protocol !== "https:") continue;
          photos.push({ image: imageUrl.href, title: fields.alt?.stringValue?.trim() || "Lovely Nail & Spa nail design", category: fields.category?.stringValue?.trim() });
        }
        pageToken = data.nextPageToken ?? "";
      } while (pageToken && !controller.signal.aborted);
      if (!controller.signal.aborted && photos.length) setImages(photos);
    }
    load().catch(() => { if (!controller.signal.aborted) setImages(fallback); });
    return () => controller.abort();
  }, [fallback]);
  return images;
}
