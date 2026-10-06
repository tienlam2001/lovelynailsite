"use client";

import { useEffect, useRef, useState, type PointerEvent } from "react";
import { matchingServices, type MenuSection } from "./mobile-menu";
import { galleryCategory, useSalonGallery, type GalleryItem } from "./salon-gallery";
import { PromotionalSlides } from "./AnnouncementPopup";
import { PromotionSignup } from "./PromotionSignup";
import type { WelcomeOffer } from "./firebase-offer";

type Panel = "home" | "menu" | "gallery";
type Props = { sections: MenuSection[]; photos: GalleryItem[]; bookingUrl: string; phone: string; address: string; directionsUrl: string; offer: WelcomeOffer | null };

export function MobileExperience({ sections, photos, bookingUrl, phone, address, directionsUrl, offer }: Props) {
  const [panel, setPanel] = useState<Panel>("home");
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [photoCategory, setPhotoCategory] = useState("All");
  const [expanded, setExpanded] = useState<GalleryItem | null>(null);
  const images = useSalonGallery(photos);
  const returnFocus = useRef<HTMLButtonElement | null>(null);
  const menuBack = useRef<HTMLButtonElement>(null);
  const galleryBack = useRef<HTMLButtonElement>(null);
  const menuScreen = useRef<HTMLElement>(null);
  const galleryScreen = useRef<HTMLElement>(null);
  const scrollPositions = useRef({ menu: 0, gallery: 0 });
  const lightbox = useRef<HTMLDialogElement>(null);
  const gesture = useRef<{ x: number; y: number; vertical: boolean } | null>(null);
  const results = matchingServices(sections, query, category);
  const categories = ["All", ...new Set(sections.map((section) => section.title))];
  const photoCategories = ["All", ...new Set(images.map(galleryCategory))];
  const visibleImages = images.filter((image) => photoCategory === "All" || galleryCategory(image) === photoCategory);

  useEffect(() => {
    if (expanded) lightbox.current?.showModal();
    else lightbox.current?.close();
  }, [expanded]);

  function open(next: "menu" | "gallery", button: HTMLButtonElement) {
    returnFocus.current = button;
    setPanel(next);
    requestAnimationFrame(() => {
      (next === "menu" ? menuBack : galleryBack).current?.focus({ preventScroll: true });
      const screen = (next === "menu" ? menuScreen : galleryScreen).current;
      if (screen) screen.scrollTop = scrollPositions.current[next];
    });
  }

  function back() {
    if (panel !== "home") scrollPositions.current[panel] = (panel === "menu" ? menuScreen : galleryScreen).current?.scrollTop ?? 0;
    setPanel("home");
    gesture.current = null;
    requestAnimationFrame(() => returnFocus.current?.focus({ preventScroll: true }));
  }

  function swipeStart(event: PointerEvent<HTMLElement>) {
    if (!event.isPrimary || event.button !== 0 || (event.target as HTMLElement).closest("input, textarea, button, a, dialog")) { gesture.current = null; return; }
    gesture.current = { x: event.clientX, y: event.clientY, vertical: false };
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function swipeMove(event: PointerEvent<HTMLElement>) {
    if (!gesture.current) return;
    const horizontal = Math.abs(event.clientX - gesture.current.x);
    const vertical = Math.abs(event.clientY - gesture.current.y);
    if (vertical > 12 && vertical > horizontal) gesture.current.vertical = true;
  }

  function swipeEnd(event: PointerEvent<HTMLElement>) {
    const start = gesture.current;
    gesture.current = null;
    if (!start || start.vertical) return;
    const horizontal = Math.abs(event.clientX - start.x);
    const vertical = Math.abs(event.clientY - start.y);
    if (horizontal > 96 && horizontal > vertical * 2) back();
  }

  const swipe = { onPointerDown: swipeStart, onPointerMove: swipeMove, onPointerUp: swipeEnd, onPointerCancel: () => { gesture.current = null; } };

  return (
    <div className="lovely-mobile" aria-label="Lovely Nails & Spa phone and tablet experience">
      <section className="lm-screen lm-home" aria-hidden={panel !== "home"} inert={panel !== "home"}>
        <div className="lm-home-card">
          <header className="lm-brand">
            <img src="/ln-mark.jpg" alt="Lovely Nails & Spa monogram" width={96} height={96} />
            <p className="lm-kicker">A LITTLE TIME FOR YOU</p>
            <h1>Lovely Nails <span>& Spa</span></h1>
            <p>Winter Garden, Florida</p>
          </header>
          <nav className="lm-home-actions" aria-label="Salon quick actions">
            <a className="lm-action lm-action-gold" href={bookingUrl}><span aria-hidden="true">↗</span>Book Online</a>
            <button className="lm-action" type="button" onClick={(event) => open("menu", event.currentTarget)}><span aria-hidden="true">≡</span>Smart Pricing Menu</button>
            <button className="lm-action" type="button" onClick={(event) => open("gallery", event.currentTarget)}><span aria-hidden="true">▧</span>Gallery</button>
            <a className="lm-action" href={`tel:${phone}`}><span aria-hidden="true">☎</span>Call Us</a>
            <a className="lm-action" href={directionsUrl} target="_blank" rel="noreferrer"><span aria-hidden="true">⌁</span>Get Directions</a>
          </nav>
          <p className="lm-address">{address}</p>
        </div>
        {offer && <section className="lm-promotions" aria-label="Current salon promotions"><PromotionalSlides bookingUrl={bookingUrl} offer={offer} /></section>}
        <div className="lm-signup"><PromotionSignup idPrefix="mobile-promotion" /></div>
      </section>

      <section ref={menuScreen} className={`lm-screen lm-panel ${panel === "menu" ? "lm-active" : ""}`} aria-hidden={panel !== "menu"} inert={panel !== "menu"} aria-label="Smart Pricing Menu" {...swipe}>
        <div className="lm-panel-bar"><button ref={menuBack} type="button" onClick={back}>← Back</button><span>Lovely Nails & Spa</span><a href={bookingUrl}>Book</a></div>
        <div className="lm-panel-body">
          <p className="lm-kicker">FIND YOUR NEXT MOMENT</p>
          <h2>Smart Pricing Menu</h2>
          <p className="lm-intro">Explore your choices and starting prices.</p>
          <label className="lm-search-label" htmlFor="lovely-service-search">What service are you looking for?</label>
          <div className="lm-search"><input id="lovely-service-search" type="search" placeholder="Try pedi, SNS, gel or refill…" value={query} onChange={(event) => setQuery(event.target.value)} /><button type="button" disabled={!query && category === "All"} onClick={() => { setQuery(""); setCategory("All"); }}>Clear</button></div>
          <div className="lm-filters" role="group" aria-label="Service categories">{categories.map((item) => <button type="button" key={item} aria-pressed={category === item} onClick={() => setCategory(item)}>{item}</button>)}</div>
          <p className="lm-result-count" role="status">{results.length} {results.length === 1 ? "service" : "services"} found</p>
          <div className="lm-services">
            {results.map((service) => <article className="lm-service" key={service.id}>
              <p className="lm-service-category">{service.category}</p>
              <div className="lm-service-title"><h3>{service.name}</h3><strong>{service.price}</strong></div>
              {service.description && <p>{service.description}</p>}
              <a href={bookingUrl} aria-label={`Book ${service.category}: ${service.name}`}>Book this service <span aria-hidden="true">↗</span></a>
            </article>)}
            {!results.length && <div className="lm-empty"><h3>No matching services</h3><p>Try “mani,” “pedi,” or a different category.</p><button type="button" onClick={() => { setQuery(""); setCategory("All"); }}>Show all services</button></div>}
          </div>
          <p className="lm-fine-print">Starting prices shown. Final pricing may vary with length, shape, products, or custom designs. Ask your nail technician for details.</p>
        </div>
      </section>

      <section ref={galleryScreen} className={`lm-screen lm-panel ${panel === "gallery" ? "lm-active" : ""}`} aria-hidden={panel !== "gallery"} inert={panel !== "gallery"} aria-label="Lovely salon gallery" {...swipe}>
        <div className="lm-panel-bar"><button ref={galleryBack} type="button" onClick={back}>← Back</button><span>Lovely Nails & Spa</span><a href={bookingUrl}>Book</a></div>
        <div className="lm-panel-body">
          <p className="lm-kicker">A LITTLE INSPIRATION</p><h2>The Lovely Gallery</h2>
          <p className="lm-intro">Real looks from our salon. Tap to see every detail.</p>
          <div className="lm-filters" role="group" aria-label="Photo categories">{photoCategories.map((item) => <button type="button" key={item} aria-pressed={photoCategory === item} onClick={() => setPhotoCategory(item)}>{item}</button>)}</div>
          <div className="lm-gallery">{visibleImages.map((image, index) => <button className="lm-photo" type="button" key={`${image.image}-${index}`} onClick={() => setExpanded(image)} aria-label={`Expand ${image.title}`}><img src={image.image} alt={image.title} loading="lazy" width={400} height={500} /><span>{image.title}</span></button>)}</div>
          {!visibleImages.length && <p className="lm-empty">No photos in this category yet. Choose another category.</p>}
          <a className="lm-action lm-action-gold lm-gallery-book" href={bookingUrl}>Book your inspired look ↗</a>
        </div>
      </section>
      <dialog className="lm-lightbox" ref={lightbox} onCancel={() => setExpanded(null)} onClose={() => setExpanded(null)} aria-label={expanded ? expanded.title : "Full gallery photo"}>
        <button autoFocus type="button" className="lm-lightbox-close" onClick={() => setExpanded(null)} aria-label="Close full photo">×</button>
        {expanded && <><img src={expanded.image} alt={expanded.title} /><p>{expanded.title}</p></>}
      </dialog>
    </div>
  );
}
