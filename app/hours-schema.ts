import type { SalonHours } from "./firebase-hours";
export function hoursSchema(hours: SalonHours) {
  const days = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"] as const;
  const time = (h: string, m: string | undefined, period: string) => `${String((Number(h) % 12) + (period.toLowerCase() === "p" ? 12 : 0)).padStart(2, "0")}:${m || "00"}`;
  return days.flatMap((day) => {
    const match = hours[day].match(/(\d{1,2})(?::(\d{2}))?\s*([ap])(?:m)?\s*[–—-]\s*(\d{1,2})(?::(\d{2}))?\s*([ap])(?:m)?/i);
    if (!match) return [];
    return [{ "@type": "OpeningHoursSpecification", dayOfWeek: `https://schema.org/${day[0].toUpperCase()}${day.slice(1)}`, opens: time(match[1], match[2], match[3]), closes: time(match[4], match[5], match[6]) }];
  });
}
