# vinext-starter

## Phone and tablet experience

Phones and tablets share the desktop's ivory, blush, and deep rose palette, with
soft ambient lighting, frosted surfaces, and a quick-action home screen. Pricing and
gallery panels slide within the current page, with Back and deliberate horizontal
swipes returning home. Search aliases include mani, pedi, dip/SNS, and refill.
Search, categories, and panel scroll positions stay intact while switching panels.
Hidden screens are inert; focus returns to the invoking home button. Motion is
disabled for reduced-motion preferences. Safe-area padding supports notched devices.
The desktop layout remains the default above 1100px; coarse-pointer tablets are
also supported through 1366px. Gallery filters derive from real image categories
or titles, using Lovely's Firestore photos with the owner's nine photos as fallback.
Tapping a photo opens a keyboard-accessible, uncropped full-image dialog.

## Shared Operatix data

Lovely Nail & Spa reads the same Firebase project Operatix already writes:
`casabellanailsspawebsite`, database `(default)`. The public project id is the
only client config. No service-account key, admin token, or Base44 service
credential is used. Optional overrides are `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
and `NEXT_PUBLIC_FIREBASE_DATABASE_ID` (see `.env.example`).

Operatix covers Lovely Nails, Casabella Nails And Spa, and Ecco Nails. This
site keeps a record only when it belongs to Lovely:

- Offers use the Operatix location slug `lovely` (the Offers screen saves
  `location: "lovely"` on the `offers` collection). `offers/welcome` is
  Casabella and is ignored.
- Gallery, services, and promotions use `salonname` / `business`. The same
  key Operatix uses — dropping “nail(s)”, “spa”, and “and” — matches
  `Lovely Nail & Spa` and `Lovely Nails`, and rejects Casabella and Ecco.
- A record with no location or salon name is Lovely only when its document id
  is `lovely`.

Active means not `enabled: false`, `active: false`, `isActive: false`,
`hidden: true`, or a status of draft, archived, inactive, disabled, paused,
expired, or hidden. `startDate` and `endDate` (`YYYY-MM-DD`) are inclusive
calendar days in America/New_York. Missing dates mean the record is not
date-limited.

## Service price management

The homepage reads `lovelyNailServices`, plus any Lovely rows in `services`.
In Operatix Firestore Content, or Casabella's Admin Services editor, select
`Lovely Nail & Spa`. Saved names, descriptions, prices, categories, additions,
and removals appear on the next Lovely homepage load. `sectionOrder` and
`itemOrder` control display order; `active: false` hides a service. Public
visitors can read the menu; only users with the existing Firebase `admin`
claim can edit it. The built-in menu remains visible if both collections are
unreachable. An empty published menu shows a short “being updated” note.

## Welcome offer and promotional slides

Each page load lists the shared `offers` collection and the `promotions`
collection. Active Lovely offers are shown first, newest `updateTime` first.
Operatix Offers → Lovely Nail & Spa writes that offer, including AI slide
images on `slides[].imageUrl`. Each offer uses its own `kicker`, `title`,
`badge`, `message`, `imageUrl`, `ctaLabel`, and `ctaPath`. Slide images inherit
the offer’s call to action. An empty `slides` array uses the offer itself.
Active Lovely rows in `promotions` (`title`, `description`, `offer`, `imageUrl`,
`isActive`, `startDate`, `endDate`, `salonname`) are extra slides after the
welcome offer. `slideDurationMs` controls rotation (default 6500 ms), with
manual controls and reduced-motion support. The popup shows the first slide.
Closing it leaves a side tab, unless the visitor chooses “Don't show this again.”
`/promotions` links to the homepage promotion section; `/booking` uses the
appointment link. When nothing active is published, the promotion card says so.
When Firestore cannot be reached, it says offers are unavailable. Neither state
invents a discount.

## Marketing events

Operatix writes public events to `marketingEvents`. The site runs one structured
query: `location in ["lovely", "all"]`, `isPublic == true`, ordered by
`startDate`. That `isPublic` filter is required; the rules allow a public read
only when it is true, and an unfiltered list is denied. The composite index is
`location`, `isPublic`, `startDate`.

An event is shown when its end (or start, if it has no end) is today or later
in America/New_York. `startDate` and `endDate` are `YYYY-MM-DD` or timestamps.
Cards use `title`, `description` (or `summary` / `notes`), `type`, and an HTTPS
`imageUrl`. `location: "all"` is included and labeled as every Operatix salon.
If `offerId` is set, the card links to the on-page offer. The section is
omitted when nothing is upcoming or the query fails, including while the
composite index is still building.

## Business hours

The homepage reads `salonHours/lovely`. `weekly` is `mon` through `sun`, each
`{ open: "HH:mm", close: "HH:mm", closed: bool }`. `specialHours` is a list of
`{ date: "YYYY-MM-DD", open, close, closed, note }`. `timezone` is an IANA name;
a missing or invalid zone uses America/New_York. Times are shown as `9:30 AM`.
When a special-hours date is today in that timezone, the booking strip, contact
card, footer, and phone home show that notice. schema.org `openingHours` follows
the weekly schedule, and `specialOpeningHoursSpecification` lists today’s and
upcoming exceptions.

This site had no hours in the footer, contact card, booking strip, or JSON-LD.
If the document is missing or the read fails, those places use the schedule
published for 3317 Daniels Rd: Monday–Saturday 9:00 AM–7:00 PM and Sunday
11:00 AM–5:00 PM (Yelp, September 2026, and Loc8NearMe). A public read of
`salonHours` is still denied until the rule in
`firestore/lovely-shared-content.rules` is merged, so the site shows that
fallback until then. Save the Lovely week in Operatix on `salonHours/lovely`
and publish the public-read rule to replace it.

Offer posters support 900 × 1400 px portrait artwork. The homepage preview uses
a roomy 16:10 landscape card, with the entire image centered inside without
cropping or stretching. Cards resize for phones, tablets, and desktops. The popup
fits the entire poster with `object-fit: contain`, while long offer details scroll
independently. Phones use stacked poster/details panes; tablets use side-by-side
panes. The close button remains outside the scrolling details.

## Promotion subscriber list

The homepage signup collects name, phone, and email in `lovelyNailPromotionList`
in the shared Firestore project. Email consent is required; SMS consent is optional.
Each record stores the consent wording/version, salon name, website source, and
a server-generated `createdAt`. Visitors can create validated entries but cannot
read, update, or delete subscribers. Existing Firebase admins can manage the list.
The scoped rule addition is in `firestore/lovely-promotion-list.rules`; it relies
on the existing `isAdmin()` helper and belongs inside the database documents scope.
Do not deploy that snippet as the entire shared project's rules.
The collection is materialized when the first visitor signs up. This form collects
subscriptions only; it does not send emails or SMS. Configure sending and
unsubscribe handling separately before using the list for campaigns.

## Customer chat

The floating customer chat embeds Operatix's public `/lovely-chat` page.
Staff read and reply at `/customer-chats` in Operatix. The private
`lovelyCustomerChats` Firestore collection stores conversations; visitors only
access their own conversation using a random session token. Service credentials
stay in the Operatix backend. The inbox permits owners and assigned Lovely
managers, and polls for updates while open. Chat is not an automatic booking
confirmation and does not claim staff are always online.
Publish the Operatix chat function/pages before publishing this website widget.

## Shared gallery

The gallery reads two public collections in `casabellanailsspawebsite` /
`(default)`: Operatix Gallery Manager’s `gallery` collection, then the existing
`galleryImages` collection. No service-account key is used. Set `salonname` to
`Lovely Nail & Spa`. Each record needs an HTTPS `imageUrl`. `alt` or `title`
is the accessible description; `category` or the first `tags` entry groups
mobile filters. `featured` and `sortOrder` control order. `active: false` or
`hidden: true` omits a photo. Casabella-labeled photos are excluded. `gallery`
is not publicly readable until the rule in
`firestore/lovely-shared-content.rules` is merged, so Operatix uploads stay
hidden until that rule is published. When no Lovely records exist or Firebase
cannot be reached, the nine existing Lovely photos remain visible. New records
appear on the next page load.

## What the owner sets in Operatix

1. Offers: open Operatix → Offers, choose **Lovely Nail & Spa**, and save.
   That writes `location: "lovely"` in Firestore `offers`. Casabella stays on
   `location: "casabella"`.
2. Services: in Firestore Content, choose Lovely so rows go to
   `lovelyNailServices` with `salonname` `Lovely Nail & Spa`.
3. Gallery: upload in Gallery Manager with salon name `Lovely Nail & Spa`,
   then publish the public-read rule for `gallery`. Photos already stored in
   `galleryImages` with that salon name show without the new rule.
4. Promotions: create a Firestore Content promotion with `salonname`
   `Lovely Nail & Spa`, `isActive: true`, and inclusive `startDate` / `endDate`.
5. Hours: save `salonHours/lovely` with `weekly` (`mon`–`sun`), optional
   `specialHours`, and `timezone`. Merge the public-read rule for `salonHours`.
6. Marketing events: save a `marketingEvents` document with `location` `lovely`
   or `all`, `isPublic: true`, and a `startDate`. Set `offerId` to the offer
   document id when the event should link to that offer. Keep the composite
   index `location` + `isPublic` + `startDate` enabled.
7. Leads: the homepage form creates `lovelyNailPromotionList` documents
   (name, phone, email, consent, `salonname`, source `nailslovely.com`).
   Deploy `firestore/lovely-promotion-list.rules` inside the existing rules.
   Operatix → Firebase Alerts → Check now is what surfaces new signups.
8. Chat: keep Operatix `/lovely-chat` published and embeddable. This site
   iframes that page; staff reply at `/customer-chats`. The private chat
   collection is written by the Operatix function, not by a key in this repo.
9. Google reviews live in Operatix’s `GoogleReview` records, keyed by the
   Base44 location id, and are not in this public Firestore project. The
   homepage keeps its curated reviews.

`firestore/lovely-shared-content.rules` is a prototype to merge. It is not a
complete rules file. Public read is limited to marketing collections. Review
it before publishing, and do not replace the database rules with that file.

A clean full-stack starter running on
[vinext](https://github.com/cloudflare/vinext), with optional Cloudflare D1 and
Drizzle support.

## Prerequisites

- Node.js `>=22.13.0`

## Quick Start

```bash
npm install
npm run dev
npm run build
```

This starter does not use `wrangler.jsonc`.

## Included Shape

- edit site code under `app/`
- `.openai/hosting.json` declares optional Sites D1 and R2 bindings
- `vite.config.ts` simulates declared bindings for local development
- `db/schema.ts` starts intentionally empty
- `examples/d1/` contains an optional D1 example surface
- `drizzle.config.ts` supports local migration generation when needed

## Workspace Auth Headers

OpenAI workspace sites can read the current user's email from
`oai-authenticated-user-email`.

SIWC-authenticated workspace sites may also receive
`oai-authenticated-user-full-name` when the user's SIWC profile has a non-empty
`name` claim. The full-name value is percent-encoded UTF-8 and is accompanied by
`oai-authenticated-user-full-name-encoding: percent-encoded-utf-8`.

Treat the full name as optional and fall back to email when it is absent:

```tsx
import { headers } from "next/headers";

