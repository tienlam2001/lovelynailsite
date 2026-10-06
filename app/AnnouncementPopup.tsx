"use client";

import { useEffect, useState } from "react";

type AnnouncementPopupProps = {
  bookingUrl: string;
};

const storageKey = "lovely-management-announcement-dismissed";

export function AnnouncementPopup({ bookingUrl }: AnnouncementPopupProps) {
  const [view, setView] = useState<"hidden" | "modal" | "tab">("hidden");
  const [doNotShowAgain, setDoNotShowAgain] = useState(false);

  useEffect(() => {
    if (window.localStorage.getItem(storageKey) === "true") {
      setView("hidden");
      return;
    }

    const timer = window.setTimeout(() => setView("modal"), 700);
    return () => window.clearTimeout(timer);
  }, []);

  const dismiss = () => {
    if (doNotShowAgain) {
      window.localStorage.setItem(storageKey, "true");
      setView("hidden");
      return;
    }

    setView("tab");
  };

  const open = () => setView("modal");

  return (
    <>
      {view === "tab" && (
        <button
          className="announcement-tab"
          type="button"
          onClick={open}
          aria-label="Open new management announcement"
        >
          <span>New Management</span>
        </button>
      )}

      {view === "modal" && (
        <div className="announcement-backdrop" role="presentation">
          <section
            className="announcement-popup"
            role="dialog"
            aria-modal="true"
            aria-labelledby="management-announcement-title"
          >
            <button
              className="announcement-close"
              type="button"
              onClick={dismiss}
              aria-label="Close announcement"
            >
              ×
            </button>
            <img src="/ln-mark.jpg" alt="" />
            <p className="eyebrow">A Note From Lovely Nail & Spa</p>
            <h2 id="management-announcement-title">Welcoming you under caring management.</h2>
            <p>
              John and Sue are the owners of Lovely Nail & Spa and have been managing
              the salon for five years. Their focus is bringing a warm, polished, and
              reliable nail spa experience to Winter Garden.
            </p>
            <label className="announcement-check">
              <input
                type="checkbox"
                checked={doNotShowAgain}
                onChange={(event) => setDoNotShowAgain(event.target.checked)}
              />
              <span>Don’t show this again</span>
            </label>
            <div className="announcement-actions">
              <a className="button" href={bookingUrl}>
                Book Appointment
              </a>
              <button className="button button-secondary" type="button" onClick={dismiss}>
                Continue to Site
              </button>
            </div>
          </section>
        </div>
      )}
    </>
  );
}
