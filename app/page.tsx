const bookingUrl = "#booking-link-coming-soon";

const navigation = [
  { label: "Home", href: "#home" },
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
    description: "Clean shaping, cuticle care, polish, gel, and refined finishes.",
  },
  {
    title: "Pedicures",
    description: "Comfort-focused foot care with soaking, exfoliation, massage, and color.",
  },
  {
    title: "Polish Changes",
    description: "Efficient refreshes for hands or feet when you need a quick reset.",
  },
  {
    title: "Waxing",
    description: "Simple grooming services, including eyebrow care and facial waxing.",
  },
];

const galleryItems = [
  "Soft neutral gel",
  "Clean French tips",
  "Glossy pedicure",
  "Minimal nail art",
  "Brow shaping",
  "Spa detail care",
];

const posts = [
  "How often should you book a manicure?",
  "Gel polish care between visits",
  "Simple pedicure habits for Florida weather",
];

const reviews = [
  {
    name: "Tyra S.",
    href: "https://www.google.com/maps/contrib/108062892852810950860/reviews?hl=en-US",
    details: "Local Guide · 19 reviews · 9 photos",
    date: "A year ago",
    price: "$60–80",
    text: "I can’t say enough wonderful things about my experience with Bobby at Lovely Nails & Spa! He did an absolutely amazing job on my nails, taking the time to explain every step of the process. He even taught me how to keep my nails looking their best.",
    reaction: "❤️ 1",
    response:
      "We appreciate your kind words! We're thrilled you had a wonderful experience and look forward to your next visit!",
  },
  {
    name: "Lacie Anderson",
    href: "https://www.google.com/maps/contrib/112879655492826359877/reviews?hl=en-US",
    details: "5 reviews · 6 photos",
    date: "3 years ago",
    text: "Looking for the best manicure you can find? Emily is your gal! She takes her time and truly perfects the shape and is incredibly talented at designs and cool styles! She really takes pride in her work and it shows!",
    reaction: "🙏 2",
  },
  {
    name: "Jessica S.",
    href: "https://www.google.com/maps/contrib/117347155096494286836/reviews?hl=en-US",
    details: "3 reviews · 6 photos",
    date: "3 years ago",
    text: "I have been going to see Emily at Lovely Nails for a long time and I love this salon very much! Emily is so so talented and sweet and I always leave the salon very satisfied with my new nails! There is a parking lot right out in front which is very convenient. The pricing is also very reasonable! I would highly recommend her services!",
    reaction: "🙏 2",
  },
  {
    name: "Melissa Simon",
    href: "https://www.google.com/maps/contrib/104427329710913035399/reviews?hl=en-US",
    details: "4 reviews · 3 photos",
    date: "3 years ago",
    text: "Love this nail salon! I moved from NJ to Florida over a year ago. I was referred by a Facebook group to this salon and have been coming back ever since! Tammy is my go to! She’s great with acrylics, dip and nail art! If you want Disney designs she’s your girl!",
  },
  {
    name: "Lauren Barnes",
    href: "https://www.google.com/maps/contrib/114456063658738624734/reviews?hl=en-US",
    details: "1 review · 2 photos",
    date: "3 years ago",
    text: "Emily is the best nail tech I have ever been to! She always takes my ideas and makes them look perfect and she is the sweetest person ever!! 10/10 recommend!!",
    reaction: "🙏 2",
  },
  {
    name: "Bibi Das",
    href: "https://www.google.com/maps/contrib/104699820630125655713/reviews?hl=en-US",
    details: "2 reviews · 1 photo",
    date: "2 years ago",
    text: "My experience with Emily is phenomenal. She’s the person to go to, whether it be not knowing what nail color to use or needing a certain design or style. She’s very helpful and decisive and has great time management. My girls love and appreciate her, and I would 100% recommend her to other customers!",
  },
];

