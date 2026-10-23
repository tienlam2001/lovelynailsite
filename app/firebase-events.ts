import {
  decodeFields,
  firebaseDatabasePath,
  queryPublicMarketingEvents,
  text,
  upcomingMarketingEvents,
  type MarketingEvent,
} from "./firebase-public";

export type { MarketingEvent };

async function offerTitle(offerId: string, signal: AbortSignal): Promise<string> {
  try {
    const response = await fetch(
      `https://firestore.googleapis.com/v1/${firebaseDatabasePath()}/documents/offers/${offerId}`,
      { cache: "no-store", signal },
    );
    if (!response.ok) return "";
    const document = await response.json() as { fields?: Parameters<typeof decodeFields>[0] };
    return text(decodeFields(document.fields ?? {}).title);
  } catch {
    return "";
  }
}

export async function getMarketingEvents(now = new Date()): Promise<MarketingEvent[]> {
  const signal = AbortSignal.timeout(4000);
  const result = await queryPublicMarketingEvents(signal);
  if (!result.ok) return [];
  const events = upcomingMarketingEvents(result.documents, now);
  const titles = new Map<string, string>();
  await Promise.all([...new Set(events.map((event) => event.offerId).filter(Boolean))].map(async (offerId) => {
    titles.set(offerId, await offerTitle(offerId, signal));
  }));
  return events.map((event) => ({
    ...event,
    offerTitle: event.offerId ? titles.get(event.offerId) ?? "" : "",
  }));
}
