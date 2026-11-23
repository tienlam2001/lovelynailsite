import { AnnouncementPopup, PromotionalSlides } from "./AnnouncementPopup";
import { getFirebaseOffer } from "./firebase-offer";
import { PromotionSignup } from "./PromotionSignup";
import { CustomerChat } from "./CustomerChat";
import { ScrollReveal } from "./ScrollReveal";
import { Gallery } from "./Gallery";
import { getFirebaseMenu } from "./firebase-menu";
import { getFirebaseHours } from "./firebase-hours";
import { menuSections, servicePages } from "./service-data";
import { hoursSchema } from "./hours-schema";
import { MobileExperience } from "./MobileExperience";

export const dynamic = "force-dynamic";

const bookingUrl = "https://abcapp.us?appid=vqD7eIC";
const siteUrl = "https://nailslovely.com";
const address = "3317 Daniels Rd #106, Winter Garden, FL 34787";
const phone = "+14076540254";
const directionsUrl =
  "https://www.google.com/maps/dir/?api=1&destination=3317%20Daniels%20Rd%20%23106%2C%20Winter%20Garden%2C%20FL%2034787";
const mapUrl =
  "https://www.google.com/maps?q=3317%20Daniels%20Rd%20%23106%2C%20Winter%20Garden%2C%20FL%2034787&output=embed";

type Review = {
  name: string;
  href: string;
  details: string;
  date: string;
  price?: string;
  text: string;
  reaction?: string;
  response?: string;
};

const navigation = [
  { label: "Home", href: "#home" },
  { label: "Menu", href: "#menu" },
  { label: "Services", href: "#services" },
  { label: "Gallery", href: "#gallery" },
  { label: "Reviews", href: "#reviews" },
  { label: "Promotions", href: "#promotions" },
  { label: "Service Guides", href: "#service-guides" },
  { label: "Contact", href: "#contact" },
];

const services = [
  {
    title: "Manicures",
    description:
      "Winter Garden manicures with clean shaping, cuticle care, polish, gel, and refined finishes.",
  },
  {
    title: "Pedicures",
    description:
      "Relaxing pedicures in Winter Garden with soaking, exfoliation, massage, hot towels, and color.",
  },
  {
    title: "Polish Changes",
    description:
      "Efficient polish changes for hands or feet when you need a quick nail refresh near Daniels Rd.",
  },
  {
    title: "Waxing",
    description:
      "Simple Winter Garden waxing services, including eyebrow care and facial waxing.",
  },
];

const serviceAreas = [
  "Winter Garden",
  "Horizon West",
  "Windermere",
  "Ocoee",
  "Oakland",
  "Clermont",
  "Winter Garden Village",
  "Hamlin",
];

const galleryItems = [
  {
    title: "Pink starfish nail art",
    image: "/gallery/1-Photo-1.jpg",
  },
  {
    title: "Blue floral gel set",
    image: "/gallery/2-Photo-2.jpg",
  },
  {
    title: "Sage green French tips",
    image: "/gallery/3-Photo-3.jpg",
  },
  {
    title: "Blue flower square set",
    image: "/gallery/4-Photo-4.jpg",
  },
  {
    title: "Western-inspired detailed nails",
    image: "/gallery/5-Photo-5.jpg",
  },
  {
    title: "Ocean blue shell nail art",
    image: "/gallery/6-Photo-6.jpg",
  },
  {
    title: "Burgundy dotted French tips",
    image: "/gallery/7-Photo-7.jpg",
  },
  {
    title: "Pink heart nail art",
    image: "/gallery/8-Photo-8.jpg",
  },
  {
    title: "Red heart Valentine set",
    image: "/gallery/9-Photo-9.jpg",
  },
];

const reviewHighlights = [
  "Comfortable chairs",
  "Dip nails",
  "Nail tech",
  "Welcoming atmosphere",
  "Pedicures",
  "Clean salon",
];


