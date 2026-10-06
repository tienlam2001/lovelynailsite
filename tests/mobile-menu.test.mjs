import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import ts from "typescript";

const source = await readFile(new URL("../app/mobile-menu.ts", import.meta.url), "utf8");
const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext } }).outputText;
const { matchingServices } = await import(`data:text/javascript;base64,${Buffer.from(compiled).toString("base64")}`);
const sections = [
  { title: "Manicure", note: "Nail grooming", items: [["Regular Manicure", "$25"], ["Gel Color & Manicure", "$35"]] },
  { title: "Pedicures", note: "Foot care", items: [["Classic Pedicure", "$33", "Spa soak and hot towel"]] },
  { title: "Dipping Powder", note: "Color sets", items: [["Full Set Color", "$45"]] },
  { title: "Acrylic", note: "Sets and fills", items: [["Fill-In — Gel Polish", "$50"]] },
];

test("service aliases match actual service prices and descriptions", () => {
  assert.equal(matchingServices(sections, "mani", "All").length, 2);
  assert.equal(matchingServices(sections, "pedi", "All")[0].price, "$33");
  assert.equal(matchingServices(sections, "SNS", "All")[0].price, "$45");
  assert.equal(matchingServices(sections, "dip", "All")[0].category, "Dipping Powder");
  assert.equal(matchingServices(sections, "refill", "All")[0].price, "$50");
  assert.equal(matchingServices(sections, "gel manicure", "All")[0].price, "$35");
  assert.equal(matchingServices(sections, "hot towel", "All")[0].description, "Spa soak and hot towel");
});

test("category filters, empty queries and unmatched searches are predictable", () => {
  assert.equal(matchingServices(sections, "", "All").length, 5);
  assert.equal(matchingServices(sections, "", "Acrylic").length, 1);
  assert.equal(matchingServices(sections, "pedi", "Acrylic").length, 0);
  assert.equal(matchingServices(sections, "not a service", "All").length, 0);
  assert.equal(matchingServices(sections, "", "All")[0].description, "Nail grooming");
});
