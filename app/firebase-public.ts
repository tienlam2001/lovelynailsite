/**
 * Public client config for the shared Operatix / Casabella Firestore project.
 * Project and database ids are not secrets. Do not add service-account keys,
 * admin tokens, or Base44 service credentials here.
 */
export type FirestoreValue = {
  stringValue?: string;
  integerValue?: string;
  doubleValue?: number;
  booleanValue?: boolean;
  timestampValue?: string;
  nullValue?: null;
  arrayValue?: { values?: FirestoreValue[] };
  mapValue?: { fields?: Record<string, FirestoreValue> };
};

export type FirestoreDocument = {
  name: string;
  fields?: Record<string, FirestoreValue>;
  updateTime?: string;
  createTime?: string;
};

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

export type MenuItem = [service: string, price: string, description?: string];
export type MenuSection = {
  title: string;
  note: string;
  featured?: boolean;
  items: MenuItem[];
};

export type GalleryItem = {
  title: string;
  image: string;
  category?: string;
};

const DEFAULT_PROJECT_ID = "casabellanailsspawebsite";
const DEFAULT_DATABASE_ID = "(default)";
const LOCATION_STOP_WORDS = new Set(["and", "spa", "nail", "nails"]);

type ContentRecord = {
  fields: Record<string, unknown>;
  documentId: string;
  updatedAt: string;
};

export function firebaseProjectId(): string {
  const value = envValue("NEXT_PUBLIC_FIREBASE_PROJECT_ID") || envValue("FIREBASE_PROJECT_ID");
  return /^[a-z0-9-]+$/.test(value) ? value : DEFAULT_PROJECT_ID;
}

export function firebaseDatabaseId(): string {
  const value = envValue("NEXT_PUBLIC_FIREBASE_DATABASE_ID") || envValue("FIREBASE_DATABASE_ID") || DEFAULT_DATABASE_ID;
  return value === DEFAULT_DATABASE_ID || /^[A-Za-z0-9_-]+$/.test(value) ? value : DEFAULT_DATABASE_ID;
}

export function firebaseDatabasePath(): string {
  return `projects/${firebaseProjectId()}/databases/${firebaseDatabaseId()}`;
}

export function firestoreCommitUrl(): string {
  return `https://firestore.googleapis.com/v1/${firebaseDatabasePath()}/documents:commit`;
}

function envValue(name: string): string {
  try {
    const value = typeof process !== "undefined" ? process.env?.[name] : undefined;
    return typeof value === "string" ? value.trim() : "";
  } catch {
    return "";
  }
}

export function decodeFirestore(value: FirestoreValue): unknown {
  if (value.stringValue !== undefined) return value.stringValue;
  if (value.booleanValue !== undefined) return value.booleanValue;
  if (value.timestampValue !== undefined) return value.timestampValue;
  if (value.integerValue !== undefined) return Number(value.integerValue);
  if (value.doubleValue !== undefined) return value.doubleValue;
  if (value.nullValue !== undefined) return null;
  if (value.arrayValue) return (value.arrayValue.values ?? []).map(decodeFirestore);
  if (value.mapValue) return decodeFields(value.mapValue.fields ?? {});
  return null;
}

export function decodeFields(fields: Record<string, FirestoreValue>): Record<string, unknown> {
  return Object.fromEntries(Object.entries(fields).map(([key, value]) => [key, decodeFirestore(value)]));
}

export function text(value: unknown, fallback = ""): string {
  return typeof value === "string" ? value.trim() : fallback;
}

/** Same salon key Operatix uses: drop "nail(s)", "spa", and "and". */
export function locationKey(value: string): string {
  return value
    .toLowerCase()
    .replace(/&/g, " ")
    .split(/\s+/)
    .filter((token) => token && !LOCATION_STOP_WORDS.has(token))
    .join(" ");
}

export function isLovelyRecord(identity: {
  location?: string;
  salonname?: string;
  business?: string;
  documentId?: string;
}): boolean {
  const location = identity.location?.trim() ?? "";
  if (location) return locationKey(location) === "lovely";
  const names = [identity.salonname, identity.business]
    .map((value) => value?.trim() ?? "")
    .filter(Boolean);
  if (names.length) return names.some((value) => locationKey(value) === "lovely");
  return locationKey(identity.documentId ?? "") === "lovely";
}

function flag(value: unknown): boolean | undefined {
  if (typeof value === "boolean") return value;
  if (value === "true") return true;
  if (value === "false") return false;
  return undefined;
}

export function salonDate(now: Date): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/New_York",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(now);
}

function dateOnly(value: unknown): string {
  const date = text(value);
  return /^\d{4}-\d{2}-\d{2}$/.test(date) ? date : "";
}

