export type SalonHours = {
  monday: string;
  tuesday: string;
  wednesday: string;
  thursday: string;
  friday: string;
  saturday: string;
  sunday: string;
  note: string;
};

// Canonical fallback hours, used only if the `locationHours/lovely` Firestore doc is
// unavailable. Managed from NailsSalonManagement's Firestore Content page so both salon
// sites read the same hours instead of each hardcoding their own copy.
const DEFAULT_HOURS: SalonHours = {
  monday: "9:30a – 7:00p",
  tuesday: "9:30a – 7:00p",
  wednesday: "9:30a – 7:00p",
  thursday: "9:30a – 7:00p",
  friday: "9:30a – 7:00p",
  saturday: "9:30a – 6:00p",
  sunday: "11:00a – 5:00p",
  note: "",
};

type FirestoreDocument = {
  fields?: Record<string, { stringValue?: string }>;
};

export async function getFirebaseHours(fallback: SalonHours = DEFAULT_HOURS): Promise<SalonHours> {
  try {
    const url =
      "https://firestore.googleapis.com/v1/projects/casabellanailsspawebsite/databases/(default)/documents/locationHours/lovely";
    const response = await fetch(url, { signal: AbortSignal.timeout(4000), cache: "no-store" });
    if (!response.ok) return fallback;
    const data: FirestoreDocument = await response.json();
    const fields = data.fields ?? {};
    const text = (key: keyof SalonHours) => fields[key]?.stringValue?.trim();
    return {
      monday: text("monday") || fallback.monday,
      tuesday: text("tuesday") || fallback.tuesday,
      wednesday: text("wednesday") || fallback.wednesday,
      thursday: text("thursday") || fallback.thursday,
      friday: text("friday") || fallback.friday,
      saturday: text("saturday") || fallback.saturday,
      sunday: text("sunday") || fallback.sunday,
      note: text("note") ?? fallback.note,
    };
  } catch {
    return fallback;
  }
}