export default function Home() {
  return (
    <main id="home" className="site-shell">
      <header className="nav-wrap" aria-label="Primary navigation">
        <a className="brand" href="#home" aria-label="Lovely Nail and Spa home">
          <span className="brand-mark">L</span>
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
        <div className="hero-copy">
          <p className="eyebrow">Modern nail care · Spa calm · Everyday polish</p>
          <h1>Minimal, clean nail care for hands, feet, brows, and waxing.</h1>
          <p className="hero-text">
            Lovely Nail & Spa is a casual Winter Garden salon for manicures,
            pedicures, polish changes, waxing treatments, and eyebrow services.
          </p>

          <div className="hero-actions">
            <a className="button" href={bookingUrl}>
              Book Appointment
            </a>
            <a className="button button-secondary" href="tel:+14076540254">
              Call (407) 654-0254
            </a>
          </div>

          <div className="trust-row" aria-label="Salon rating and location">
            <span>3.6 rating</span>
            <span>310 Google reviews</span>
            <span>Nail salon in Winter Garden, FL</span>
          </div>
        </div>

        <div className="hero-card" aria-label="Salon appointment summary">
          <div className="orb orb-one" />
          <div className="orb orb-two" />
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

      <section className="booking-strip" aria-label="Quick booking">
        <span>Ready when you are.</span>
        <strong>Booking link will be connected here.</strong>
        <a className="button button-dark" href={bookingUrl}>
          Book Now
        </a>
      </section>

      <section id="services" className="section-pad split-section">
        <div>
          <p className="eyebrow">Services</p>
          <h2>Simple treatments, well done.</h2>
        </div>
        <div className="cards-grid">
          {services.map((service) => (
            <article className="service-card" key={service.title}>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <a href={bookingUrl}>Book {service.title}</a>
            </article>
          ))}
        </div>
      </section>

      <section id="gallery" className="section-pad gallery-section">
        <div className="section-heading">
          <p className="eyebrow">Gallery</p>
          <h2>Quiet color, glossy finishes, precise grooming.</h2>
          <a href={bookingUrl}>Book from gallery inspiration</a>
        </div>
        <div className="gallery-grid">
          {galleryItems.map((item, index) => (
            <div className={`gallery-tile tile-${index + 1}`} key={item}>
              <span>{item}</span>
            </div>
          ))}
        </div>
      </section>

      <section id="reviews" className="section-pad reviews-section">
        <div className="reviews-heading">
          <div>
            <p className="eyebrow">Google Reviews</p>
            <h2>Loved by our clients.</h2>
          </div>
          <p>
            Kind words from guests who trust our team with their nails, designs,
            and everyday self-care.
          </p>
        </div>

        <div className="reviews-grid">
          {reviews.map((review) => (
            <article className="review-card" key={review.name}>
              <div className="review-topline">
                <a href={review.href} target="_blank" rel="noreferrer">
                  {review.name}
                </a>
                <span className="review-stars" aria-label="5 out of 5 stars">
                  ★★★★★
                </span>
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
        <div className="promo-card">
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
        <div className="promo-list" aria-label="Promotion placeholders">
          <span>New client refresh</span>
          <span>Gel manicure feature</span>
          <span>Pedicure weekday calm</span>
        </div>
      </section>

      <section id="blog" className="section-pad split-section">
        <div>
          <p className="eyebrow">Blog</p>
          <h2>Helpful care notes for clients.</h2>
        </div>
        <div className="blog-list">
          {posts.map((post) => (
            <article key={post}>
              <h3>{post}</h3>
              <p>Short, practical advice can be added here when the blog is ready.</p>
              <a href={bookingUrl}>Book after reading</a>
            </article>
          ))}
        </div>
      </section>

      <section id="contact" className="section-pad contact-section">
        <div>
          <p className="eyebrow">Contact</p>
          <h2>Visit Lovely Nail & Spa in Winter Garden.</h2>
          <p>
            Call now or use the booking link once connected. Directions can be
            wired to your final Google Maps listing.
          </p>
        </div>
        <div className="contact-card">
          <a href="tel:+14076540254">(407) 654-0254</a>
          <span>Winter Garden, Florida</span>
          <span>Manicures · Pedicures · Waxing · Eyebrows</span>
          <a className="button button-full" href={bookingUrl}>
            Book Appointment
          </a>
        </div>
      </section>

      <footer className="footer">
        <span>© 2026 Lovely Nail & Spa</span>
        <a href={bookingUrl}>Book Now</a>
      </footer>

      <a className="floating-booking" href={bookingUrl} aria-label="Book an appointment">
        Book
      </a>
    </main>
  );
}
