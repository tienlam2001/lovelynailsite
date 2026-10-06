import { AnnouncementPopup } from "./AnnouncementPopup";
import { ScrollReveal } from "./ScrollReveal";
import { Gallery } from "./Gallery";
import { getFirebaseMenu } from "./firebase-menu";

export const dynamic = "force-dynamic";

const bookingUrl = "https://abcapp.us?appid=vqD7eIC";
const siteUrl = "https://nailslovely.com";
const address = "3317 Daniels Rd #106, Winter Garden, FL 34787";
const phone = "+14076540254";
const directionsUrl =
  "https://www.google.com/maps/dir/?api=1&destination=3317%20Daniels%20Rd%20%23106%2C%20Winter%20Garden%2C%20FL%2034787";
const mapUrl =
  "https://www.google.com/maps?q=3317%20Daniels%20Rd%20%23106%2C%20Winter%20Garden%2C%20FL%2034787&output=embed";

type MenuItem = [service: string, price: string, description?: string];

type MenuSection = {
  title: string;
  note: string;
  featured?: boolean;
  items: MenuItem[];
};

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
  { label: "Blog", href: "#blog" },
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

const posts = [
  "How often should you book a manicure?",
  "Gel polish care between visits",
  "Simple pedicure habits for Florida weather",
];

const reviewHighlights = [
  "Comfortable chairs",
  "Dip nails",
  "Nail tech",
  "Welcoming atmosphere",
  "Pedicures",
  "Clean salon",
];