export default async function Home() {
  const requestHeaders = await headers();
  const email = requestHeaders.get("oai-authenticated-user-email");
  const encodedFullName = requestHeaders.get("oai-authenticated-user-full-name");
  const fullName =
    encodedFullName &&
    requestHeaders.get("oai-authenticated-user-full-name-encoding") ===
      "percent-encoded-utf-8"
      ? decodeURIComponent(encodedFullName)
      : null;

  const displayName = fullName ?? email;
  // ...
}
```

## Optional Dispatch-Owned ChatGPT Sign-In

Import the ready-to-use helpers from `app/chatgpt-auth.ts` when the site needs
optional or required ChatGPT sign-in:

- Use `getChatGPTUser()` for optional signed-in UI.
- Use `requireChatGPTUser(returnTo)` for server-rendered pages that should send
  anonymous visitors through Sign in with ChatGPT.
- Use `chatGPTSignInPath(returnTo)` and `chatGPTSignOutPath(returnTo)` for
  browser links or actions.
- Pass a same-origin relative `returnTo` path for the destination after sign-in
  or sign-out. The helper validates and safely encodes it.
- Mark protected pages with `export const dynamic = "force-dynamic"` because
  they depend on per-request identity headers.

Dispatch owns `/signin-with-chatgpt`, `/signout-with-chatgpt`, `/callback`, the
OAuth cookies, and identity header injection. Do not implement app routes for
those reserved paths. Routes that do not import and call the helper remain
anonymous-compatible.

SIWC establishes identity only; it does not prove workspace membership. Use the
Sites hosting platform's access policy controls for workspace-wide restrictions,
or enforce explicit server-side membership or allowlist checks.

Use SIWC for account pages, user-specific dashboards, saved records, and write
actions tied to the current ChatGPT user. Leave public content anonymous.

## Useful Commands

- `npm run dev`: start local development
- `npm run build`: verify the vinext build output
- `npm test`: build the starter and verify its rendered loading skeleton
- `npm run db:generate`: generate Drizzle migrations after schema changes

## Learn More

- [vinext Documentation](https://github.com/cloudflare/vinext)
- [Drizzle D1 Guide](https://orm.drizzle.team/docs/get-started/d1-new)
