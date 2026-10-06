type MenuItem = [service: string, price: string, description?: string];
type MenuSection = {
  title: string;
  note: string;
  featured?: boolean;
  items: MenuItem[];
};

type ServiceDocument = {
  fields?: Record<string, { stringValue?: string; integerValue?: string; booleanValue?: boolean }>;
};

export async function getFirebaseMenu(fallback: MenuSection[]): Promise<MenuSection[]> {
  try {
    const endpoint = "https://firestore.googleapis.com/v1/projects/casabellanailsspawebsite/databases/(default)/documents/lovelyNailServices";
    const signal = AbortSignal.timeout(4000);
    const documents: ServiceDocument[] = [];
    let pageToken = "";
    do {
      const url = new URL(endpoint);
      url.searchParams.set("pageSize", "1000");
      if (pageToken) url.searchParams.set("pageToken", pageToken);
      const response = await fetch(url, { signal, cache: "no-store" });
      if (!response.ok) return fallback;
      const data: { documents?: ServiceDocument[]; nextPageToken?: string } = await response.json();
      documents.push(...(data.documents ?? []));
      pageToken = data.nextPageToken ?? "";
    } while (pageToken);

    const sections = new Map<string, {
      title: string;
      note: string;
      order: number;
      items: { value: MenuItem; order: number }[];
    }>();

    for (const { fields = {} } of documents) {
      const name = fields.name?.stringValue?.trim();
      const category = fields.category?.stringValue?.trim();
      const price = Number(fields.priceFrom?.integerValue);
      if (!name || !category || fields.active?.booleanValue === false ||
        !Number.isInteger(price) || price < 0 || price > 10000) continue;
      const sectionOrder = Number(fields.sectionOrder?.integerValue ?? Infinity);
      const itemOrder = Number(fields.itemOrder?.integerValue ?? Infinity);
      const note = fields.sectionNote?.stringValue?.trim() ?? "";
      let section = sections.get(category);
      if (!section) {
        section = { title: category, note, order: sectionOrder, items: [] };
        sections.set(category, section);
      }
      section.order = Math.min(section.order, sectionOrder);
      const displayPrice = fields.priceVaries?.booleanValue
        ? "Price Varies"
        : `${fields.pricePrefix?.stringValue === "+" ? "+" : ""}$${price}${fields.priceSuffix?.stringValue === "+" ? "+" : ""}`;
      const details = fields.shortDescription?.stringValue?.trim();
      section.items.push({
        value: [name, displayPrice, details && details !== note ? details : undefined],
        order: itemOrder,
      });
    }

    return [...sections.values()]
      .sort((first, second) => first.order - second.order || first.title.localeCompare(second.title))
      .map((section) => ({
        title: section.title,
        note: section.note,
        featured: section.title === "Pedicures" || section.title === "Acrylic",
        items: section.items
          .sort((first, second) => first.order - second.order || first.value[0].localeCompare(second.value[0]))
          .map((item) => item.value),
      }));
  } catch {
    return fallback;
  }
}