const menuSections: MenuSection[] = [
  {
    title: "Pedicures",
    note: "Relaxing foot care with soaking, grooming, exfoliation, massage, and hot towels.",
    featured: true,
    items: [
      [
        "Classic Pedicure",
        "$33",
        "Spa soak, nail shaping & cuticle care, light scrub, lotion, relaxing massage, hot towel.",
      ],
      [
        "Premium Pedicure",
        "$40",
        "Classic pedicure care, sugar scrub, callus removal, lotion, extended massage, hot towel.",
      ],
      [
        "Deluxe Pedicure",
        "$47",
        "Premium pedicure care, hydrating mask, 2 hot towels, longer massage.",
      ],
      [
        "Collagen Pedicure",
        "$55",
        "Deluxe pedicure care, collagen treatment, paraffin treatment, 3 hot towels, extended spa massage, choice of scent: Jasmine or Pearl.",
      ],
      [
        "Hurricane Spa Pedicure",
        "$65",
        "Full spa treatment, sugar scrub, callus removal, hydrating mask, paraffin treatment, hot stone massage, longer spa massage, hot towel treatment, choice of scent: Jasmine, Gold, or Pearl.",
      ],
      [
        "Golden Pedicure",
        "$85",
        "Premium golden spa treatment, sugar scrub, callus removal, hydrating mask, paraffin treatment, hot stone massage, steamer treatment, longest luxury massage, hot towel treatment.",
      ],
    ],
  },
  {
    title: "Acrylic",
    note: "Regular polish or gel polish acrylic sets and fills.",
    featured: true,
    items: [
      ["Full Set — Regular Polish", "$45"],
      ["Fill-In — Regular Polish", "$40"],
      ["Full Set — Gel Polish", "$55"],
      ["Fill-In — Gel Polish", "$50"],
      ["Coffin / Almond / Stiletto / Specialty Shape", "+$7"],
      ["Extra Length", "+$5"],
      ["Acrylic Toe", "$8"],
      ["2 Acrylic Toes", "$15"],
    ],
  },
  {
    title: "Liquid Gel — Non-Acrylic",
    note: "Non-acrylic gel enhancements and repairs.",
    items: [
      ["Full Set", "$60"],
      ["Fill-In", "$55"],
      ["Nail Repair", "$5"],
      ["Extra Length", "+$5"],
    ],
  },
  {
    title: "Gel-X",
    note: "Lightweight full-cover gel extensions.",
    items: [
      ["Full Set", "$60+"],
      ["Extra Length", "+$5"],
    ],
  },
  {
    title: "Dipping Powder",
    note: "Powder color sets, pink & white, and shaped finishes.",
    items: [
      ["Full Set Color", "$45"],
      ["Full Set Pink & White", "$52"],
      ["Coffin / Almond / Stiletto / Specialty Shape", "+$7"],
      ["Extra Length", "+$5"],
    ],
  },
  {
    title: "Manicure",
    note: "Classic grooming, shaping, massage, and polish options.",
    items: [
      ["Regular Manicure", "$25"],
      ["Gel Color Polish", "$25"],
      ["Gel Removal", "+$5"],
      ["Gel Color & Manicure", "$35"],
    ],
  },
  {
    title: "Polish Change",
    note: "Quick polish refreshes for hands or feet.",
    items: [
      ["Feet — Regular Polish", "$15"],
      ["Feet — Gel Polish", "$25"],
      ["Feet — Gel Removal + New Gel Polish", "$30"],
      ["Hands — Regular Polish", "$15"],
      ["Hands — Gel Polish", "$20"],
      ["Hands — Gel Removal + New Gel Polish", "$25"],
      ["French Add-On", "+$5"],
    ],
  },
  {
    title: "Little Ones",
    note: "For children 10 years old or younger.",
    items: [
      ["Manicure", "$17"],
      ["Pedicure", "$27"],
      ["Polish Change — Hands", "$12"],
      ["Polish Change — Feet", "$15"],
      ["Gel Manicure", "$27"],
      ["Gel Pedicure", "$37"],
      ["Gel Polish — Hands", "$15"],
      ["Gel Polish — Feet", "$18"],
    ],
  },
  {
    title: "Removal & Repair",
    note: "Safe removal and simple nail repair services.",
    items: [
      ["Acrylic Soak-Off Only", "$15"],
      ["Acrylic or Gel Removal with New Service", "+$10"],
      ["Nail Repair", "$5+"],
    ],
  },
  {
    title: "Nail Design",
    note: "Custom nail art and design pricing varies by request.",
    items: [["Custom Nail Design", "Price Varies", "Please ask your nail technician for pricing."]],
  },
  {
    title: "Waxing",
    note: "Hair removal with soothing honey wax.",
    items: [
      ["Eyebrows", "$12"],
      ["Lips", "$10"],
      ["Chin", "$10+"],
      ["Full Face", "$35"],
      ["Underarms", "$20+"],
      ["Full Arms", "$35"],
      ["Half Arms", "$25"],
      ["Full Legs", "$50+"],
      ["Half Legs", "$30"],
      ["Back", "$50+"],
    ],
  },
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
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.0",
    reviewCount: "453",
  },
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
  const liveMenu = await getFirebaseMenu(menuSections);
  const liveBusinessSchema = {
    ...localBusinessSchema,
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
      <AnnouncementPopup bookingUrl={bookingUrl} />
      <ScrollReveal />
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
                <span>{review.date}</span>
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
        <div className="promo-card" data-reveal="fade-up">
          <p className="eyebrow">Promotions</p>
          <h2>Seasonal offers can live here.</h2>
          <p>
            Add limited-time specials, weekday offers, loyalty notes, or new
            client promotions without distracting from appointment booking.
          </p>
          <a className="button" href={bookingUrl}>
            Book Promotion
          </a>
        </div>
        <div className="promo-list" aria-label="Promotion placeholders" data-reveal="float-in">
          <span>New client refresh</span>
          <span>Gel manicure feature</span>
          <span>Pedicure weekday calm</span>
        </div>
      </section>

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

      <section id="blog" className="section-pad split-section">
        <div data-reveal="fade-up">
          <p className="eyebrow">Blog</p>
          <h2>Helpful care notes for clients.</h2>
        </div>
        <div className="blog-list">
          {posts.map((post) => (
            <article key={post} data-reveal="fade-up">
              <h3>{post}</h3>
              <p>Short, practical advice can be added here when the blog is ready.</p>
              <a href={bookingUrl}>Book after reading</a>
            </article>
          ))}
        </div>
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
    </main>
  );
}
