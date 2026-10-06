export type OfferSlide = {
  kicker: string;
  title: string;
  badge: string;
  message: string;
  imageUrl: string;
  ctaLabel: string;
  ctaPath: string;
};

export type WelcomeOffer = { slides: OfferSlide[]; slideDurationMs: number };

type FirestoreValue = {
  stringValue?: string;
  integerValue?: string;
  doubleValue?: number;
  booleanValue?: boolean;
  arrayValue?: { values?: FirestoreValue[] };
  mapValue?: { fields?: Record<string, FirestoreValue> };
};

function decode(value: FirestoreValue): unknown {
  if (value.stringValue !== undefined) return value.stringValue;
  if (value.booleanValue !== undefined) return value.booleanValue;
  if (value.integerValue !== undefined) return Number(value.integerValue);
  if (value.doubleValue !== undefined) return value.doubleValue;
  if (value.arrayValue) return (value.arrayValue.values ?? []).map(decode);
  if (value.mapValue) return decodeFields(value.mapValue.fields ?? {});
  return null;
}

function decodeFields(fields: Record<string, FirestoreValue>): Record<string, unknown> {
  return Object.fromEntries(Object.entries(fields).map(([key, value]) => [key, decode(value)]));
}

function text(value: unknown, fallback = ""): string {
  return typeof value === "string" ? value.trim() : fallback;
}

function safeUrl(value: string, fallback: string): string {
  if (value.startsWith("#")) return value;
  if (value.startsWith("/") && !value.startsWith("//") && !value.includes("\\")) return value;
  try {
    if (new URL(value).protocol === "https:") return value;
  } catch {}
  return fallback;
}

export function offerHref(path: string, bookingUrl: string): string {
  const sections: Record<string, string> = {
    "/": "#home", "/promotions": "#promotions", "/services": "#services",
    "/menu": "#menu", "/gallery": "#gallery", "/contact": "#contact", "/booking": bookingUrl,
  };
  return sections[path] ?? safeUrl(path, "#promotions");
}

function normalizeSlide(fields: Record<string, unknown>, base?: OfferSlide): OfferSlide {
  const imageUrl = text(fields.imageUrl, base?.imageUrl);
  return {
    kicker: text(fields.kicker, base?.kicker ?? "Welcome to Lovely Nail & Spa"),
    title: text(fields.title, base?.title),
    badge: text(fields.badge, base?.badge),
    message: text(fields.message, base?.message),
    imageUrl: imageUrl.startsWith("#") ? "" : safeUrl(imageUrl, ""),
    ctaLabel: text(fields.ctaLabel, base?.ctaLabel ?? "View More Details"),
    ctaPath: safeUrl(text(fields.ctaPath, base?.ctaPath ?? "/promotions"), "/promotions"),
  };
}

export async function getFirebaseOffer(): Promise<WelcomeOffer | null> {
  try {
    const response = await fetch(
      "https://firestore.googleapis.com/v1/projects/casabellanailsspawebsite/databases/(default)/documents/offers/lovely",
      { cache: "no-store", signal: AbortSignal.timeout(4000) },
    );
    if (!response.ok) return null;
    const document = await response.json() as { fields?: Record<string, FirestoreValue> };
    const fields = decodeFields(document.fields ?? {});
    if (fields.enabled === false || (text(fields.location) && fields.location !== "lovely")) return null;
    const base = normalizeSlide(fields);
    const slides = Array.isArray(fields.slides) && fields.slides.length
      ? fields.slides.filter((slide) => slide && typeof slide === "object" && !Array.isArray(slide))
        .map((slide) => normalizeSlide(slide as Record<string, unknown>, base)).filter((slide) => slide.title)
      : base.title ? [base] : [];
    if (!slides.length) return null;
    const duration = Number(fields.slideDurationMs);
    return { slides, slideDurationMs: Number.isFinite(duration) && duration >= 1000 && duration <= 60000 ? duration : 6500 };
  } catch {
    return null;
  }
}
