"use client";

import { useEffect, useRef, useState } from "react";

type GalleryItem = { title: string; image: string };
type GalleryDocument = {
  name: string;
  fields?: Record<string, { stringValue?: string }>;
};

const galleryEndpoint =
  "https://firestore.googleapis.com/v1/projects/casabellanailsspawebsite/databases/(default)/documents/galleryImages";

export function Gallery({ fallback }: { fallback: GalleryItem[] }) {
  const [images, setImages] = useState(fallback);
  const grid = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tiles = grid.current?.querySelectorAll("[data-reveal]") ?? [];
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      tiles.forEach((tile) => tile.classList.add("is-visible"));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        entry.target.classList.toggle("is-visible", entry.isIntersecting);
      }),
      { rootMargin: "0px 0px -12% 0px", threshold: 0.14 },
    );
    tiles.forEach((tile) => observer.observe(tile));
    return () => observer.disconnect();
  }, [images]);

  useEffect(() => {
    const controller = new AbortController();

    async function loadGallery() {
      const photos: GalleryItem[] = [];
      let pageToken = "";
      do {
        const url = new URL(galleryEndpoint);
        url.searchParams.set("pageSize", "1000");
        if (pageToken) url.searchParams.set("pageToken", pageToken);
        const response = await fetch(url, { signal: controller.signal });
        if (!response.ok) throw new Error("Gallery unavailable");
        const data: { documents?: GalleryDocument[]; nextPageToken?: string } =
          await response.json();
        for (const photo of data.documents ?? []) {
          const fields = photo.fields ?? {};
          const salon = fields.salonname?.stringValue?.trim().toLowerCase();
          const image = fields.imageUrl?.stringValue?.trim();
          if (salon !== "lovely nail & spa" || !image || !URL.canParse(image)) continue;
          const imageUrl = new URL(image);
          if (imageUrl.protocol !== "https:") continue;
          photos.push({
            image: imageUrl.href,
            title: fields.alt?.stringValue?.trim() || "Lovely Nail & Spa nail design",
          });
        }
        pageToken = data.nextPageToken ?? "";
      } while (pageToken && !controller.signal.aborted);
      if (!controller.signal.aborted && photos.length) setImages(photos);
    }

    loadGallery().catch(() => {
      if (!controller.signal.aborted) setImages(fallback);
    });
    return () => controller.abort();
  }, [fallback]);

  return (
    <div className="gallery-grid" ref={grid}>
      {images.map((item, index) => (
        <div className={`gallery-tile tile-${index + 1}`} key={`${item.image}-${index}`} data-reveal="zoom-soft">
          <img src={item.image} alt={item.title} loading="lazy" />
          <span>{item.title}</span>
        </div>
      ))}
    </div>
  );
}
