import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { menuSections, servicePages } from "../../service-data";
import { getFirebaseMenu } from "../../firebase-menu";
export const dynamic = "force-dynamic";
type Props = { params: Promise<{ service: string }> };
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { service } = await params; const page = servicePages.find(s => s.slug === service);
  if (!page) return { title: "Service not found", robots: { index: false } };
  const url = `https://nailslovely.com/services/${page.slug}`;
  return { title: `${page.title} in Winter Garden, FL`, description: page.intro, alternates: { canonical: url }, openGraph: { title: `${page.title} in Winter Garden | Lovely Nail & Spa`, description: page.intro, url } };
}
export default async function ServicePage({ params }: Props) {
  const { service } = await params; const page = servicePages.find(s => s.slug === service);
  if (!page) notFound();
  const menu = (await getFirebaseMenu(menuSections)).filter(s => page.sections.includes(s.title));
  const url = `https://nailslovely.com/services/${page.slug}`;
  const schema = { "@context": "https://schema.org", "@type": "Service", name: `${page.title} in Winter Garden`, url, description: page.intro, provider: { "@type": "NailSalon", "@id": "https://nailslovely.com/#nailsalon", name: "Lovely Nail & Spa", telephone: "+14076540254", address: { "@type": "PostalAddress", streetAddress: "3317 Daniels Rd #106", addressLocality: "Winter Garden", addressRegion: "FL", postalCode: "34787", addressCountry: "US" } } };
  return <main className="service-page"><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema).replace(/</g,"\\u003c")}} />
    <nav aria-label="Breadcrumb"><a href="/">Lovely Nail & Spa</a><span aria-current="page">{page.title}</span></nav>
    <header><p className="eyebrow">Winter Garden, Florida</p><h1>{page.title} in Winter Garden</h1><p>{page.intro}</p><div className="service-links"><a className="button" href="https://abcapp.us?appid=vqD7eIC">Book Appointment</a><a className="button button-secondary" href="tel:+14076540254">Call (407) 654-0254</a></div></header>
    <section aria-label="Current service prices"><h2>Services and starting prices</h2>{menu.map(section => <article className="menu-card" key={section.title}><h3>{section.title}</h3><p>{section.note}</p><dl className="price-list">{section.items.map(([name,price,description]) => <div className="price-row" key={name}><dt>{name}{description && <small>{description}</small>}</dt><dd>{price}</dd></div>)}</dl></article>)}<p>Final pricing may vary with length, shape, products, or custom art. Confirm any additions before your service.</p></section>
    <section><h2>Before your appointment</h2><p>{page.tips}</p><h3>Where are you located?</h3><p>Visit us at 3317 Daniels Rd #106, Winter Garden, FL 34787, near Winter Garden Village.</p><h3>How do I book?</h3><p><a href="https://abcapp.us?appid=vqD7eIC">Book online</a> or call (407) 654-0254 to discuss your service.</p></section>
    <footer><h2>Explore other nail services</h2><nav aria-label="Other services">{servicePages.filter(s=>s.slug!==page.slug).map(s=><a key={s.slug} href={`/services/${s.slug}`}>{s.title}</a>)}</nav><a href="/">Back to salon home, hours and full menu</a></footer>
  </main>;
}
