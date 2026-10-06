export type MenuSection = {
  title: string;
  note: string;
  items: [name: string, price: string, description?: string][];
};

export function normalizeSearch(value: string) {
  return value.toLowerCase().replace(/\bmani\b/g, "manicure").replace(/\bpedi\b/g, "pedicure")
    .replace(/\b(sns|dip)\b/g, "dipping powder").replace(/\b(refill|refills|fill in|fill-in|fills)\b/g, "fill")
    .replace(/[^a-z0-9]+/g, " ").trim();
}

export function matchingServices(sections: MenuSection[], query: string, category: string) {
  const terms = normalizeSearch(query).split(" ").filter(Boolean);
  return sections.flatMap((section) => section.items.map(([name, price, description], index) => ({
    id: `${section.title}-${name}-${index}`,
    category: section.title,
    name,
    price,
    description: description || section.note,
  }))).filter((service) => (category === "All" || service.category === category) &&
    terms.every((term) => normalizeSearch(`${service.category} ${service.name} ${service.description}`).includes(term)));
}
