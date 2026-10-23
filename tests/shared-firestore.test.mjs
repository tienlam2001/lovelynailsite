import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import ts from "typescript";

const source = await readFile(new URL("../app/firebase-public.ts", import.meta.url), "utf8");
const compiled = ts.transpileModule(source, {
  compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ESNext },
}).outputText;
const {
  firebaseProjectId,
  galleryItemsFromDocuments,
  isLovelyRecord,
  locationKey,
  menuSectionsFromDocuments,
  upcomingMarketingEvents,
  welcomeOfferFromDocuments,
} = await import(`data:text/javascript;base64,${Buffer.from(compiled).toString("base64")}`);

const now = new Date("2026-10-23T18:00:00Z");

function document(id, fields, updateTime = "2026-10-06T19:23:55.166901Z") {
  return {
    name: `projects/casabellanailsspawebsite/databases/(default)/documents/offers/${id}`,
    updateTime,
    fields,
  };
}

function stringField(value) {
  return { stringValue: value };
}

const lovelyOffer = document("lovely", {
  location: stringField("lovely"),
  title: stringField("Enjoy 10% OFF Your Visit"),
  message: stringField("Receive 10% OFF when you spend over $50."),
  badge: stringField("10% OFF Mon-Tue"),
  kicker: stringField("Save 10% OFF Mon-Tue"),
  ctaLabel: stringField("Claim Your 10% OFF"),
  ctaPath: stringField("/promotions"),
  imageUrl: stringField(""),
  slideDurationMs: { integerValue: "6500" },
  slides: {
    arrayValue: {
      values: [{
        mapValue: {
          fields: {
            title: stringField("Relax & Save 10% Off Your Visit"),
            message: stringField("Enjoy 10% off your total."),
            badge: stringField("10% Off Mon-Tue"),
            kicker: stringField("10% Off Mon-Tue Special"),
            imageUrl: stringField("https://media.base44.com/images/public/example/slide.png"),
          },
        },
      }],
    },
  },
});

const casabellaOffer = document("welcome", {
  location: stringField("casabella"),
  title: stringField("Casabella weekday offer"),
  message: stringField("10% off over $70."),
  badge: stringField("10% OFF"),
  kicker: stringField("Casabella"),
  ctaLabel: stringField("Claim"),
  ctaPath: stringField("/promotions"),
});

test("uses Operatix location keys and the public project id", () => {
  assert.equal(locationKey("Lovely Nail & Spa"), "lovely");
  assert.equal(locationKey("Lovely Nails"), "lovely");
  assert.equal(locationKey("Casabella Nails And Spa"), "casabella");
  assert.equal(locationKey("Ecco Nails"), "ecco");
  assert.equal(isLovelyRecord({ location: "lovely" }), true);
  assert.equal(isLovelyRecord({ location: "casabella", documentId: "lovely" }), false);
  assert.equal(isLovelyRecord({ salonname: "Lovely Nail & Spa" }), true);
  assert.equal(firebaseProjectId(), "casabellanailsspawebsite");
  assert.doesNotMatch(source, /private_key|service_account|BEGIN PRIVATE|api_key/i);
});

test("keeps only active Lovely offers and Lovely promotions", () => {
  const lovelyPromotion = document("promo-lovely", {
    salonname: stringField("Lovely Nail & Spa"),
    business: stringField("Lovely Nail & Spa"),
    title: stringField("October weekday special"),
    description: stringField("Ask about this week's Lovely special."),
    offer: stringField("10% OFF over $50"),
    isActive: { booleanValue: true },
    startDate: stringField("2026-10-01"),
    endDate: stringField("2026-10-23"),
    imageUrl: stringField("https://example.com/lovely.png"),
  }, "2026-10-03T00:00:00Z");
  const casabellaPromotion = document("promo-casa", {
    salonname: stringField("Casabella Nails And Spa"),
    business: stringField("Casabella Nail & Spa"),
    title: stringField("Casabella October"),
    description: stringField("Casabella only"),
    offer: stringField("10% OFF"),
    isActive: { booleanValue: true },
    startDate: stringField("2026-10-05"),
    endDate: stringField("2026-10-31"),
  });
  const expired = document("old", {
    location: stringField("lovely"),
    title: stringField("Expired Lovely offer"),
    message: stringField("Should stay hidden"),
    endDate: stringField("2026-10-22"),
  });
  const draft = document("draft", {
    location: stringField("Lovely Nails"),
    title: stringField("Draft offer"),
    message: stringField("Not published"),
    status: stringField("draft"),
  });
  const disabled = document("off", {
    location: stringField("lovely"),
    title: stringField("Hidden offer"),
    enabled: { booleanValue: false },
  });

  const offer = welcomeOfferFromDocuments(
    [casabellaOffer, disabled, draft, expired, lovelyOffer],
    [casabellaPromotion, lovelyPromotion],
    now,
  );
  assert.equal(offer.slides.length, 2);
  assert.equal(offer.slides[0].title, "Relax & Save 10% Off Your Visit");
  assert.equal(offer.slides[0].ctaLabel, "Claim Your 10% OFF");
  assert.equal(offer.slides[0].imageUrl, "https://media.base44.com/images/public/example/slide.png");
  assert.equal(offer.slides[1].title, "October weekday special");
  assert.equal(offer.slides[1].badge, "10% OFF over $50");
  assert.equal(offer.slideDurationMs, 6500);
  assert.equal(welcomeOfferFromDocuments([casabellaOffer], [], now), null);
});

