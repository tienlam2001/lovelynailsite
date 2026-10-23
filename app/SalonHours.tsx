import type { SalonHours } from "./firebase-public";

export function SalonHoursList({ hours }: { hours: SalonHours }) {
  return (
    <div className="salon-hours">
      <p className="eyebrow">Hours</p>
      <ul>
        {hours.lines.map((line) => (
          <li key={line.label}>
            <span>{line.label}</span>
            <strong>{line.value}</strong>
          </li>
        ))}
      </ul>
      {hours.todayNotice ? <p className="hours-notice" role="status">{hours.todayNotice}</p> : null}
    </div>
  );
}

export function SalonToday({ hours, className = "salon-today" }: { hours: SalonHours; className?: string }) {
  if (hours.todayNotice) return <p className="hours-notice" role="status">{hours.todayNotice}</p>;
  return <p className={className}>Today: {hours.todayValue}</p>;
}
