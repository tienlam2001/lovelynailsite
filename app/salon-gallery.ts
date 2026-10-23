"use client";

import { useEffect, useState } from "react";
import { galleryItemsFromDocuments, listCollection, type GalleryItem } from "./firebase-public";

export type { GalleryItem };

const collections = ["gallery", "galleryImages"];

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
      const results = await Promise.all(collections.map((collection) => listCollection(collection, controller.signal)));
      if (controller.signal.aborted) return;
      if (results.every((result) => !result.ok)) {
        setImages(fallback);
        return;
      }
      const photos = galleryItemsFromDocuments(results.flatMap((result) => result.ok ? result.documents : []));
      setImages(photos.length ? photos : fallback);
    }
    load().catch(() => { if (!controller.signal.aborted) setImages(fallback); });
    return () => controller.abort();
  }, [fallback]);
  return images;
}
