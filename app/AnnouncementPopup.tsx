"use client";

import { useEffect, useRef, useState } from "react";
import { offerHref, type WelcomeOffer } from "./firebase-offer";

type AnnouncementPopupProps = {
  bookingUrl: string;
  offer: WelcomeOffer | null;
};

const storageKey = "lovely-welcome-offer-dismissed";

export function AnnouncementPopup({ bookingUrl, offer }: AnnouncementPopupProps) {
  const [view, setView] = useState<"hidden" | "modal" | "tab">("hidden");
  const [doNotShowAgain, setDoNotShowAgain] = useState(false);
  const dialogRef = useRef<HTMLElement>(null);
  const slide = offer?.slides[0];

  useEffect(() => {
    if (!offer) return;
    try {
      if (window.localStorage.getItem(storageKey) === "true") return;
    } catch {}

    const timer = window.setTimeout(() => setView("modal"), 700);
    return () => window.clearTimeout(timer);
  }, [offer]);

  useEffect(() => {
    if (view !== "modal") return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialogRef.current?.querySelector<HTMLButtonElement>("button")?.focus();
    return () => {
      document.body.style.overflow = previousOverflow;
      previouslyFocused?.focus();
    };
  }, [view]);

  const dismiss = () => {
    if (doNotShowAgain) {
      try { window.localStorage.setItem(storageKey, "true"); } catch {}
      setView("hidden");
      return;
    }

    setView("tab");
  };

  const open = () => setView("modal");

  if (!slide) return null;

  return (
    <>
      {view === "tab" && (
        <button
          className="announcement-tab"
          type="button"
          onClick={open}
          aria-label="Open welcome offer"
        >
          <span>{slide.badge || "Welcome Offer"}</span>
        </button>
      )}

      {view === "modal" && (
        <div className="announcement-backdrop" role="presentation">
          <section
            className="announcement-popup"
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="welcome-offer-title"
            onKeyDown={(event) => {
              if (event.key === "Escape") dismiss();
              if (event.key !== "Tab") return;
              const elements = dialogRef.current?.querySelectorAll<HTMLElement>("button, a[href], input");
              if (!elements?.length) return;
              const first = elements[0];
              const last = elements[elements.length - 1];
              if (event.shiftKey && document.activeElement === first) {
                event.preventDefault(); last.focus();
              } else if (!event.shiftKey && document.activeElement === last) {
                event.preventDefault(); first.focus();
              }
            }}
          >
            <button
              className="announcement-close"
              type="button"
              onClick={dismiss}
              aria-label="Close announcement"
            >
              ×
            </button>
            <img
              className={slide.imageUrl ? "welcome-offer-image" : undefined}
              src={slide.imageUrl || "/ln-mark.jpg"}
              alt={slide.imageUrl ? slide.title : ""}
              width={slide.imageUrl ? 900 : 72}
              height={slide.imageUrl ? 1400 : 72}
            />
            <div className="announcement-details">
            {slide.badge && <span className="offer-badge">{slide.badge}</span>}
            <p className="eyebrow">{slide.kicker}</p>
            <h2 id="welcome-offer-title">{slide.title}</h2>
            <p>{slide.message}</p>
            <label className="announcement-check">
              <input
                type="checkbox"
                checked={doNotShowAgain}
                onChange={(event) => setDoNotShowAgain(event.target.checked)}
              />
              <span>Don’t show this again</span>
            </label>
            <div className="announcement-actions">
              <a className="button" href={offerHref(slide.ctaPath, bookingUrl)} onClick={dismiss}>
                {slide.ctaLabel}
              </a>
              <a className="button" href={bookingUrl}>
                Book Appointment
              </a>
              <button className="button button-secondary" type="button" onClick={dismiss}>
                Continue to Site
              </button>
            </div>
            </div>
          </section>
        </div>
      )}
    </>
  );
}

export function PromotionalSlides({ bookingUrl, offer }: AnnouncementPopupProps) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [interacting, setInteracting] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(true);
  const slides = offer?.slides ?? [];
  const activeIndex = slides.length ? index % slides.length : 0;
  const slide = slides[activeIndex];

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(preference.matches);
    update();
    preference.addEventListener("change", update);
    return () => preference.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!offer || slides.length < 2 || paused || interacting || reducedMotion) return;
    const timer = window.setInterval(() => setIndex((current) => current + 1), offer.slideDurationMs);
    return () => window.clearInterval(timer);
  }, [offer, slides.length, paused, interacting, reducedMotion]);

  if (!slide) return (
    <div className="promo-card" data-reveal="fade-up">
      <p className="eyebrow">Your next moment of self-care</p>
      <h2>Make time for something lovely.</h2>
      <p>Book your next manicure or pedicure in Winter Garden.</p>
      <a className="button" href={bookingUrl}>Book Appointment</a>
    </div>
  );

  return (
    <>
      <div className="promo-card" data-reveal="fade-up"
        onMouseEnter={() => setInteracting(true)} onMouseLeave={() => setInteracting(false)}
        onFocusCapture={() => setInteracting(true)}
        onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setInteracting(false); }}>
        {slide.badge && <span className="offer-badge">{slide.badge}</span>}
        <p className="eyebrow">{slide.kicker}</p>
        <h2>{slide.title}</h2>
        <p>{slide.message}</p>
        {slides.length > 1 && (
          <div className="offer-controls" aria-label="Promotion slides">
            <button type="button" aria-label="Previous promotion" onClick={() => setIndex((current) => (current - 1 + slides.length) % slides.length)}>←</button>
            <span aria-live={paused || interacting || reducedMotion ? "polite" : "off"}>{activeIndex + 1} / {slides.length}</span>
            <button type="button" aria-label="Next promotion" onClick={() => setIndex((current) => current + 1)}>→</button>
            {!reducedMotion && <button type="button" onClick={() => setPaused(!paused)}>{paused ? "Play" : "Pause"}</button>}
          </div>
        )}
        <div className="announcement-actions">
          <a className="button" href={offerHref(slide.ctaPath, bookingUrl)}>{slide.ctaLabel}</a>
          <a className="button button-secondary" href={bookingUrl}>Book Appointment</a>
        </div>
      </div>
      {slide.imageUrl && (
        <div className="promo-offer-preview" data-reveal="float-in">
          <img
            className="promo-offer-image"
            src={slide.imageUrl}
            alt={slide.title}
            width={900}
            height={1400}
            loading="lazy"
          />
        </div>
      )}
    </>
  );
}
