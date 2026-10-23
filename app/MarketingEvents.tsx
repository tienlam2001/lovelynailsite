import { formatEventDates, type MarketingEvent } from "./firebase-public";

type MarketingEventsProps = {
  events: MarketingEvent[];
  offerAnchor?: string;
  variant?: "desktop" | "mobile";
};

export function MarketingEvents({ events, offerAnchor = "#promotions", variant = "desktop" }: MarketingEventsProps) {
  if (!events.length) return null;
  const titleId = variant === "desktop" ? "lovely-events-title" : "lovely-mobile-events-title";
  return (
    <section
      className={variant === "desktop" ? "section-pad events-section" : "lm-events"}
      aria-labelledby={titleId}
    >
      <div className="section-heading" data-reveal="fade-up">
        <p className="eyebrow">Happenings</p>
        <h2 id={titleId}>Upcoming at Lovely.</h2>
      </div>
      <div className="events-grid">
        {events.map((event) => (
          <article className="event-card" key={event.id} data-reveal="fade-up">
            {event.imageUrl && (
              <img src={event.imageUrl} alt="" width={900} height={560} />
            )}
            <div className="event-card-copy">
              {event.eventType && <span className="offer-badge">{event.eventType}</span>}
              <p className="eyebrow">{event.timing === "current" ? "Happening now" : "Upcoming"}</p>
              <h3>{event.title}</h3>
              <p className="event-date">{formatEventDates(event.startDate, event.endDate)}</p>
              {event.summary && <p>{event.summary}</p>}
              {event.location === "all" && <p className="event-scope">All Operatix salons, including Lovely.</p>}
              {event.offerId && (
                <a className="button" href={offerAnchor}>
                  {event.offerTitle ? `View ${event.offerTitle}` : "View this offer"}
                </a>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
