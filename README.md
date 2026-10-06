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

## Service price management

The homepage reads its complete menu from `lovelyNailServices` in the shared Firebase
project. In Casabella's Admin Services editor, select `Lovely Nail & Spa`.
Saved names, descriptions, prices, categories, additions, and removals appear on
the next Lovely homepage load. `sectionOrder` and `itemOrder` control display
order; `active: false` hides a service. Public visitors can read
the menu; only users with the existing Firebase `admin` claim can edit it.
Current menu values remain the fallback if Firebase is unavailable.

## Welcome offer and promotional slides

The welcome popup and homepage promotion read `offers/lovely` from the shared
Firestore project on each page load. Edit `kicker`, `title`, `badge`, `message`,
`imageUrl`, `ctaLabel`, and `ctaPath` in the other site's offer editor.
An empty `slides` array uses the top-level offer; otherwise each slide can override
those fields. `slideDurationMs` controls rotation (default 6500 ms), with manual
controls and reduced-motion support. `enabled: false` hides the offer.
The popup displays the first slide. Closing it leaves a side tab, unless the
visitor chooses “Don't show this again.” `/promotions` links to the homepage
promotion section; `/booking` uses the appointment link. Missing or unavailable
offers never display a fabricated discount.

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

Lovely's gallery reads the public `galleryImages` collection in Firebase project
`casabellanailsspawebsite`, database `(default)`. No service-account key is used.
Manage uploads through the existing gallery administrator and set `salonname`
to `Lovely Nail & Spa`. Each record needs an HTTPS `imageUrl` and may include
`alt` for its accessible description. Casabella-labeled photos are excluded.
When no Lovely records exist or Firebase cannot be reached, the nine existing
Lovely photos remain visible. New records appear on the next page load.

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
