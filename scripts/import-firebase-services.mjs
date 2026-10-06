import { readFileSync } from "node:fs";
import { homedir } from "node:os";
import { createHash } from "node:crypto";

const project = "casabellanailsspawebsite";
const database = `projects/${project}/databases/(default)`;
const root = `https://firestore.googleapis.com/v1/${database}/documents`;
const config = JSON.parse(readFileSync(`${homedir()}/.config/configstore/firebase-tools.json`, "utf8"));
const token = config.tokens?.access_token;
if (!token) throw new Error("Sign in with Firebase CLI before importing services.");
const headers = { Authorization: `Bearer ${token}`, "Content-Type": "application/json" };
const sections = JSON.parse(readFileSync(new URL("./data/lovely-menu.json", import.meta.url), "utf8"));

async function request(url, options = {}) {
  const response = await fetch(url, { ...options, headers });
  const data = await response.json();
  if (!response.ok) throw new Error(`Firebase request failed (${response.status}): ${data.error?.message ?? "Unknown error"}`);
  return data;
}

const existing = new Set();
let pageToken = "";
do {
  const url = new URL(`${root}/lovelyNailServices`);
  url.searchParams.set("pageSize", "1000");
  if (pageToken) url.searchParams.set("pageToken", pageToken);
  const page = await request(url);
  for (const document of page.documents ?? []) existing.add(document.name);
  pageToken = page.nextPageToken ?? "";
} while (pageToken);

const writes = [];
sections.forEach((section, sectionOrder) => {
  section.items.forEach(([name, price, description], itemOrder) => {
    const key = `${name}::${section.title}`;
    const id = createHash("sha256").update(key).digest("hex").slice(0, 24);
    const documentName = `${database}/documents/lovelyNailServices/${id}`;
    if (existing.has(documentName)) return;
    const stringField = (value) => ({ stringValue: value });
    writes.push({
      update: {
        name: documentName,
        fields: {
          name: stringField(name),
          category: stringField(section.title),
          key: stringField(key),
          shortDescription: stringField(description || section.note),
          duration: stringField("Varies by service"),
          priceFrom: { integerValue: String(Number(price.match(/\d+/)?.[0] ?? 0)) },
          pricePrefix: stringField(price.startsWith("+") ? "+" : ""),
          priceSuffix: stringField(price.endsWith("+") ? "+" : ""),
          priceVaries: { booleanValue: price === "Price Varies" },
          sectionNote: stringField(section.note),
          sectionOrder: { integerValue: String(sectionOrder) },
          itemOrder: { integerValue: String(itemOrder) },
          salonname: stringField("Lovely Nail & Spa"),
          createdAt: { timestampValue: new Date().toISOString() },
          updatedAt: { timestampValue: new Date().toISOString() },
        },
      },
      currentDocument: { exists: false },
    });
  });
});

if (writes.length) await request(`${root}:commit`, { method: "POST", body: JSON.stringify({ writes }) });
console.log(`Imported ${writes.length} Lovely services; preserved ${existing.size} existing records.`);