const INACTIVE_STATUSES = new Set(["draft", "archived", "inactive", "disabled", "paused", "expired", "hidden"]);

export function isActiveContent(fields: Record<string, unknown>, now: Date, options?: { dates?: boolean }): boolean {
  if (flag(fields.enabled) === false || flag(fields.active) === false || flag(fields.isActive) === false) return false;
  if (flag(fields.hidden) === true) return false;
  const status = text(fields.status).toLowerCase();
  if (status && INACTIVE_STATUSES.has(status)) return false;
  if (options?.dates === false) return true;
  const today = salonDate(now);
  const start = dateOnly(fields.startDate ?? fields.startsAt);
  const end = dateOnly(fields.endDate ?? fields.endsAt);
  if (start && start > today) return false;
  if (end && end < today) return false;
  return true;
}

function documentId(name: string): string {
  const id = name.split("/").pop() ?? "";
  try {
    return decodeURIComponent(id);
  } catch {
    return id;
  }
}

function asRecord(documents: FirestoreDocument[]): ContentRecord[] {
  return documents.map((document) => {
    const fields = decodeFields(document.fields ?? {});
    return {
      fields,
      documentId: documentId(document.name),
      updatedAt: document.updateTime || text(fields.updatedAt),
    };
  });
}

function publishedLovely(records: ContentRecord[], now: Date, options?: { dates?: boolean }): ContentRecord[] {
  return records
    .filter((record) => isLovelyRecord({
      location: text(record.fields.location),
      salonname: text(record.fields.salonname || record.fields.salonName),
      business: text(record.fields.business),
      documentId: record.documentId,
    }) && isActiveContent(record.fields, now, options))
    .sort((first, second) => second.updatedAt.localeCompare(first.updatedAt));
}

export function safeUrl(value: string, fallback: string): string {
  if (value.startsWith("#")) return value;
  if (value.startsWith("/") && !value.startsWith("//") && !value.includes("\\")) return value;
  try {
    if (new URL(value).protocol === "https:") return value;
  } catch {}
  return fallback;
}

export function offerHref(path: string, bookingUrl: string): string {
  const sections: Record<string, string> = {
    "/": "#home",
    "/promotions": "#promotions",
    "/services": "#services",
    "/menu": "#menu",
    "/gallery": "#gallery",
    "/contact": "#contact",
    "/booking": bookingUrl,
  };
  return sections[path] ?? safeUrl(path, "#promotions");
}

