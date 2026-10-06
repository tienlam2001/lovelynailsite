"use client";

import { useRef, useState, type FormEvent } from "react";
import { promotionConsentText, promotionSmsConsentText, savePromotionSignup } from "./promotion-signup";

export function PromotionSignup({ idPrefix = "promotion" }: { idPrefix?: string }) {
  const [status, setStatus] = useState<"idle" | "saving" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const submitting = useRef(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting.current || status === "success") return;
    const form = event.currentTarget;
    const values = new FormData(form);
    if (values.get("website")) return;
    submitting.current = true;
    setStatus("saving");
    setMessage("");
    try {
      await savePromotionSignup({
        name: String(values.get("name") ?? ""),
        phone: String(values.get("phone") ?? ""),
        email: String(values.get("email") ?? ""),
        emailConsent: values.get("emailConsent") === "on",
        smsConsent: values.get("smsConsent") === "on",
      });
      setStatus("success");
      setMessage("You’re on the list! Thank you for joining Lovely Nail & Spa’s promotion updates.");
      form.reset();
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error && error.name !== "TimeoutError" ? error.message : "We couldn’t save your signup. Please try again.");
    } finally {
      submitting.current = false;
    }
  }

  return (
    <section id={`${idPrefix}-signup`} className="section-pad promotion-signup" aria-labelledby={`${idPrefix}-signup-title`}>
      <div>
        <p className="eyebrow">A little lovely in your inbox</p>
        <h2 id={`${idPrefix}-signup-title`}>Be first to hear about our promotions.</h2>
        <p>Join our Lovely Nail & Spa promotion list for salon offers and special updates.</p>
        <p className="signup-privacy">Your details are kept private for the salon. To change your preferences, call <a href="tel:+14076540254">(407) 654-0254</a>.</p>
      </div>
      <form className="signup-form" onSubmit={submit} aria-busy={status === "saving"}>
        <fieldset disabled={status === "saving" || status === "success"}>
          <label htmlFor={`${idPrefix}-name`}>Name</label>
          <input id={`${idPrefix}-name`} name="name" type="text" autoComplete="name" maxLength={120} required placeholder="Your full name" />
          <label htmlFor={`${idPrefix}-phone`}>Phone number</label>
          <input id={`${idPrefix}-phone`} name="phone" type="tel" inputMode="tel" autoComplete="tel" maxLength={32} required placeholder="(407) 555-0123" />
          <label htmlFor={`${idPrefix}-email`}>Email address</label>
          <input id={`${idPrefix}-email`} name="email" type="email" autoComplete="email" maxLength={160} required placeholder="you@example.com" />
          <div className="signup-honeypot" aria-hidden="true">
            <label htmlFor={`${idPrefix}-website`}>Leave this empty</label>
            <input id={`${idPrefix}-website`} name="website" type="text" tabIndex={-1} autoComplete="off" />
          </div>
          <label className="signup-consent"><input name="emailConsent" type="checkbox" required /><span>{promotionConsentText}</span></label>
          <label className="signup-consent"><input name="smsConsent" type="checkbox" /><span>{promotionSmsConsentText} (Optional)</span></label>
          <button className="button" type="submit">{status === "saving" ? "Joining…" : status === "success" ? "You’re on the list" : "Sign Up for Promotions"}</button>
        </fieldset>
        <p className={`signup-feedback${status === "error" ? " signup-error" : ""}`} role={status === "error" ? "alert" : "status"}>{message}</p>
      </form>
    </section>
  );
}