const reviews: Review[] = [
  {
    name: "Jessie McGavin",
    href: "https://www.google.com/search?q=Lovely+Nail+%26+Spa+Winter+Garden+reviews",
    details: "4 reviews",
    date: "4 days ago",
    text: "Francis did my pedicure. He was phenomenal.",
  },
  {
    name: "Ximena Solano",
    href: "https://www.google.com/search?q=Lovely+Nail+%26+Spa+Winter+Garden+reviews",
    details: "12 reviews",
    date: "4 days ago",
    price: "$40–60",
    text: "Francis and Bobby were great!",
  },
  {
    name: "Lee Figueroa",
    href: "https://www.google.com/search?q=Lovely+Nail+%26+Spa+Winter+Garden+reviews",
    details: "5 reviews · 1 photo",
    date: "4 days ago",
    text: "Love Bobby! He’s the best. Great place.",
  },
  {
    name: "Milena Fernandez",
    href: "https://www.google.com/search?q=Lovely+Nail+%26+Spa+Winter+Garden+reviews",
    details: "4 reviews",
    date: "Edited a week ago",
    price: "$60–80",
    text: "Service was excellent with Emily, highly recommended.",
  },
  {
    name: "Katelyn May",
    href: "https://www.google.com/search?q=Lovely+Nail+%26+Spa+Winter+Garden+reviews",
    details: "2 reviews",
    date: "A week ago",
    text: "Emily and Bobby are the best for nail dip and pedicures!",
  },
  {
    name: "Lina Vivero",
    href: "https://www.google.com/search?q=Lovely+Nail+%26+Spa+Winter+Garden+reviews",
    details: "Local Guide · 19 reviews · 6 photos",
    date: "A week ago",
    price: "$20–40",
    text: "Frances does an excellent job. He is very careful and gentle, and always leaves my nails looking beautiful and perfectly shaped.",
  },
  {
    name: "Bibi Das",
    href: "https://www.google.com/search?q=Lovely+Nail+%26+Spa+Winter+Garden+reviews",
    details: "2 reviews · 1 photo",
    date: "Edited a week ago",
    text: "My experience with Emily is phenomenal. She’s helpful, decisive, has great time management, and I would 100% recommend her.",
  },
  {
    name: "Akilah Attzs",
    href: "https://www.google.com/search?q=Lovely+Nail+%26+Spa+Winter+Garden+reviews",
    details: "Local Guide · 11 reviews",
    date: "A week ago",
    price: "$20–40",
    text: "First time here and the service was welcoming and friendly. Bobby was extremely kind and gives the best foot massage.",
  },
  {
    name: "Karen Carter",
    href: "https://www.google.com/search?q=Lovely+Nail+%26+Spa+Winter+Garden+reviews",
    details: "3 reviews",
    date: "Edited a week ago",
    price: "$40–60",
    text: "Lynn is my go-to. I have been getting pedicures by Lynn for over 10 years. She takes her time and pays attention to details.",
  },
  {
    name: "Megan Nastasi",
    href: "https://www.google.com/search?q=Lovely+Nail+%26+Spa+Winter+Garden+reviews",
    details: "5 reviews",
    date: "A week ago",
    text: "Love getting my nails done with Holly. Been coming here for years and always leave with a perfect set.",
  },
];

const localBusinessSchema: Record<string, unknown> = {
  "@context": "https://schema.org",
  "@type": "NailSalon",
  "@id": `${siteUrl}/#nailsalon`,
  name: "Lovely Nail & Spa",
  url: siteUrl,
  image: `${siteUrl}/ln-mark.jpg`,
  logo: `${siteUrl}/ln-mark.jpg`,
  telephone: phone,
  priceRange: "$$",
  description:
    "Lovely Nail & Spa is a nail salon in Winter Garden, Florida offering pedicures, acrylic nails, Gel-X, dipping powder, manicures, polish changes, nail design, waxing, and online booking.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "3317 Daniels Rd #106",
    addressLocality: "Winter Garden",
    addressRegion: "FL",
    postalCode: "34787",
    addressCountry: "US",
  },
  areaServed: serviceAreas.map((area) => ({
    "@type": "Place",
    name: area,
  })),
  hasMap: directionsUrl,
  potentialAction: {
    "@type": "ReserveAction",
    target: bookingUrl,
    name: "Book an appointment",
  },
};

const faqSchema: Record<string, unknown> = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Where is Lovely Nail & Spa located?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Lovely Nail & Spa is located at 3317 Daniels Rd #106, Winter Garden, FL 34787.",
      },
    },
    {
      "@type": "Question",
      name: "Can I book Lovely Nail & Spa online?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Customers can book appointments online using the booking buttons on the Lovely Nail & Spa website.",
      },
    },
    {
      "@type": "Question",
      name: "What services does Lovely Nail & Spa offer?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Lovely Nail & Spa offers pedicures, acrylic nails, Gel-X, dipping powder, manicures, polish changes, nail design, waxing, and services for little ones.",
      },
    },
  ],
};

