"use client";

import Image from "next/image";

const OPTIMIZED_HOSTS = new Set(["media.base44.com", "firebasestorage.googleapis.com"]);

function optimizedHost(src: string): boolean {
  if (!src.startsWith("https://")) return false;
  try {
    return OPTIMIZED_HOSTS.has(new URL(src).hostname);
  } catch {
    return false;
  }
}

export function GalleryImage({
  src,
  alt,
  width,
  height,
  sizes,
  className,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  sizes?: string;
  className?: string;
}) {
  const remote = src.startsWith("https://");
  if (!remote || optimizedHost(src)) {
    return (
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        sizes={sizes}
        className={className}
        unoptimized={!remote}
      />
    );
  }
  return <img src={src} alt={alt} width={width} height={height} className={className} loading="lazy" />;
}