function slideDuration(value: unknown): number {
  const duration = Number(value);
  return Number.isFinite(duration) && duration >= 1000 && duration <= 60000 ? duration : 6500;
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

function slidesFromOffer(fields: Record<string, unknown>): OfferSlide[] {
  const base = normalizeSlide(fields);
  const slides = Array.isArray(fields.slides) && fields.slides.length
    ? fields.slides
      .filter((slide) => slide && typeof slide === "object" && !Array.isArray(slide))
      .map((slide) => normalizeSlide(slide as Record<string, unknown>, base))
      .filter((slide) => slide.title)
    : base.title ? [base] : [];
  return slides;
}

function slidesFromPromotion(fields: Record<string, unknown>): OfferSlide[] {
  const title = text(fields.title);
  if (!title) return [];
  return [normalizeSlide({
    title,
    message: text(fields.description) || text(fields.message) || text(fields.offer),
    badge: text(fields.offer) || text(fields.badge) || "Promotion",
    kicker: text(fields.kicker) || "Lovely Nail & Spa",
    imageUrl: text(fields.imageUrl),
    ctaLabel: text(fields.ctaLabel) || "View More Details",
    ctaPath: text(fields.ctaPath) || "/promotions",
  })];
}

export function welcomeOfferFromDocuments(
  offerDocuments: FirestoreDocument[],
  promotionDocuments: FirestoreDocument[] = [],
  now = new Date(),
): WelcomeOffer | null {
  const offers = publishedLovely(asRecord(offerDocuments), now);
  const promotions = publishedLovely(asRecord(promotionDocuments), now);
  const slides = [
    ...offers.flatMap((record) => slidesFromOffer(record.fields)),
    ...promotions.flatMap((record) => slidesFromPromotion(record.fields)),
  ];
  if (!slides.length) return null;
  return {
    slides,
    slideDurationMs: slideDuration(offers[0]?.fields.slideDurationMs ?? promotions[0]?.fields.slideDurationMs),
  };
}

function httpsUrl(value: unknown): string {
  const image = text(value);
  if (!image || !URL.canParse(image)) return "";
  const url = new URL(image);
  return url.protocol === "https:" ? url.href : "";
}

export function galleryItemsFromDocuments(documents: FirestoreDocument[]): GalleryItem[] {
  const photos: (GalleryItem & { featured: boolean; sortOrder: number; createdAt: string })[] = [];
  const seen = new Set<string>();
  for (const record of publishedLovely(asRecord(documents), new Date(), { dates: false })) {
    const image = httpsUrl(record.fields.imageUrl);
    if (!image || seen.has(image)) continue;
    seen.add(image);
    const tags = Array.isArray(record.fields.tags) ? record.fields.tags.map((tag) => text(tag)).filter(Boolean) : [];
    const category = text(record.fields.category) || tags[0] || undefined;
    photos.push({
      image,
      title: text(record.fields.alt) || text(record.fields.title) || "Lovely Nail & Spa nail design",
      category,
      featured: flag(record.fields.featured) === true,
      sortOrder: Number.isFinite(Number(record.fields.sortOrder)) ? Number(record.fields.sortOrder) : Number.MAX_SAFE_INTEGER,
      createdAt: text(record.fields.createdAt) || record.updatedAt,
    });
  }
  photos.sort((first, second) => {
    if (first.featured !== second.featured) return first.featured ? -1 : 1;
    if (first.sortOrder !== second.sortOrder) return first.sortOrder - second.sortOrder;
    return second.createdAt.localeCompare(first.createdAt);
  });
  return photos.map(({ title, image, category }) => ({ title, image, category }));
}

function integerPrice(value: unknown): number | null {
  const price = typeof value === "number" ? value : Number.NaN;
  if (!Number.isInteger(price) || price < 0 || price > 10000) return null;
  return price;
}

export function menuSectionsFromDocuments(documents: FirestoreDocument[]): MenuSection[] {
  const sections = new Map<string, {
    title: string;
    note: string;
    order: number;
    items: { value: MenuItem; order: number }[];
  }>();

  for (const record of asRecord(documents)) {
    if (!isLovelyRecord({
      location: text(record.fields.location),
      salonname: text(record.fields.salonname || record.fields.salonName),
      business: text(record.fields.business),
      documentId: record.documentId,
    })) continue;
    if (flag(record.fields.active) === false || flag(record.fields.hidden) === true) continue;
    const name = text(record.fields.name);
    const category = text(record.fields.category);
    const price = integerPrice(record.fields.priceFrom);
    if (!name || !category || price === null) continue;
    const sectionOrder = Number(record.fields.sectionOrder ?? Infinity);
    const itemOrder = Number(record.fields.itemOrder ?? Infinity);
    const note = text(record.fields.sectionNote);
    let section = sections.get(category);
    if (!section) {
      section = { title: category, note, order: sectionOrder, items: [] };
      sections.set(category, section);
    }
    section.order = Math.min(section.order, sectionOrder);
    const displayPrice = flag(record.fields.priceVaries) === true
      ? "Price Varies"
      : `${text(record.fields.pricePrefix) === "+" ? "+" : ""}$${price}${text(record.fields.priceSuffix) === "+" ? "+" : ""}`;
    const details = text(record.fields.shortDescription);
    section.items.push({
      value: [name, displayPrice, details && details !== (section.note || note) ? details : undefined],
      order: itemOrder,
    });
  }

  return [...sections.values()]
    .sort((first, second) => first.order - second.order || first.title.localeCompare(second.title))
    .map((section) => ({
      title: section.title,
      note: section.note,
      featured: section.title === "Pedicures" || section.title === "Acrylic",
      items: section.items
        .sort((first, second) => first.order - second.order || first.value[0].localeCompare(second.value[0]))
        .map((item) => item.value),
    }));
}

export async function listCollection(
  collectionId: string,
  signal?: AbortSignal,
): Promise<{ ok: true; documents: FirestoreDocument[] } | { ok: false }> {
  if (!/^[A-Za-z][A-Za-z0-9_]*$/.test(collectionId)) return { ok: false };
  try {
    const documents: FirestoreDocument[] = [];
    let pageToken = "";
    do {
      const url = new URL(`https://firestore.googleapis.com/v1/${firebaseDatabasePath()}/documents/${collectionId}`);
      url.searchParams.set("pageSize", "300");
      if (pageToken) url.searchParams.set("pageToken", pageToken);
      const response = await fetch(url, { cache: "no-store", signal });
      if (!response.ok) return { ok: false };
      const data = await response.json() as { documents?: FirestoreDocument[]; nextPageToken?: string };
      documents.push(...(data.documents ?? []));
      pageToken = data.nextPageToken ?? "";
    } while (pageToken);
    return { ok: true, documents };
  } catch {
    return { ok: false };
  }
}