export default async function Home() {
  const [liveMenu, welcomeOffer, hours] = await Promise.all([
    getFirebaseMenu(menuSections),
    getFirebaseOffer(),
    getFirebaseHours(),
  ]);
  const weekdaysSameHours =
    hours.monday === hours.tuesday &&
    hours.monday === hours.wednesday &&
    hours.monday === hours.thursday &&
    hours.monday === hours.friday;
  const liveBusinessSchema = {
    ...localBusinessSchema,
    openingHoursSpecification: hoursSchema(hours),
    makesOffer: liveMenu.map((section) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: section.title,
        provider: { "@id": `${siteUrl}/#nailsalon` },
        areaServed: "Winter Garden, FL",
      },
    })),
  };
  return (
    <main id="home" className="site-shell">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(liveBusinessSchema).replace(/</g, "\\u003c") }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      {/* Promo popup hidden for now — uncomment to re-enable */}
      {/* <AnnouncementPopup bookingUrl={bookingUrl} offer={welcomeOffer} /> */}
      <MobileExperience sections={liveMenu} photos={galleryItems} bookingUrl={bookingUrl} phone={phone} address={address} directionsUrl={directionsUrl} hours={hours} offer={welcomeOffer} />
      <CustomerChat />
      <ScrollReveal />
      <div className="desktop-experience">
      <header className="nav-wrap" aria-label="Primary navigation">
        <a className="brand" href="#home" aria-label="Lovely Nail and Spa home">
          <img className="brand-logo" src="/ln-mark.jpg" alt="" />
          <span>
            <strong>Lovely Nail & Spa</strong>
            <small>Winter Garden, Florida</small>
          </span>
        </a>

        <nav className="nav-links" aria-label="Site sections">
          {navigation.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>

        <a className="button button-small" href={bookingUrl}>
          Book Now
        </a>
      </header>

      <section className="hero section-pad">
        <div className="hero-copy" data-reveal="fade-up">
          <p className="eyebrow">Winter Garden nail spa · Polished self-care</p>
          <h1>Lovely Nail & Spa — nail salon in Winter Garden, FL.</h1>
          <p className="hero-text">
            Visit Lovely Nail & Spa at 3317 Daniels Rd #106 for pedicures,
            acrylic nails, Gel-X, dipping powder, manicures, polish changes,
            nail design, waxing treatments, and eyebrow services.
          </p>

          <div className="hero-actions">
            <a className="button" href={bookingUrl}>
              Book Appointment
            </a>
            <a className="button button-secondary" href={`tel:${phone}`}>
              Call (407) 654-0254
            </a>
            <a className="button button-secondary" href={directionsUrl} target="_blank" rel="noreferrer">
              Get Directions
            </a>
          </div>

          <div className="trust-row" aria-label="Salon rating and location">
            <span>4.0 rating</span>
            <span>453 Google reviews</span>
            <span>3317 Daniels Rd #106</span>
          </div>
        </div>

        <div className="hero-card" aria-label="Salon appointment summary" data-reveal="float-in">
          <div className="orb orb-one" />
          <div className="orb orb-two" />
          <img className="hero-card-logo" src="/ln-mark.jpg" alt="" />
          <div className="service-ticket">
            <span>Today’s Focus</span>
            <strong>Fresh color, calm hands, polished details.</strong>
            <a href={bookingUrl}>Reserve your visit</a>
          </div>
          <div className="mini-grid">
            <span>Mani</span>
            <span>Pedi</span>
            <span>Wax</span>
            <span>Brows</span>
          </div>
        </div>
      </section>

      <section className="booking-strip" aria-label="Quick booking" data-reveal="fade-up">
        <span>Ready when you are.</span>
        <strong>Book your Winter Garden nail appointment online.</strong>
        <a className="button button-dark" href={bookingUrl}>
          Book Now
        </a>
      </section>

      <section className="section-pad local-seo-section" aria-label="Winter Garden nail salon service areas">
        <div data-reveal="fade-up">
          <p className="eyebrow">Local Nail Salon</p>
          <h2>Serving Winter Garden, Horizon West, Windermere, and nearby neighborhoods.</h2>
          <p>
            Lovely Nail & Spa is conveniently located on Daniels Rd in Winter Garden,
            close to Winter Garden Village, Hamlin, Horizon West, Windermere,
            Ocoee, Oakland, and Clermont. Customers visit us for clean nail care,
            relaxing pedicures, acrylic nails, Gel-X, dipping powder, waxing,
            and easy online booking.
          </p>
        </div>
        <div className="area-chip-grid" data-reveal="float-in" aria-label="Service areas">
          {serviceAreas.map((area) => (
            <span key={area}>{area}</span>
          ))}
        </div>
      </section>

      <section id="menu" className="section-pad menu-section">
        <div className="menu-hero" data-reveal="fade-up">
          <div>
            <p className="eyebrow">Menu & Pricing</p>
            <h2>Clear prices, clean choices.</h2>
          </div>
          <div className="menu-hero-copy">
            <p>
              Browse pedicures with included steps, acrylics, manicures,
              polish changes, little ones, waxing, and nail care before you visit.
              Prices may vary by design, length, or product choice.
            </p>
            <a className="button" href={bookingUrl}>
              Book From Menu
            </a>
          </div>
        </div>

        <div className="menu-grid">
          {liveMenu.length === 0 && (
            <p>Our menu is being updated. <a href={`tel:${phone}`}>Call us for services and pricing.</a></p>
          )}
          {liveMenu.map((section) => (
            <article
              className={`menu-card${section.featured ? " menu-card-featured" : ""}${
                section.title === "Pedicures" ? " menu-card-wide" : ""
              }`}
              key={section.title}
              data-reveal="fade-up"
            >
              <div className="menu-card-header">
                <h3>{section.title}</h3>
                <p>{section.note}</p>
              </div>
              <dl className="price-list">
                {section.items.map(([service, price, description]) => (
                  <div className="price-row" key={service}>
                    <dt>
                      <span>{service}</span>
                      {description && <small>{description}</small>}
                    </dt>
                    <dd>{price}</dd>
                  </div>
                ))}
              </dl>
              <a href={bookingUrl}>Book {section.title}</a>
            </article>
          ))}
        </div>

        <p className="menu-disclaimer">
          Additional charge may apply depending on desired length, shape, ombré,
          multi-color nails, or custom art.
        </p>
      </section>

      <section className="section-pad logo-ribbon" aria-label="Lovely Nail Spa brand" data-reveal="fade-up">
        <img src="/ln-mark.jpg" alt="Lovely Nail Spa monogram" />
        <span>Lovely details. Clean polish. Easy booking.</span>
        <a href={bookingUrl}>Book Appointment</a>
      </section>

      <section id="services" className="section-pad split-section">
        <div data-reveal="fade-up">
          <p className="eyebrow">Services</p>
          <h2>Simple treatments, well done.</h2>
        </div>
        <div className="cards-grid">
          {services.map((service) => (
            <article className="service-card" key={service.title} data-reveal="fade-up">
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <a href={bookingUrl}>Book {service.title}</a>
            </article>
          ))}
        </div>
      </section>

      <section id="gallery" className="section-pad gallery-section">
        <div className="section-heading" data-reveal="fade-up">
          <p className="eyebrow">Gallery</p>
          <h2>Quiet color, glossy finishes, precise grooming.</h2>
          <a href={bookingUrl}>Book from gallery inspiration</a>
        </div>
        <Gallery fallback={galleryItems} />
      </section>

      <section id="reviews" className="section-pad reviews-section">
        <div className="reviews-heading" data-reveal="fade-up">
          <div>
            <p className="eyebrow">Google Reviews</p>
            <h2>Loved by our clients.</h2>
          </div>
          <p>
            Kind words from guests who trust our team with their nails, designs,
            and everyday self-care.
          </p>
        </div>

        <div className="reviews-summary" data-reveal="fade-up">
          <div>
            <strong>4.0</strong>
            <span>Google rating</span>
          </div>
          <div>
            <strong>453</strong>
            <span>Customer reviews</span>
          </div>
          <a className="button button-secondary" href={bookingUrl}>
            Book After Reading
          </a>
        </div>

        <div className="review-highlights" aria-label="Commonly mentioned review highlights" data-reveal="fade-up">
          {reviewHighlights.map((highlight) => (
            <span key={highlight}>{highlight}</span>
          ))}
        </div>

        <div className="reviews-grid">
          {reviews.map((review) => (
            <article className="review-card" key={review.name} data-reveal="fade-up">
              <div className="review-topline">
                <div className="review-person">
                  <span>{review.name.slice(0, 1)}</span>
                  <a href={review.href} target="_blank" rel="noreferrer">
                    {review.name}
                  </a>
                </div>
                <span className="review-stars" aria-label="5 out of 5 stars">★★★★★</span>
              </div>
              <p className="review-details">{review.details}</p>
              <div className="review-meta">

                {review.price && <span>{review.price}</span>}
              </div>
              <blockquote>{review.text}</blockquote>
              {review.reaction && <span className="review-reaction">{review.reaction}</span>}
              {review.response && (
                <div className="owner-response">
                  <strong>Lovely Nail & Spa</strong>
                  <span>Owner response · 7 months ago</span>
                  <p>{review.response}</p>
                </div>
              )}
            </article>
          ))}
        </div>
      </section>

      <section id="promotions" className="section-pad promo-section">
        <PromotionalSlides bookingUrl={bookingUrl} offer={welcomeOffer} />
      </section>

      <PromotionSignup />

      <section className="section-pad appointment-panel" aria-label="Book an appointment online" data-reveal="fade-up">
        <div>
          <p className="eyebrow">Appointments</p>
          <h2>See a service you like? Book your visit now.</h2>
          <p>
            The booking button takes customers directly to the online appointment
            page for Lovely Nail & Spa.
          </p>
        </div>
        <div className="appointment-actions">
          <a className="button" href={bookingUrl}>
            Book Appointment
          </a>
            <a className="button button-secondary" href={`tel:${phone}`}>
              Call First
            </a>
        </div>
      </section>

      <section id="service-guides" className="section-pad split-section">
        <div><p className="eyebrow">Plan your visit</p><h2>Nail services in Winter Garden</h2><p>Explore your options, current prices, and what to ask before booking.</p></div>
        <div className="blog-list">{servicePages.map((service) => <article key={service.slug}><h3><a href={`/services/${service.slug}`}>{service.title} in Winter Garden</a></h3><p>{service.intro}</p><a href={`/services/${service.slug}`}>Explore {service.title.toLowerCase()}</a></article>)}</div>
      </section>

      <section id="contact" className="section-pad contact-section">
        <div data-reveal="fade-up">
          <p className="eyebrow">Contact</p>
          <h2>Visit Lovely Nail & Spa in Winter Garden.</h2>
          <p>
            Find us at 3317 Daniels Rd #106. Book online, call ahead, or open
            directions before your visit.
          </p>
          <div className="contact-actions">
            <a className="button" href={directionsUrl} target="_blank" rel="noreferrer">
              Get Directions
            </a>
            <a className="button button-secondary" href={bookingUrl}>
              Book Appointment
            </a>
          </div>
          <div className="contact-hours" aria-label="Business hours">
            <p className="eyebrow">Hours</p>
            {weekdaysSameHours ? (
              <p>Mon–Fri: {hours.monday}</p>
            ) : (
              <>
                <p>Mon: {hours.monday}</p>
                <p>Tue: {hours.tuesday}</p>
                <p>Wed: {hours.wednesday}</p>
                <p>Thu: {hours.thursday}</p>
                <p>Fri: {hours.friday}</p>
              </>
            )}
            <p>Sat: {hours.saturday}</p>
            <p>Sun: {hours.sunday}</p>
            {hours.note ? <p>{hours.note}</p> : null}
          </div>
        </div>
        <div className="location-panel" data-reveal="float-in">
          <div className="contact-card">
            <img className="contact-logo" src="/ln-mark.jpg" alt="Lovely Nail Spa monogram" />
            <a href={`tel:${phone}`}>(407) 654-0254</a>
            <span>{address}</span>
            <span>Manicures · Pedicures · Waxing · Eyebrows</span>
            <a className="button button-full" href={directionsUrl} target="_blank" rel="noreferrer">
              Open Google Maps
            </a>
          </div>
          <iframe
            className="map-frame"
            title="Map to Lovely Nail & Spa"
            src={mapUrl}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>
      </section>

      <footer className="footer">
        <span className="footer-brand">
          <img src="/ln-mark.jpg" alt="" />
          © 2026 Lovely Nail & Spa
        </span>
        <a href={bookingUrl}>Book Now</a>
      </footer>

      <div className="mobile-action-bar" aria-label="Quick appointment actions">
        <a href={bookingUrl}>Book</a>
        <a href={`tel:${phone}`}>Call</a>
        <a href={directionsUrl} target="_blank" rel="noreferrer">
          Directions
        </a>
      </div>
      </div>
    </main>
  );
}
