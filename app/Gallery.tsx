"use client";

import { useEffect, useRef } from "react";
import { useSalonGallery, type GalleryItem } from "./salon-gallery";

export function Gallery({ fallback }: { fallback: GalleryItem[] }) {
  const images = useSalonGallery(fallback);
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