test("filters gallery and services to Lovely", () => {
  const photos = galleryItemsFromDocuments([
    document("casa", {
      salonname: stringField("Casabella Nails And Spa"),
      imageUrl: stringField("https://example.com/casa.jpg"),
      alt: stringField("Casabella set"),
    }),
    document("hidden", {
      salonname: stringField("Lovely Nail & Spa"),
      imageUrl: stringField("https://example.com/hidden.jpg"),
      title: stringField("Hidden"),
      hidden: { booleanValue: true },
    }),
    document("http", {
      salonname: stringField("Lovely Nail & Spa"),
      imageUrl: stringField("http://example.com/insecure.jpg"),
      title: stringField("Insecure"),
    }),
    document("lovely", {
      salonname: stringField("Lovely Nail & Spa"),
      imageUrl: stringField("https://example.com/lovely.jpg"),
      title: stringField("Blush floral set"),
      tags: { arrayValue: { values: [stringField("Floral")] } },
      featured: { booleanValue: true },
      sortOrder: { integerValue: "2" },
    }),
  ]);
  assert.deepEqual(photos, [{ title: "Blush floral set", image: "https://example.com/lovely.jpg", category: "Floral" }]);

  const menu = menuSectionsFromDocuments([
    document("casa-service", {
      salonname: stringField("Casabella Nails And Spa"),
      name: stringField("Gel Manicure"),
      category: stringField("Manicure"),
      priceFrom: { integerValue: "35" },
    }),
    document("inactive", {
      salonname: stringField("Lovely Nail & Spa"),
      name: stringField("Old Pedicure"),
      category: stringField("Pedicures"),
      priceFrom: { integerValue: "20" },
      active: { booleanValue: false },
    }),
    document("pedi", {
      salonname: stringField("Lovely Nail & Spa"),
      name: stringField("Classic Pedicure"),
      category: stringField("Pedicures"),
      priceFrom: { integerValue: "33" },
      sectionNote: stringField("Relaxing foot care."),
      shortDescription: stringField("Spa soak and massage."),
      sectionOrder: { integerValue: "1" },
      itemOrder: { integerValue: "1" },
    }),
  ]);
  assert.equal(menu.length, 1);
  assert.equal(menu[0].title, "Pedicures");
  assert.equal(menu[0].featured, true);
  assert.deepEqual(menu[0].items, [["Classic Pedicure", "$33", "Spa soak and massage."]]);
});

test("keeps upcoming and current public Lovely marketing events", () => {
  const event = (id, fields) => document(id, fields);
  const events = upcomingMarketingEvents([
    event("past", {
      title: stringField("Past manicure night"),
      location: stringField("lovely"),
      isPublic: { booleanValue: true },
      startDate: stringField("2026-10-01"),
      endDate: stringField("2026-10-22"),
    }),
    event("private", {
      title: stringField("Staff meeting"),
      location: stringField("lovely"),
      isPublic: { booleanValue: false },
      startDate: stringField("2026-10-24"),
    }),
    event("casabella", {
      title: stringField("Casabella trunk show"),
      location: stringField("casabella"),
      isPublic: { booleanValue: true },
      startDate: stringField("2026-10-30"),
    }),
    event("current", {
      title: stringField("Weekday glow"),
      location: stringField("lovely"),
      isPublic: { booleanValue: true },
      startDate: stringField("2026-10-20"),
      endDate: stringField("2026-10-23"),
      offerId: stringField("lovely"),
      type: stringField("Promotion"),
      description: stringField("A Lovely weekday event."),
    }),
    event("all-salons", {
      title: stringField("Holiday preview"),
      location: stringField("all"),
      isPublic: { booleanValue: true },
      startDate: { timestampValue: "2026-10-24T03:30:00Z" },
      offer_id: stringField("not a safe id"),
    }),
    event("later", {
      title: stringField("November set"),
      location: stringField("lovely"),
      isPublic: { booleanValue: true },
      startDate: stringField("2026-11-02"),
      imageUrl: stringField("https://example.com/event.png"),
      offerId: stringField("welcome"),
    }),
  ], now);
  assert.deepEqual(events.map((item) => item.title), ["Weekday glow", "Holiday preview", "November set"]);
  assert.equal(events[0].timing, "current");
  assert.equal(events[0].offerId, "lovely");
  assert.equal(events[0].eventType, "Promotion");
  assert.equal(events[1].location, "all");
  assert.equal(events[1].startDate, "2026-10-23");
  assert.equal(events[1].timing, "current");
  assert.equal(events[1].offerId, "");
  assert.equal(events[2].timing, "upcoming");
  assert.equal(events[2].offerId, "welcome");
  assert.equal(events[2].imageUrl, "https://example.com/event.png");
});
