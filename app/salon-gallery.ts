"use client";

import { useEffect, useState } from "react";
import { galleryItemsFromDocuments, listCollection, queryPublicGalleryImages, type GalleryItem } from "./firebase-public";

export type { GalleryItem };

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
      const [queried, listed] = await Promise.all([
        queryPublicGalleryImages(controller.signal),
        listCollection("galleryImages", controller.signal),
      ]);
      if (controller.signal.aborted) return;
      if (!queried.ok && !listed.ok) {
        setImages(fallback);
        return;
      }
      const photos = galleryItemsFromDocuments([
        ...(queried.ok ? queried.documents : []),
        ...(listed.ok ? listed.documents : []),
      ]);
      setImages(photos.length ? photos : fallback);
    }
    load().catch(() => { if (!controller.signal.aborted) setImages(fallback); });
    return () => controller.abort();
  }, [fallback]);
  return images;
}
