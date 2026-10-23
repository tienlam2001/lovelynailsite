import { decodeFields, firebaseDatabasePath, resolveSalonHours, type SalonHours } from "./firebase-public";

export type { SalonHours };

export async function getSalonHours(now = new Date()): Promise<SalonHours> {
  try {
    const response = await fetch(
      `https://firestore.googleapis.com/v1/${firebaseDatabasePath()}/documents/salonHours/lovely`,
      { cache: "no-store", signal: AbortSignal.timeout(4000) },
    );
    if (!response.ok) return resolveSalonHours(null, now);
    const document = await response.json() as { fields?: Parameters<typeof decodeFields>[0] };
    return resolveSalonHours(decodeFields(document.fields ?? {}), now);
  } catch {
    return resolveSalonHours(null, now);
  }
}
