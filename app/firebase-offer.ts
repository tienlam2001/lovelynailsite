import {
  listCollection,
  welcomeOfferFromDocuments,
  type WelcomeOffer,
} from "./firebase-public";

export { offerHref, type OfferSlide, type WelcomeOffer } from "./firebase-public";

export type OfferFeedStatus = "ready" | "empty" | "unavailable";

export type OfferFeed = {
  status: OfferFeedStatus;
  offer: WelcomeOffer | null;
};

export async function getFirebaseOffer(now = new Date()): Promise<OfferFeed> {
  const signal = AbortSignal.timeout(4000);
  const [offers, promotions] = await Promise.all([
    listCollection("offers", signal),
    listCollection("promotions", signal),
  ]);
  const offer = welcomeOfferFromDocuments(
    offers.ok ? offers.documents : [],
    promotions.ok ? promotions.documents : [],
    now,
  );
  if (offer) return { status: "ready", offer };
  if (!offers.ok) return { status: "unavailable", offer: null };
  return { status: "empty", offer: null };
}
