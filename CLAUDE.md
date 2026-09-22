# Keith & Co Consulting — Website

Static marketing website for Keith & Co Consulting (Pty) Ltd, a South African
event infrastructure and project management company (custom exhibition stands,
shell schemes, AV, furniture hire, marquees, electrics).
Domain: www.keithandco.co.za. The site's job is to look professional, be found
online, and generate enquiries.

## Stack & structure

Plain HTML/CSS/JS — no framework, no build step. Keep it that way unless the
client's needs change; simplicity is a feature here.

- `index.html` — home: top contact bar, sticky header, hero slider, stats strip,
  about teaser, 8-service grid, achievements, client logos, CTA band, footer
- `about.html`, `services.html`, `contact.html` — interior pages
- `gallery.html` — filterable photo grid (Custom Stands / Shell Scheme /
  Marquees / Furniture) with a click-to-enlarge lightbox; both vanilla JS,
  no library. Source photos live in `assets/images/gallery/`; unused/
  not-yet-vetted photos stay staged in `assets/images/gallary_tab/` (typo'd
  folder name, not worth a churn-only rename) until categorised or replaced.
- `css/styles.css` — the entire design system (single stylesheet)
- `js/main.js` — slider, mobile menu, scroll reveal, active-nav, form handler,
  gallery filter/lightbox (enquiry form on `contact.html` posts to Formspree
  via fetch, with an inline success/error message; endpoint is
  `https://formspree.io/f/xzepgqwg`, set to deliver to Keith & Co's
  info@keithandco.co.za inbox)
- `assets/images/` — photography (hero slides, service images) — mostly TODO
- `assets/logos/` — company + client logos — mostly TODO

The top bar, header, and footer are duplicated across pages (now five:
index/about/services/gallery/contact). When editing them, apply the same
change to ALL FIVE HTML files.

## Brand rules (CI) — do not deviate

- Navy: `#243655` (primary, PANTONE from client CI), deep navy `#1a2940`,
  ink `#141f30`
- Greyscale: silver `#b9bdc4`, mist `#f2f3f5`, cloud `#e6e8eb`, white `#ffffff`
- NO other hues. No accent colours, no gradients outside the navy/grey family.
- Fonts: Archivo (display/headings, weights 600–800), Inter (body).
  Wordmark: "Keith & Co." is Halo Handletter (script, `--font-script`,
  self-hosted @font-face, file live at `assets/fonts/HaloHandletter.woff2`
  and `.woff` — donationware; commercial use needs a donation to the
  author, see dafont.com/halohandletter.font — TODO: donation not yet made).
  "CONSULTING" subtext is Myriad Pro (`--font-wordmark-sub`, via Adobe
  Fonts/Typekit web embed, kit live at use.typekit.net/lxe2zei.css, linked
  in the `<head>` of index/about/services/contact.html). Client is on
  Adobe's free plan, which only includes Myriad Pro Bold/Bold Condensed —
  Semibold needs a Creative Cloud subscription. Decision: ship on Bold
  (`.sub` is explicitly `font-weight:700` to match on purpose) rather than
  subscribe for one small letter-spaced label; revisit if/when Creative
  Cloud gets picked up for other reasons — Semibold would activate through
  the same kit URL with no relink needed.
  Allura remains loaded as the Halo Handletter fallback only — not used
  elsewhere now that the real logo font is known.
- Signature motif: the 45°-rotated square (diamond), taken from the logo.
  Used for bullets, eyebrow markers, social icons, background shapes.
- Text on navy is white/silver; drop shadows are subtle (`--shadow` token).

## Content rules

- Copy comes from the client's company profile: 10+ years' experience, event
  infrastructure & project management, "quality rather than quantity",
  global standards, alleviating event pressure. Keep this voice: confident,
  concrete, no hype.
- Values: shown on about.html as a single branded graphic
  (`assets/images/values-mural.jpg`, from the client's own mural artwork,
  2400x1200 source at `Mural_5x2.5m_100dpi_upscaled.jpg`) rather than a text
  list. Values as depicted: Excellence, Integrity, Innovation, Customer
  Focus, Passion, Exceptional Experiences.
- Achievements (fixed list): Mining Indaba, 62nd International Astronautical
  Congress, Africa Utility Week, Africa Energy Indaba, Commonwealth Law
  Congress. Venues: CTICC, Sandton Convention Centre, Spier, ELCC, DICC, SCC.
- Clients/associates (real logos, `assets/logos/client-*.{jpg,png}`): Aberdeen
  Standard Investments, ACPI Investment Managers, Batseta (Council of
  Retirement Funds for South Africa), Event Greening Forum, Vunani Fund
  Managers, Argon Asset Management. Janus Henderson logo received but only as
  `.eps` (in `assets/logos/company_logos/`, not web-usable) — swap in once a
  PNG/JPG/SVG version arrives.
- Contact: Sandhurst Office Park, The Grove building, Cnr Rivonia Road and
  Harrow Road, Sandhurst, Johannesburg, Gauteng; 081 767 2224
  (`tel:+27817672224`) — single number, used everywhere (the old two-number
  set is retired). Reg No: 2015/449586/07.
- The email info@keithandco.co.za is confirmed correct by the client.

## Outstanding TODOs (marked with `TODO` comments in the files)

1. ~~Replace hero slide gradients with real photography~~ — client's
   explicit call 2026-09-18: the CSS-gradient hero (`.slide-N .ph` in
   styles.css, navy gradients layered with a geometric texture — truss
   lines / blueprint grid / diamond lattice) stays as-is for now. Raised
   this twice in review (it was the top call-out in an "Apple-tier
   comparison" and again in a follow-up rating) and got the same answer
   both times: deliberate choice, not an oversight, not worth relitigating
   — only revisit as part of a future full site upgrade, and only if the
   client raises it first.
2. Swap in a real Janus Henderson logo (PNG/JPG/SVG) once available —
   `.eps` can't be used on the web.
3. First testimonial (First Medical) is real; second (Batseta, from their
   signed recommendation letter) added 2026-08-14; third (Board of
   Healthcare Funders, attributed under the Momentum logo) added
   2026-08-24. The `.t-stage` crossfade is generalized for N slides —
   cycle length is `7s * N` with each `.t-slide:nth-child(k)` delayed by
   `7s * (k-1)`, and the `testiFade` keyframe percentages are scaled to
   `100/N` per slide — so adding a 4th just needs a new `nth-child` delay
   rule and the cycle/keyframe numbers recalculated the same way.
4. Real photography exists for services/about (assets/images/) but is
   applied via CSS `background-image` on `<div>`s, not `<img>` tags — so
   none of it has an accessible text alternative for screen readers. Same
   will apply to the hero slides once real photos land there.
5. Deploy bloat: `assets/logos/company_logos/` (~3MB of duplicate staging
   logos + the unusable Janus Henderson `.eps`) and one orphaned unused
   image (`team-on-site1.jpg`) aren't referenced by any page — worth
   excluding from deploy or deleting. (`catering.jpg` is no longer orphaned
   — now live on gallery.html as `assets/images/gallery/furniture-styled-dining.jpg`.)
6. Make the commercial-use donation for Halo Handletter to the author
   (dafont.com/halohandletter.font lists a PayPal address) — the font file
   itself is already live and wired up, only the donation is outstanding.
7. (Deferred, not blocking) Myriad Pro Semibold for `.brand .name .sub`
   needs a Creative Cloud subscription — client's free Adobe Fonts plan
   only includes Bold/Bold Condensed. Shipped on Bold instead (see brand
   rules above). Revisit only if Creative Cloud gets picked up anyway.
8. `privacy-policy.html`'s Information Officer section deliberately gives
   only a role email (info@keithandco.co.za), not a named individual —
   client's explicit call 2026-09-22, also dropped the Reg No. from "Who
   we are" the same day. Client should be aware (was flagged, not
   independently verified as their specific situation) that POPIA still
   requires an actual designated Information Officer to exist and be
   registered with the Information Regulator — by default that's the
   CEO/head of the company unless someone else is formally appointed —
   regardless of whether the website names them. That registration is a
   business-process action (via the Information Regulator), separate
   from anything in this codebase. Also confirm the "Last updated" date
   at the top once the content is fully signed off (currently just the
   date it was drafted).

### Done (audited 2026-09-22)

- Turnstile went live, same day: client created the real widget on
  Cloudflare, put the site key in `contact.html`, and enabled Turnstile +
  the matching secret key on the correct Formspree form (there were two
  decoys in their account under other projects/form IDs — walked through
  confirming the ID actually matches the one in contact.html,
  `xzepgqwg`, before treating it as done). Verified what's verifiable
  without their Formspree/Cloudflare access: the real key is in place,
  main.js's `turnstileConfigured` check now correctly detects it (a
  submission now genuinely waits on a Turnstile token instead of going
  straight through), and confirmed the domain-restriction mechanism
  itself works — localhost correctly gets rejected ("Unable to connect
  to website", Cloudflare error 110200) since the key is registered only
  to keithandco.co.za, which is also why full end-to-end testing of a
  successful token had to stop at this point; only the deployed domain
  (or temporarily allow-listing localhost in the Cloudflare dashboard)
  can complete that last leg. TODO 9 from the previous entry is done and
  removed.
- Two content simplifications to `privacy-policy.html`, client's call,
  same day: dropped "(Reg No. 2015/449586/07)" from "Who we are", and
  replaced the Information Officer section's two placeholders (name +
  email, in a highlighted `.io-box`) with a single line pointing to
  info@keithandco.co.za — no named individual. Flagged before making the
  change, not just after: POPIA still requires an actual designated
  Information Officer to exist and be registered with the Information
  Regulator (defaults to the CEO/head of the company if no one else is
  formally appointed) regardless of whether the site names them — that's
  a business-process action, separate from this page's copy. Client
  proceeded with the simplified version anyway. `.io-box` CSS removed
  from styles.css since this was its only use. Verified with Playwright:
  still 8 sections, correct text in both edited spots, zero console
  errors, no overflow at 1440px or 390px.

- Added `privacy-policy.html` (new page — same topbar/header/nav/footer as
  the other five, `.page-hero`, then a `.policy` content block, all reusing
  existing tokens/classes) plus a required consent checkbox and two spam
  checks on the enquiry form, 2026-09-22. Drafted as an Artifact preview
  first, per the user's ask, reusing the real CSS tokens/components
  (confirmed Archivo/Inter/Allura all load from Google Fonts inside the
  Artifact sandbox — Allura specifically because it's already this
  codebase's own documented Halo Handletter fallback, so the preview used
  the same fallback chain production does rather than approximating one).
  User approved from that preview, then asked to implement for real.
  - **Privacy Policy content**: all 8 sections the user asked for (who we
    are, what we collect, why/how, who we share with, retention, POPIA
    rights, Information Officer, how to complain). Every fact is either
    already live elsewhere on the site (reg no., address, the exact 6
    fields the contact form actually collects) or independently verified
    — the Information Regulator's complaint email
    (POPIAComplaints@inforegulator.org.za) was confirmed via a live search
    rather than recalled, since a stale regulator contact on a compliance
    page is worse than an obviously-flagged placeholder. Two genuine
    unknowns (Information Officer name/email) are placeholders, not
    invented — see TODO 8 above.
  - **Consent checkbox**: native `required` checkbox directly above the
    submit button, `.consent`/`form.enquiry .consent label` in styles.css.
    Caught a real bug before this shipped: the browser's own required-
    field validation was intercepting the submit event before it ever
    reached the custom handler, so the on-brand `.consent-error` message
    never actually showed (the browser's native tooltip did instead) —
    fixed by adding `novalidate` to the form and having main.js call
    `form.checkValidity()`/`reportValidity()` itself (with the checkbox's
    `required` temporarily lifted) so name/email keep their native
    handling while consent gets the styled message. Also caught a CSS
    specificity collision: `form.enquiry label{text-transform:uppercase}`
    was winning over `.consent label`'s own rule (more element selectors
    = higher specificity) and rendering the consent copy as a shouty caps
    block; fixed with a more specific `form.enquiry .consent label`
    override. Error/invalid states deliberately stay navy, not the red
    used in the first Artifact draft — matches `.form-note.is-error`,
    which already made this same navy-only call sitewide to respect the
    brand rules' "no other hues" line.
  - **Spam protection**: the existing Formspree honeypot (`_gotcha`) is
    unchanged; added a client-side copy of that same check (skip the
    fetch entirely if it's filled, rather than spend a network call
    Formspree was going to reject anyway) plus a `loaded_at` timestamp
    field and a 3-second minimum-fill-time gate in main.js. Both fail
    silently (no error shown) since a real visitor can't trigger either.
  - **Cloudflare Turnstile**: chosen over a custom backend because there
    isn't one — this is a static site posting straight to Formspree, and
    Formspree verifies Turnstile server-side natively (confirmed via
    their docs before committing to this route, rather than assuming).
    Widget added with `data-size="flexible"` — the default fixed 300px
    size doesn't fit inside form.enquiry's 36px padding on a 390px phone
    and forced the whole `.contact-grid` column wider than the viewport
    (a real "grid blowout": grid items don't shrink below their content's
    intrinsic min-width by default); flexible sizing plus `min-width:0` on
    `form.enquiry`/`.turnstile-block`/`.cf-turnstile` fixed it. Site key is
    a placeholder (see TODO 9) — main.js only enforces a token once a real
    key is detected, so the form isn't bricked in the meantime.
  - **Footer + `<head>`**: one new "Privacy Policy" `<li>` in the Site
    column, applied to all six pages now (the five existing ones plus the
    new page itself, per this file's own "duplicated across pages, edit
    all of them" rule above). Also added
    `<link rel="privacy-policy" href="privacy-policy.html">` to all five
    existing pages' `<head>` (and the same `rel` on the footer anchor) —
    a real WHATWG HTML link type, confirmed via the spec rather than
    invented, that a browser or password manager can use to find the
    privacy policy programmatically.
  - **`.html` URLs kept, not changed to clean URLs**: the user's brief
    assumed clean URLs (`/contact`), but the live site uses `.html`
    everywhere (nav, footer, canonical/og tags, sitemap) with no
    `_redirects`/`netlify.toml` in the repo to support anything else —
    flagged this to the user rather than silently picking one, kept
    `.html` to match, left clean URLs as a separate future ask.
  - Added `privacy-policy.html` to sitemap.xml (yearly/0.3, lowest
    priority on the site — informational, not a conversion page). Left
    robots.txt untouched: unlike developer-guide.html this page is meant
    to be indexed.
  - Verified with Playwright across all 6 pages, desktop + mobile: zero
    console/network errors (the one expected exception being Cloudflare's
    own "invalid site key" error on contact.html, which is correct given
    the placeholder key), zero horizontal overflow. Directly exercised the
    form's gate logic with Formspree's real endpoint intercepted (never
    actually submitted anything to the live Formspree account): confirmed
    instant-submit is silently blocked by the timing gate, honeypot-filled
    is silently blocked, unticked consent after the timing gate shows the
    styled error and does not submit, re-ticking clears it, empty
    name/email still triggers native browser validation, and a fully
    valid submission goes through end-to-end with the "sent" state.

### Done (audited 2026-09-21)

- Moved contact.html's FAQ from above the enquiry form to below it,
  2026-09-21 — reverses the earlier placement (the FAQ entries below still
  describe it as sitting above "Get in touch"; that is no longer true).
  Reasoning: the page's job is enquiries, and with the FAQ first the form
  started ~1,180px down (below the fold on a 900px screen); it now starts
  at ~552px. Order is hero → form → FAQ → testimonials. Copy changed to
  match: the FAQ lede and the first answer said "the form below", now
  "the form above". Section backgrounds re-alternate so nothing blends:
  form white, FAQ `var(--mist)`, testimonials now white (`.testi`) with the
  `.t-slide` cards flipped to mist (both rules are contact-page-only —
  `.testi` appears in no other page). Also removed a dead
  `padding-top:0;padding-bottom:96px` from `.faq-block`: it never applied,
  because `section.block{padding:96px 0}` has higher specificity, so the
  FAQ always had normal padding. Verified with Playwright at 1440px and
  390px: section order and backgrounds, all 5 FAQ items reveal, multiple
  items open independently, no horizontal scroll, zero console/network
  errors.

- Gave the FAQ section visual depth, same day — user felt it was too
  plain, specifically the empty space beside the question list. Brand
  rules explicitly forbid any hue outside navy/grey, so "add colour"
  couldn't mean a literal accent colour — used the navy/grey palette
  itself instead, plus motion: (1) `.faq-block` got a `var(--mist)`
  background so the section reads as its own zone instead of blending
  into the white pages above and below it; (2) a 3-layer drifting
  diamond decoration fills the empty right column, reusing the exact
  `diamondDrift1/2/3` keyframes already defined for the homepage hero —
  but at navy-tinted low opacity (`rgba(36,54,85,...)`) rather than the
  white tints those keyframes were originally paired with, since every
  existing diamond decoration in the codebase (`.hero-diamonds`,
  `.page-hero::before`, `.achieve::before`) was built for dark navy
  backgrounds and would be invisible on this light one; hidden below
  820px since it has no room to work at that size, not something a
  phone visitor would miss; (3) each `.faq-item` now gets its own
  `.reveal` class instead of the whole list revealing as one block, so
  questions cascade in individually via the site's existing parent-
  grouped stagger logic in main.js — zero JS changes needed, it "just
  falls out of how .reveal is already used everywhere" (that's a direct
  quote from main.js's own comment on the system); (4) hover on a
  question now nudges its padding right via `--ease-spring` in addition
  to the existing colour change, and an open item gets a subtle navy-
  tinted background so the active question stays visually anchored even
  after the chevron's mid-rotation. Verified with Playwright: all 5
  items carry the `.in` class after scrolling into view (confirming the
  stagger fired), hover and open states render as designed, diamonds
  correctly hidden on 390px mobile, full 5-page sweep with zero console/
  network errors.

- Swapped 2 of the FAQ's 5 questions for deeper ones, same day — user
  felt "How quickly will I hear back?" and "Can I enquire about just one
  service?" were too shallow/transactional. Replaced with "What actually
  happens between my enquiry and the event itself?" (process depth —
  concept first, then project management coordinates timelines/
  suppliers/logistics/venue liaison, one accountable point of contact
  "from concept to breakdown," reusing that exact phrase from the
  homepage hero's own script line) and "Why use one company instead of
  separate suppliers for the stand, AV, furniture and electrics?"
  (the actual value proposition, built on the "one accountable partner,
  not seven suppliers" line that appears twice on services.html — not
  invented, lifted straight from copy already live on the site). Same
  grounding discipline as the first pass: no invented specifics, only
  verified real facts and phrases already on the site. Verified with
  Playwright: correct question text in order, answers open/render
  correctly, no layout regression from the longer answer copy, zero
  console/network errors across all 5 pages.

- Added a new FAQ section to contact.html, 2026-09-21 — user's first ask
  was open-ended ("I don't know where to place it"), so before touching
  the live site, spawned an Explore subagent to read services.html,
  about.html, contact.html and index.html in full plus CLAUDE.md's brand/
  content rules, specifically so every FAQ answer would be grounded in
  real, currently-true facts (10+ years, client relationships since 2010,
  "we typically respond within one business day," the exact 7 live
  service names) rather than invented specifics — the agent's research
  flagged that an 8th service, Xboard (eco-friendly stands), exists in
  the HTML but is commented out/disabled site-wide, so it was deliberately
  left out of every FAQ answer to avoid advertising something not
  actually offered. Built 3 real placement options as one Artifact
  preview first (Contact-page teaser / dedicated FAQ page / Services-page
  service-comparison), each with content tailored to that context and a
  live clickable accordion, plus an honest recommendation (A+B together
  beats C alone, since Services already explains each service in its own
  copy). User picked option A, but positioned as its own standalone
  section above "Get in touch" rather than nested inside the hero the
  way the preview mocked it — not what was previewed, so treated as a
  placement instruction, not a rubber-stamp of the mockup's exact layout.
  Implementation: new `<section class="block faq-block">` inserted
  between contact.html's `.page-hero` and the existing "Get in touch"
  `.block`, using the site's existing `.eyebrow`/`.section-title`/`.lede`
  classes (not new ones) so it matches every other section on the site
  automatically. Caught one bug before it shipped: manually added a
  `<span class="dia">` diamond bullet to the eyebrow, not realising
  `.eyebrow::before` already renders one — produced a double-diamond;
  removed the redundant span. New `.faq-list`/`.faq-item`/`.faq-q`/
  `.faq-chevron`/`.faq-a-wrap`/`.faq-a` CSS added to styles.css (reuses
  `--ease-spring` and the diamond-chevron visual language already
  established elsewhere on the site) and a small accordion-toggle handler
  added to main.js (multiple items can be open at once — not a strict
  single-open accordion). Verified with Playwright: 5 questions, closed
  by default, `aria-expanded` updates correctly, multiple items open
  independently, correct flow into the "Get in touch" section below,
  clean reflow on 390px mobile (question text wraps to 2 lines, chevron
  stays aligned), and a full 5-page sweep with zero console/network
  errors.

- Real Font Awesome brand icons in the footer, replacing "FB"/"IG"/"X"/
  "IN" text abbreviations, 2026-09-21. Designed as an Artifact preview
  first (two options — same diamond container vs. a plain circle) before
  touching the live site, per the user's ask. While building that
  preview, discovered the diamond needed a real fix, not just new icons
  inside the old container: the diamond shape was made by rotating the
  whole box 45° and counter-rotating the icon -45° to cancel it back to
  upright — technically upright, but rotated elements anti-alias
  differently than axis-aligned ones, and it visibly degraded Instagram
  and X's more detailed glyphs (Instagram's camera-lens shape and X's
  mark both looked subtly mangled at 15px). User asked specifically
  whether the icons could be "straight" — rebuilt the diamond with two
  stacked `clip-path:polygon(...)` layers (border-colour layer behind,
  fill layer inset 1px on top) instead of rotating anything at all, so
  the icon glyph is never transformed. Confirmed side-by-side this was a
  real, visible improvement, not just a technical nicety — both icons
  render crisp and properly recognizable once nothing is rotating them.
  User picked option A (diamond, now built the clip-path way).
  Implementation on the live site: added Font Awesome 7.3.1's CSS
  (`css/all.min.css` from cdnjs) to all 5 pages' `<head>`, right before
  `css/styles.css` — deliberately the CSS build, not the JS/SVG kit the
  Artifact preview used (that was only needed there because the Artifact
  sandbox's CSP blocks external stylesheets outside Google Fonts but
  allows cdnjs scripts; the live site has no such restriction, and plain
  `<link rel="stylesheet">` + `<i class="fa-brands fa-x">` is simpler,
  needs no JS, and matches the project's "no build step" ethos better).
  Verified via Playwright network capture that this stays lean despite
  loading the combined `all.min.css`: browsers only fetch a font file
  when a glyph from it is actually used, so only `fa-brands-400.woff2`
  downloads on every page — the unused solid/regular/v4-compat weights
  never load. `.social` in styles.css rewritten to match the artifact's
  clip-path approach exactly. Verified with Playwright across all 5
  pages, desktop and 390px mobile: icons render correctly, hover fill/
  lift works, zero console/network errors, and the font-family
  correctly resolves to "Font Awesome 7 Brands".
  **Not fixed, flagged during this work**: the LinkedIn icon's link is
  still `href="#"` on all 5 pages — not a new issue, was already broken
  before this change, just carried the same placeholder forward since no
  real LinkedIn URL was provided. Send the real URL to close this out.

- Same treatment on about.html's achievements grid 2026-09-21 (its list
  of events is different from the homepage's — Institute of Retirement
  Funds Africa, Morningstar Conference, Africa Utility Week, Africa
  Energy Indaba, INN8 Investment Summit, "Your event next"). Same
  `<a class="event">` pattern, same CSS (shared `.event` rule already
  covers both pages), same verification-before-linking approach. Two
  notable calls made during research: Africa Utility Week was rebranded
  to "Enlit Africa" in 2020 (confirmed via a dedicated search on the
  rebrand itself, not assumed) — linked to wearevuka.com/energy/
  enlit-africa/, the event's current home under its new name, rather
  than a dead "African Utility Week"-branded URL. Institute of Retirement
  Funds Africa had two similar-looking candidate domains in search
  results (irf.org.za and irfa.org.za) — went with irf.org.za since
  that's the one search explicitly resolved as "the official website."
  Verified with Playwright: all 6 hrefs/target/rel correct, "Your event
  next" navigates to contact.html, full 5-page sweep with zero
  console/network errors.

- Made the homepage achievements grid clickable 2026-09-21 — the 6
  `.event` cells (Batseta Winter Conference, Mining Indaba, 62nd
  International Astronautical Congress, Aesthetic Medicine Congress SA,
  Commonwealth Law Congress, "Your event next") were plain `<div>`s with
  no links. Changed each to an `<a class="event">` (same visual cell,
  `display:block` + `text-decoration:none` + `color:inherit` added in
  styles.css so the anchor doesn't change the layout) with a background-
  lighten hover/focus state for a clear interactive cue. The 5 real past
  events open their own official site in a new tab
  (`target="_blank" rel="noopener noreferrer"`); "Your event next" links
  internally to contact.html. Did not guess any of the 5 external URLs —
  verified each via WebSearch rather than relying on memory (conference
  URLs and domains change, and a broken/wrong link on a client's site is
  worse than not linking at all): Batseta → batseta.org.za (the
  council's own stable domain, not a year-specific registration
  microsite that'll go stale after 2026); Mining Indaba →
  miningindaba.com; Aesthetic Medicine Congress SA → aesthmed.co.za (the
  current 2026 official site); Commonwealth Law Congress →
  commonwealthlawyers.com/events (the organizing CLA's events page, not
  a single-year conference microsite). The 62nd IAC is a one-off 2011
  Cape Town event with no surviving dedicated domain, so linked to the
  organizing federation's own live IAC event page
  (iafastro.org/events/iac) instead of a dead or archive-only URL.
  Verified with Playwright: all 6 hrefs/target/rel attributes correct,
  hover state renders with no layout shift, clicking "Your event next"
  actually navigates to contact.html, full 5-page sweep with zero
  console/network errors.

- Fixed the "Coming Soon" link-preview bug 2026-09-20 — user shared
  keithandco.co.za and WhatsApp showed the old placeholder text. Root
  cause: `index.html`'s `<title>` and `<meta name="description">` had
  never been updated from the pre-launch placeholder ("Keith & Co.
  Consulting — Coming Soon" / "Our new site is on its way") even though
  the real homepage had long since been built below it — confirmed by
  checking all 5 pages, only index.html still had the placeholder text,
  the other 4 already had real titles. Not a caching issue at all; the
  live HTML genuinely said that. Fixed the title/description to match
  the real homepage content, and while in there discovered about.html/
  services.html/gallery.html/contact.html already carry full Open Graph
  and Twitter Card tags (`og:title`, `og:image`, `twitter:card
  content="summary_large_image"`, etc.) that index.html never had —
  brought index.html in line with the same pattern (also added the
  favicon-32/16 and apple-touch-icon links every other page has but
  index.html was missing). Mistake made and caught in the same turn:
  first pass added og:/twitter: tags to all 5 pages without checking
  whether they already existed further down `<head>` on the other 4 —
  produced duplicate `og:title` etc. Caught by grepping tag counts,
  removed the duplicates, verified exactly one `og:title` per page
  afterward.
  **Follow-up, now also done**: the pre-existing `og:image`/
  `twitter:image` on all 5 pages pointed to `assets/images/og-cover.jpg`,
  which didn't exist — so link previews on every page had been missing
  their image, silently, this whole time (separate from the "Coming
  Soon" text bug above). Designed 3 real directions as an Artifact
  preview first (per the user's "let me see it before committing" ask)
  — split layout reusing the dark-footer's logo treatment (navy panel
  with the Allura-script "Keith & Co." wordmark + Archivo "Consulting")
  against a full-bleed real stand photo, three photo options (BMK
  Orthopaedics tower / Sentech double-storey / Sanlam), plus a mockup
  of the actual WhatsApp share card so the comparison was apples-to-
  apples with the user's original screenshot. Caught two real bugs in
  the preview before showing it: no `<meta charset="UTF-8">` was
  corrupting em dashes and checkmarks into mojibake, and a CSS
  multi-background trick meant to fake the split panel in the WhatsApp
  mock silently didn't render at all (the opaque photo just covered the
  gradient under it) — rebuilt that mock to reuse the same panel/photo
  markup as the real design instead of trying to fake it. User picked
  variant A (BMK tower). Exported it to a real 1200×630 JPEG via
  Playwright (screenshot the chosen `#frame-a` element at
  deviceScaleFactor 1 so captured pixels match CSS pixels 1:1, then
  resized the 1×1px rounding-error result to an exact 1200×630 and
  saved at quality=78/subsampling=2 — the project's standard
  compression settings), saved to `assets/images/og-cover.jpg` (112KB).
  Verified with Playwright: the file 200s directly, all 5 pages'
  `og:image`/`twitter:image` tags resolve to it, full 5-page sweep with
  zero console/network errors.

- Compression pass on this session's 3 newly-added photos 2026-09-20
  (Visio, Sanlam, IBI), applying the exact policy documented in the
  2026-09-18 compression entry rather than assuming it still holds —
  tested first: re-encoding Visio (960×1280) and Sanlam (1280×960) at
  the project's standard quality=78/subsampling=2 made them *bigger*
  (+6.7% and +3.4%), confirming the documented rule still applies —
  both are ≤1400px long edge and already efficiently encoded by the
  phone camera, so left untouched. IBI, however, had been resized+saved
  in the previous turn at quality=82 with no subsampling (an ad-hoc
  choice, not the project's documented quality=78/subsampling=2
  standard) — re-saved from the backed-up original at the correct
  standard settings, 240KB → 214KB (11% smaller), spot-checked at full
  render size with no visible quality loss. Net: gallery is 11% lighter
  on the one file that actually needed it; the other two were already
  optimal and forcing a "compression" on them would have made the site
  slower, not faster.

- Silenced a harmless view-transition console error 2026-09-20 — user
  saw `Uncaught (in promise) InvalidStateError: Transition was aborted
  because of invalid state. Viewport size changed` in Chrome DevTools
  while testing gallery.html in mobile device-emulation mode and asked
  if it was a real issue. It isn't a bug in the site: the browser's own
  message names the cause — DevTools' device toolbar resized the
  viewport while the CSS `@view-transition{navigation:auto}` cross-fade
  (added earlier this session) was mid-flight, so Chrome aborted its own
  automatically-started transition and threw. Confirmed via Playwright
  it doesn't reproduce on a normal navigation, even with aggressive
  programmatic resizing during the transition window — this needs the
  literal DevTools device-toolbar resize interaction specifically, which
  a real visitor's device never does mid-navigation (their viewport
  doesn't change size while a page is loading). Navigation itself always
  completed fine either way; only the fade got skipped. Since it's
  otherwise harmless but would keep showing up during DevTools testing,
  added a narrowly-scoped `window.addEventListener('unhandledrejection',
  ...)` in main.js that calls `preventDefault()` only when
  `reason.name === 'InvalidStateError'` and the message mentions
  "Transition" — verified with Playwright that an unrelated rejection
  still surfaces normally (proving the handler isn't swallowing real
  errors), and re-ran the full 5-page sweep with zero regressions.

- Slowed the homepage stats count-up 2026-09-20: user felt the numbers
  ("10+", "7", "5+", "100%") finished ticking up too fast to actually
  watch. `duration` in the count-up IntersectionObserver callback
  (main.js) went from 1200ms to 2200ms — no other logic changed (same
  cubic ease-out curve, same reduced-motion guard). Verified by sampling
  the rendered number every 200ms over the animation: it now visibly
  climbs through the intermediate values before settling, versus
  finishing almost immediately before.

- Added a 7th Shell Scheme photo, IBI, 2026-09-20. Confirmed the client
  off the stand's own signage before adding (same policy as every prior
  round): "IBI" wordmark plus "International Business Intelligence" and
  "Leading provider of comprehensive risk solutions" on the back wall,
  word-cloud side panels (Criminal Checks, LVA, Training, Workshops,
  Audits, Investigations, Safety and Security Seta) — a risk/background-
  screening and training services company. Source file
  (`shell-scheme-ibi.jpg`) was 1800×1350, above this project's ~1400px-
  long-edge no-compression threshold, so backed up the original to
  `assets/images/_originals/gallery/` and resized to 1400×1050 (matching
  Maksure's exact dimensions for consistency) — dropped from 342KB to
  240KB. Shell Scheme is now 7 photos, 32 across the gallery. Verified
  with Playwright: loads with no console/network errors, correct name
  and count in the Shell Scheme tab, opens in the lightbox with the
  right image and "IBI · Shell Scheme" caption.

- Brought Shell Scheme into the All Work first screen 2026-09-20: swapped
  NTT DATA in for Baillie Gifford (position 4) and Maksure Risk Solutions
  in for Austell — Feature Wall (position 6), so page 1 now reads Liberty,
  Batseta, BMK Orthopaedics, NTT DATA, Sentech, Maksure Risk Solutions,
  Mahlako, Sanlam — mixing categories instead of showing 8 Custom Stands
  in a row. This directly answers a gap flagged earlier in the same
  session's page-1 review: everything on that first screen was Custom
  Stands, so a visitor never saw Shell Scheme existed without clicking a
  tab or Show More. Baillie Gifford and Austell — Feature Wall weren't
  removed, just moved to where NTT DATA/Maksure had been (end of Custom
  Stands, still visible via Show More or the Custom Stands tab).
  Technical note: swapping items across categories means each moved
  block's `data-cat` attribute had to move with it (NTT DATA/Maksure now
  carry `data-cat="shell-scheme"` while sitting physically among the
  Custom Stands markup, and vice versa for Baillie Gifford/Austell) —
  tab filtering is driven by `data-cat`, not DOM position, so this keeps
  the Shell Scheme/Custom Stands tabs accurate regardless of where a
  photo physically sits in the file. Verified with Playwright: page 1
  order is correct, and per-tab counts are unchanged (24 Custom Stands,
  6 Shell Scheme, 1 Furniture) with the right items in each — no
  duplicates, no console/network errors.

- Swapped Sanlam again with "Ashburton Investments — Archway Design"
  2026-09-20, moving it into the bottom-right slot of page 1 (identified
  from the user's own browser screenshot at localhost:8000/gallery.html)
  — Sanlam had only just landed on page 2 from the previous swap, so this
  moves it earlier still. Archway Design (itself a survivor of the very
  first top-row swap earlier this session) moved to where Sanlam had
  been, next to Allan Gray — Reception Wall. Verified: Sanlam is now the
  8th/last item on page 1 before Show More, each name appears exactly
  once across the 24 Custom Stands photos (no accidental duplicates from
  the two-step block-swap edit), no console/network errors.

- Swapped Sanlam with "Ashburton Investments — Live at Show" 2026-09-20:
  two Ashburton photos land on gallery "page 2" (after Show More) —
  Feature Wall and Live at Show — so asked the user which one before
  touching anything rather than guessing; they picked Live at Show.
  Swapped the two button blocks' positions (same technique as the
  earlier Liberty/Vunani top-row swap): Sanlam now sits where Live at
  Show was, and Live at Show moved to where Sanlam was (near the end of
  Custom Stands) — nothing deleted, still 24 Custom Stands photos.
  Verified with Playwright: Sanlam is now the 16th item revealed in All
  Work (right after Show More), Ashburton — Live at Show is now 24th,
  no console/network errors.

- Fixed two gallery grid layout bugs found during a fresh audit of
  `.g-grid` against world-class-gallery/Apple-HIG standards: (1) a
  category with only 1 photo (Furniture) had its single item stretch to
  the full container width, because `grid-template-columns:repeat(
  auto-fit,minmax(260px,1fr))` collapses unused tracks and the `1fr`
  upper bound let the lone item's track absorb all the freed space —
  produced a huge, soft, oddly-cropped image that read as a bug; (2) a
  category whose count isn't a multiple of the column count (Shell
  Scheme's 6 items on a 4-column row) left a dangling last row — 2 items
  packed left, 2 empty cells visibly blank on the right — because CSS
  Grid's column tracks are one shared definition across every row, so
  `justify-content` centers the whole track set, not each row
  independently, and can't rebalance a partial row on its own.
  Root-caused both to the same mechanism (`auto-fit`/`1fr` grid math
  colliding with uneven item counts) and fixed by switching `.g-grid`
  from CSS Grid to Flexbox (`display:flex;flex-wrap:wrap;justify-
  content:center`) with `.g-item{flex:1 1 260px;max-width:400px}`
  replacing the old `minmax(260px,1fr)` column definition — flexbox's
  `justify-content` is applied per wrapped line, not per-container, so
  a partial trailing row centers itself automatically and a lone item is
  capped at 400px instead of stretching unbounded. This needed no JS
  (main.js only queries `.g-grid`/`.g-item` for filtering, nothing reads
  grid-specific geometry) and, critically, works for any future item
  count without per-category tuning — the user explicitly said more
  photos are coming, so a fix that only patched today's counts (e.g. a
  one-off max-width rule scoped to Furniture) wasn't good enough; this
  self-corrects for 1, 2, 3, or any other count in any category from
  here on. Verified with Playwright at 1600px and 390px: full rows
  (All Work, Custom Stands) are pixel-identical to before the change,
  Furniture's single photo is now a normal centered ~400×300 tile, and
  Shell Scheme's trailing 2-item row is centered instead of dangling —
  across all four tabs, both viewports, zero console/network errors.

- Reordered the top row of the gallery 2026-09-20: swapped Vunani (was
  1st) with Liberty, and the Ashburton archway shot (was 3rd) with the
  BMK Orthopaedics entrance-tower shot, by swapping their positions in
  the DOM — no photos removed, Vunani and the Ashburton archway shot just
  moved further down the grid (now 8th and 11th). This changes the order
  everywhere it's driven by DOM order: the "All Work" tab (first 8:
  Liberty, Batseta, BMK Orthopaedics — Entrance Tower, Baillie Gifford,
  Sentech, Austell — Feature Wall, Mahlako, Ashburton Investments —
  Archway Design) and the Custom Stands tab's own top row. Verified with
  Playwright — no console/network errors, confirmed the first 8 `.g-name`
  values render in the new order.

- 2 more Custom Stands photos added 2026-09-20: Visio and Sanlam. Client
  names confirmed off each stand's own signage before adding, same policy
  as every prior gallery round — `custom-stand-Visio.jpeg` shows "VISIO"
  branding on the reception desk and wall panel, an overhead screen
  reading "INN8 Presents — Shaping Change — The Future of Investment", a
  "Trusted for over 20 years — visiofund.co.za" side panel, and
  Vision/Protection/Growth value-prop icons; `custom-stand-sanlam.jpeg`
  shows repeated "Sanlam" signage, "Assupol | Safrican — Proud
  subsidiaries of Sanlam", and "Confidence lives here" messaging. Both
  images were already within the no-compression-needed size threshold
  (960×1280 and 1280×960) so no resizing was needed. Custom Stands is now
  24 photos, 31 across the gallery. Verified with Playwright: both load
  with no console/network errors, appear correctly once pagination is
  expanded (they land as items 23–24, past the initial page size — not a
  bug), and open in the lightbox with the right image and caption.

- Fourth depth/physicality round 2026-09-20 — three more additions, the
  smaller/finishing-touches batch after the three earlier passes below:
  - **Cross-page view transitions**: `@view-transition{navigation:auto}`
    at the top of `styles.css` opts every same-origin navigation between
    the five pages into a native cross-fade instead of the usual
    flash-to-white reload. Pure CSS, no JS — confirmed the browser parses
    it as a real `CSSViewTransitionRule` (not silently dropped as an
    unrecognized at-rule) and that `document.startViewTransition` exists.
    Unsupported browsers just navigate normally; nothing to fall back to.
    `::view-transition-old(root)`/`-new(root)` tuned to .32s, and a
    reduced-motion block disables the transition animations specifically
    (`::view-transition-group/-old/-new{animation:none!important}` — the
    site's existing blanket reduced-motion rule doesn't reach these
    pseudo-elements, same category of gap as the Services-page parallax
    needing its own explicit JS-side check).
  - **Scroll-linked background diamonds**: the decorative diamond shapes
    in `.page-hero`, `.hero`, and `.achieve` previously only drifted on a
    fixed time-based CSS animation, disconnected from scroll. Added
    `--sx`/`--sy` custom properties (set by a scroll listener in
    `main.js`, same rAF-throttled pattern as the existing photo parallax)
    that the `pageHeroDiamond`/`diamondDrift1/2/3` keyframes now fold into
    their own transform via `calc()` — an animation can't have two
    independent transforms layered on it, so the scroll offset had to be
    baked into every keyframe stop rather than applied as a separate rule.
    Small range (~±14px) since it rides on top of motion that's already
    there. Skipped under reduced-motion in the JS, not just relying on
    the CSS blanket rule, for the same reason as the parallax/tilt/magnetic
    features already are.
  - **Consistency pass**: the mobile nav panel, the desktop nav
    underline, and the footer's social icons were the last interactive
    things on the site still using plain `ease` instead of `--ease-spring`
    — moved all three onto it, and gave the social icons an actual
    hover-lift + shadow (composed with their existing 45°-rotated resting
    `transform`, same `rotate(45deg) translateY(-3px)` composition
    pattern used elsewhere this session) since they had a background-only
    hover before.

  **Shipped a real bug fixing this, caught before it reached the user**:
  the diamond-drift JS comment I wrote contained a literal `*/` in its own
  prose ("diamondDrift*/pageHeroDiamond", meant as "diamondDrift[1/2/3] or
  pageHeroDiamond") — JS block comments don't nest, so that `*/`
  prematurely closed the comment and turned the rest of my own
  explanation into invalid JavaScript, throwing `Unexpected identifier
  'keyframes'` and halting every line of `main.js` after it on every
  single page (killing the diamond drift itself, plus everything defined
  later in the file). Caught it in the same verification pass — the
  `--sx`/`--sy` values were staying empty after scroll, which was the
  tell — fixed the stray `*/`, then re-ran the full check and confirmed
  `--sx`/`--sy` actually change with scroll position, `view-transition`
  still parses, the mobile nav still fills the full viewport (the
  containing-block fix from two days ago holding), and zero console
  errors anywhere.

- **Another real bug, user-reported and fixed 2026-09-18**: "Read more" on
  the Batseta testimonial (contact.html) silently did nothing. Root cause:
  the 3 testimonial slides (`.t-slide`) all share the same CSS Grid cell
  (`grid-area:1/1`, a crossfade stack) with no `z-index`, so they only
  differ by `opacity` as `@keyframes testiFade` cycles through them. None
  of that affects paint/hit-test *order* — with no z-index, overlapping
  siblings stack by DOM order regardless of which one is visually
  faded in, so the **last slide in DOM order (Momentum Health) silently
  absorbed every click on the stack**, no matter which testimonial was
  actually showing. Confirmed with `elementFromPoint` at Batseta's own
  "Read more" button coordinates while Batseta was the visibly-faded-in
  slide: it resolved to Momentum's `.t-slide`, not Batseta's — and a
  real click attempt at Batseta's button hung, because Playwright's own
  obstruction check caught exactly this. First Medical (slide 1, no
  overflow so no button) had the same exposure, just no visible symptom
  since it has nothing to click.

  Fix: added `z-index` to the same `testiFade` keyframe stops that
  already drive opacity — `z-index:2` during a slide's visible window,
  `0` outside it — so whichever slide is actually shown is also the one
  on top for clicks. `prefers-reduced-motion`'s fallback (`animation:none`,
  first slide forced to `opacity:1`) needed the same fix separately, since
  disabling the animation also disables the z-index that rides on it —
  added `z-index:1` directly to that rule. Verified two ways: sampled
  hit-testing at Batseta's button position across a full 22s cycle
  (correctly flips to slide 1 only during its 7-12s window, matching the
  opacity), then did a real click during that window and confirmed only
  Batseta's `.expanded` class toggled (not Momentum's or First Medical's),
  the button read "Show less", and `.t-stage` correctly paused so the
  crossfade can't carry the testimonial away mid-read.

- **Real bug, user-reported and fixed 2026-09-18**: the mobile nav menu
  was broken on real devices (iPhone 16 Pro Max in Chrome DevTools,
  user's own screenshot) — opening the hamburger showed only a small
  80px-tall strip with one dimmed nav link ("Services", coincidentally the
  3rd of 5 — see why below) instead of the full-screen menu, and the other
  four links were completely unreachable. Note this was *not* caught by
  this session's own earlier mobile testing (which used Playwright's
  `isMobile: true` emulation) — that emulation mode has its own layout-
  viewport-doubling quirk (documented in the entry below the "Services
  page reverted" one) that made every `position: fixed` element's
  geometry untrustworthy to check there, so this specific bug was
  invisible to those tests and only surfaced from the user's real-browser
  screenshot. Lesson: `position: fixed` geometry needs checking in a
  plain narrow-viewport context (no `isMobile`/`hasTouch`), not
  Playwright's mobile emulation, in this environment.

  Root cause: `header.site` gained `backdrop-filter` in the first
  depth-pass entry below (for the frosted-glass scroll effect).
  `backdrop-filter` on an ancestor — like `transform`, `filter`, or
  `will-change: transform` — creates a new **containing block** for any
  `position: fixed` descendant. `nav.main` (the full-screen mobile menu)
  lives inside `header.site`, so its `inset: 0` started resolving against
  the small header box instead of the viewport, and `overflow: hidden`
  clipped everything but whichever link happened to land in that 80px
  sliver — structurally always the 3rd of 5 links (`justify-content:
  center` on the flex column), regardless of which page you're on, not
  actually tied to the active page.

  Fix: moved `backdrop-filter` (and the background it's paired with) off
  `header.site` itself onto a `header.site::before` pseudo-element instead
  — same visual result, but `header.site` no longer carries the property
  that creates the containing block, so `nav.main`'s `position: fixed`
  correctly resolves against the real viewport again. `.is-scrolled`'s
  stronger blur moved to `header.site.is-scrolled::before` to match.
  Verified both sides after the fix, not just the one that was reported:
  nav.main now reports `{top:0, height:956}` (full iPhone 16 Pro Max
  viewport) with all 5 links visible and correctly positioned, *and* the
  frosted-header effect itself still works exactly as before
  (`backdrop-filter: blur(18px)` on scroll, confirmed, not assumed).

  Separately noticed but out of scope (pre-existing, not from this fix):
  the active page's link in the mobile menu (`nav.main a.active`) is hard
  to read — it inherits the desktop active-link color
  (`var(--navy)`, a medium navy) which has low contrast against the mobile
  menu's `--navy-deep` background. Worth a follow-up if the client wants
  it cleaned up, but unrelated to the geometry bug just fixed.

- Third depth/physicality round 2026-09-18 — five more additions on top
  of the two passes below, all in `js/main.js` + `css/styles.css`. Two
  shared constants now sit at the top of `main.js`: `prefersReducedMotion`
  and `finePointer` (`matchMedia('(hover: hover) and (pointer: fine)')`)
  — every pointer-driven effect below checks `finePointer` before
  attaching so touch devices never get a stuck hover/tilt state, and the
  parallax code from the first pass was refactored to use the same shared
  `prefersReducedMotion` instead of its own inline `matchMedia` call.
  - **Magnetic buttons**: `.btn` gets a small pull toward the cursor
    (`--btn-x`/`--btn-y` custom properties, max ±6px) while hovering.
    Composed via `transform:translate(var(--btn-x,0px),var(--btn-y,0px))`
    as the base, with `:hover`/`:active` layering their existing
    lift/press on top through `calc()` — deliberately *not* overwriting
    `style.transform` directly the way the tilt below does, because `.btn`
    already has CSS `:hover` and `:active` states that need to keep
    working (a blunt JS transform override, like the tilt effect uses,
    would have silently killed the press feedback from the first pass).
    Verified both still
    fire correctly with the magnetic offset active, not just that the
    offset itself updates.
  - **3D pointer-tilt** on `.g-item` (gallery) and `.svc` (homepage
    service grid): rotates up to 6° toward the cursor via
    `perspective(900px) rotateX() rotateY()`, tracking 1:1 with
    `transition:none` while hovering, then restoring the spring
    transition just for the pointerleave reset. This one *does* own
    `style.transform` outright (unlike the buttons) — deliberate, since
    `.g-item`/`.svc` only had a plain CSS `:hover` lift with no
    press/active state to preserve, so there was nothing to compose
    around. The existing CSS `:hover` transform is left in the
    stylesheet untouched as the fallback for touch/keyboard, since
    `finePointer` gates the JS from ever attaching on those.
  - **Staggered reveal**: `.reveal` elements are grouped by
    `parentElement` at load and given an incremental `data-reveal-delay`
    (70ms steps, capped at 350ms) consumed by the existing
    IntersectionObserver via `setTimeout`. No markup changes needed on
    any page — it falls out of how `.reveal` is already grouped in each
    grid. Delay forced to 0 under reduced-motion.
  - **Count-up stats** on the homepage strip ("10+", "7", "5+", "100%"):
    parses the leading digits vs. the suffix, animates 0→target over
    1.2s (ease-out cubic) once 50% visible, then re-appends the suffix.
    Skipped under reduced-motion (shows the static final value, which is
    already correct in the markup — no separate fallback path needed).
  - **Form focus states** on `contact.html`'s enquiry form: inputs now
    lift 2px with a soft shadow on focus (matching `--shadow-lift`'s
    style, not the token itself) on top of the existing `outline`, which
    was left untouched for accessibility.

  All five verified together in one pass, not just individually — in
  particular confirmed the magnetic offset and the hover/active states
  compose correctly at the same time (not just each working alone), and
  that `finePointer` genuinely reads `false` under Playwright's touch
  emulation before trusting that gate on production.

- Services page reverted back to the alternating left/right layout
  2026-09-18 — user tried the always-stacked version (see "Services page
  layout simplified to always-stacked" below) alongside the new depth/
  motion pass above and preferred the original zig-zag after all. Restored
  `.svc-detail-grid{grid-template-columns:1fr 1.25fr}` with
  `.svc-detail:nth-child(even) .svc-detail-grid{grid-template-columns:
  1.25fr 1fr}` + `.sd-media{order:-1}`, matching what the always-stacked
  entry below describes removing. The depth/motion work (shadows, spring
  easing, the `.sd-gallery` parallax) all stayed — this only touched
  layout, not the new physicality pass.

  Hit a real bug restoring it: the mobile breakpoint (`max-width:960px`)
  still had `.svc-detail-grid{grid-template-columns:1fr}` from the
  stacked-only era, but that's a single-class selector (specificity 0,1,0)
  — weaker than `.svc-detail:nth-child(even) .svc-detail-grid` (0,3,0),
  which is unconditional (no media query) and so applies at every width.
  Higher specificity wins regardless of the media query or source order,
  so the four `:nth-child(even)` sections (real services 01/03/05/07,
  shifted by the `.svc-list-diamonds` sibling — see the note on that
  selector further down) kept their desktop 2-column ratio even on phone
  widths, rendering as a tiny thumbnail beside the text instead of
  stacking. Caught it from an actual mobile screenshot, not by reasoning
  about the CSS — it looked fine in the numbers until seen. Fixed by
  adding the matching override inside the media query too:
  `.svc-detail:nth-child(even) .svc-detail-grid{grid-template-columns:1fr}`
  sits right next to the existing `.sd-media{order:0}` reset there now —
  if this layout ever changes again, that pair needs to move together.
  Verified after the fix: all 7 sections report a single computed column
  width on a 390px viewport, not just 4 of them.

  Also double-checked the two gallery-2 services (Electrics, Marquees)
  after seeing blank photo boxes in a fullPage mobile screenshot — same
  category of artifact as before (`loading="lazy"` images and crossfade
  opacity never actually trigger for content a fullPage capture didn't
  really scroll to), not a regression. Confirmed by scrolling to Electrics
  for real and opacity-sampling its crossfade for ~10s: 0/34 samples were
  blank, so the earlier `galleryFade2` fix (see the crossfade-gap entry
  further down) is still intact.

- Second depth/physicality round 2026-09-18, same session as the pass
  below, four more additions:
  - **Button press feedback**: `.btn:active{transform:scale(.96)
    translateY(-1px)}` on a fast .1s transition (deliberately quicker than
    the .45s spring hover, so a click reads as instant, not springy).
  - **Lightbox entrance**: `.lightbox figure` now scales from .96→1 on
    open on `--ease-spring` (was an instant-size opacity-only fade), and
    its image shadow bumped to `--shadow-lift` to match the rest of the
    elevation system.
  - **Cursor-following glow** on `.page-hero` and `.cta-band` (the dark
    navy bands): a `radial-gradient` positioned at `--mx`/`--my` custom
    properties, updated by a `pointermove` listener in `main.js`, visible
    only on `:hover` (so it costs nothing on touch). Needed explicit
    z-index handling — `.page-hero .wrap` / `.cta-band>*` at `z-index:1`,
    the glow `::after` at `z-index:0` — because a bare `::after` paints
    after normal children by default and would otherwise sit on top of
    the text. Verified nav links and the CTA button are still clickable
    with the glow active, not just that it looks right.
  - **Parallax on the Services page photo breaks** (`.sd-gallery`): each
    photo now drifts at 6% of scroll speed relative to its container,
    computed in `main.js` from the container's distance to viewport
    center (not raw `scrollY`, which would break for anything not near
    the top of a long page). The layer is oversized (`top:-8%;
    height:116%`) so the drift never exposes an edge — confirmed no gap
    artifact in a real scrolled screenshot, not just by checking the
    numbers. Scoped to Services only for now, not About's photo (same
    technique would apply directly if wanted later). This one needed a
    reduced-motion guard *in the JS*, not just relying on the site's
    blanket CSS rule — that rule only collapses `transition-duration`,
    and this sets `transform` directly on scroll with no transition to
    collapse, so `main.js` checks
    `matchMedia('(prefers-reduced-motion: reduce)')` itself before ever
    attaching the scroll listener. Verified: scrolling 1200px under
    reduced-motion leaves the transform completely unset.

- Site-wide depth/physicality pass 2026-09-18, applied directly (not a
  concept page this time — the user asked to see it in place). New tokens
  in `:root`: `--shadow-lift` (a taller, softer shadow than `--shadow`, for
  hover/elevated states) and `--ease-spring`
  (`cubic-bezier(.34,1.56,.64,1)`, a slight-overshoot curve so hover
  transforms feel weighted rather than linear). Applied to `.btn:hover`,
  `.svc:hover` (homepage service grid), and `.g-item:hover` (gallery cards)
  — each now lifts (`translateY`) into `--shadow-lift` on a spring curve
  instead of the flat linear transition they had before.

  Also gave `header.site` a frosted-glass scroll state: it already had a
  translucent white background (94% opacity) but no blur, so content
  passing underneath just looked faintly murky rather than like glass.
  Added `backdrop-filter:blur(10px)` at rest and a `.is-scrolled` class
  (added by a small scroll listener in `main.js`, `window.scrollY > 40`)
  that deepens it to `blur(18px)` / 72% opacity / a soft drop shadow once
  real content is visible underneath — confirmed this actually looks like
  glass, not just hazy, by screenshotting it over a busy photo on
  services.html rather than only checking computed styles.

  Reduced-motion needed no extra handling — the existing blanket rule
  (`*,*::before,*::after{transition-duration:.01ms!important}` under
  `prefers-reduced-motion:reduce`) already catches every new transition
  automatically; verified the button's transition-duration collapses to
  ~0 under that preference rather than assuming.

- Gallery photos compressed 2026-09-18. First attempt (blind re-encode at
  quality 80, no resize) actually made several files *bigger* — the phone
  cameras that shot these already apply efficient in-camera JPEG encoding,
  so Pillow's default encoder settings couldn't beat it without also
  resizing. Tested that on one file before doing all 32: quality 80 alone
  made it 9% bigger; only quality 65 with `subsampling=2` (4:2:0, Pillow's
  default subsampling is 4:4:4/`0`, much less efficient) finally beat the
  original, and even then only by 12%, at a real quality cost. Resizing
  instead is what actually works, because the gallery lightbox never
  displays an image wider than `min(88vw, 1100px)` (`.lightbox figure` in
  `styles.css`) — so anything shot at 1600-1800px is carrying resolution
  the page can never show. Settled on: resize only if long edge > 1400px
  (1400 keeps ~1.27x headroom over that 1100px box for retina screens),
  down to 1400px, quality 78, `subsampling=2`; files already ≤1400px
  (mostly the newer phone photos, native 960-1280px) are left completely
  untouched rather than "recompressed" into being bigger. Originals backed
  up to `assets/images/_originals/gallery/` first (new subfolder — the
  existing `_originals/` was flat, but 32 files earned their own folder).
  Result: gallery folder 5.93MB → 4.82MB (18.7% smaller); more to the
  point, the 8 photos an actual visitor loads on the paginated "All Work"
  view went from ~2.27MB to ~1.47MB, about 35% lighter, verified by
  listing real network requests in Playwright, not estimating. Spot-checked
  the most-resized file (BMK.jpeg, 490KB→222KB) at full render size —
  no visible quality loss. To redo with different settings, the untouched
  originals are all still in `_originals/gallery/`.

- Two UX fixes 2026-09-18, prompted by a hands-on review once the gallery
  hit 29 photos (up from the original 10):

  **Repeat-client sub-labels.** Ashburton/Austell/BMK Orthopaedics (3
  cards each) and Allan Gray/First Medical Company (2 each) all used the
  exact same caption text per card with no way to tell "3 deliberate
  angles" from "duplicated by mistake" — visible in a real screenshot,
  where the two First Medical cards land back-to-back and look identical.
  Fixed by appending a short angle label straight into `g-name`, e.g. "BMK
  Orthopaedics — Entrance Tower" / "— Product Display" / "— Instrument
  Counter" (same pattern for the other four clients — see `gallery.html`
  for the exact labels). No CSS or markup change needed, `.g-name` already
  wraps at the card width. The two First Medical shots are near-identical
  framing (not byte-duplicates, just very similar) — labelled "First
  Medical Company" / "— Alternate Angle" rather than inventing a
  distinction that isn't really there.

  **Pagination.** All Work was 29 stacked cards = 12.2 phone-screens of
  scrolling to reach the footer (measured, not estimated), and Custom
  Stands alone was 22. Added `PAGE_SIZE = 8` in `js/main.js`: each
  category's `applyFilter` now shows only the first 8 matches, tags the
  rest `.more-hidden` (`display:none`, new CSS in `styles.css`), and shows
  a "Show N more" button (`.g-more`, reusing the existing `.btn.btn-navy`
  style — no new button CSS) when a category has more than 8. Clicking it
  reveals the rest for that category; switching tabs resets back to the
  first 8 (`applyFilter` is called on every tab click and once on load for
  the default "All Work" view). The lightbox's `visibleItems()` now also
  excludes `.more-hidden`, so prev/next never steps into photos the user
  hasn't chosen to reveal yet — verified this by walking the lightbox with
  arrow keys until it looped, which happened after exactly 8 steps, not
  22. Categories under 8 (Shell Scheme, Furniture) never show the button —
  `extra > 0` check handles that automatically. Result: All Work's mobile
  height dropped from 10330px (12.2 screens) to 4391px (5.2 screens), a
  57% cut, measured before/after with the same Playwright script.

- 8 more Custom Stands photos added 2026-09-18: a 2nd Allan Gray angle,
  a 3rd Ashburton Investments angle (live, with visitors), a 2nd and 3rd
  Austell angle (product counter + coffee service — different from both
  existing Austell entries), 4 new clients — First Medical Company (x2
  angles), Medika SA, and Momentum Health. Custom Stands is now 22 photos,
  29 across the gallery. One file was skipped as a true duplicate:
  `custom-stand-ashburton3.jpeg` is byte-identical (same md5) to the
  already-added `custom-stand-ashburton.jpeg` — checked with a checksum
  before assuming, not just by filename. The two First Medical Company
  photos (`custom-stand-first-medical.jpeg`/`-2.jpeg`) are near-identical
  framing of the same angle, not byte-duplicates though — included both
  anyway per the standing policy in this project (don't unilaterally drop
  a photo the client added unless there's a real content problem, like the
  earlier Palo Alto wide-shot exclusion where a different brand's logo was
  more prominent — mere similarity isn't that bar) — worth a quick client
  check on whether they actually want both live.

- 4 more Custom Stands photos added to the gallery 2026-09-17, same
  session as the batch below: a 3rd BMK Orthopaedics angle
  (`custom-stand-BMK3.jpeg`, the instrument display counter), a genuinely
  new Allan Gray photo (`custom-stand-allan-gray.jpeg` — the `custom-stand-
  allan-gray.jpg` mislabel from earlier this same day turned out to be
  Vunani; this is an unrelated, real Allan Gray stand, confirmed off its
  own signage), a second Ashburton Investments stand
  (`custom-stand-ashburton.jpeg`, `.jpeg` vs. the existing entry's `.jpg` —
  a different build entirely, not a duplicate: bold red "A" backdrop
  instead of the original's archway/coffee-bar design), and a new client,
  Truffle. Custom Stands is now 14 photos, 21 across the gallery. Note for
  next time a same-named client file shows up: check the extension and
  actually look at the photo before assuming it's a duplicate or a
  replacement — twice now (Ashburton here, BMK previously) a same-client
  file turned out to be an additional distinct stand, not one to swap in
  for the existing entry.

- 3 more Custom Stands photos added to the gallery 2026-09-17: BMK
  Orthopaedics (two angles — `custom-stand-BMK.jpeg` is the full stand with
  its cylindrical entrance tower, still mid-install with boxes/tools/crew
  visible in shot; `custom-stand-BMK-2.jpeg` is a clean live-show shot of
  the shelved product-display side) and Liberty (Standard Bank Group).
  Custom Stands is now 10 photos. Client names again read off each stand's
  own signage. Left the BMK install-in-progress shot in as directed rather
  than swapping for a cleaner one — worth a client check if a fully
  "show-ready" shot of that angle becomes available later.

- Marquees paused on the gallery 2026-09-17 — client doesn't have enough
  marquee photos yet (was down to a single item, `marquee-garden-event.jpg`,
  after the Shell Scheme re-sort above emptied a different category the same
  day). Removed the "Marquees" tab and that one `.g-item` from
  `gallery.html` entirely, rather than leaving an empty tab like Shell
  Scheme currently has — the client asked to pause the whole category, not
  just clear its photos, so an empty-but-visible tab would misrepresent
  that. The source file stays on disk, unreferenced, same treatment as the
  removed Fillmed photo. Also swapped "marquees" out of copy that would
  otherwise promise a category that isn't browsable right now: the page's
  `<meta name="description">`, `og:description`, `twitter:description`
  (now "...custom exhibition stands, shell scheme and furniture
  styling...") and the hero `.script-line` (now "custom stands, shell
  scheme, furniture & more"). To bring Marquees back once there are real
  photos: re-add the tab button in `.g-tabs`, add `.g-item`s with
  `data-cat="marquees"`, and put "marquees" back in that same copy.

- 6 Shell Scheme photos added to the gallery 2026-09-17, filling the empty
  category from the re-sort below: Maksure Risk Solutions, Nissan,
  CallCabinet, NTT DATA, Palo Alto Networks, Mining & Process Equipment
  Manufacturers of SA (client names read off each stand's own signage, not
  guessed from filenames — e.g. the file was `...Mining-&-Process-
  Equipment-Manufacturers.jpeg` but the fascia signage says "...of SA" too,
  so the caption includes it). A 7th new photo, `shell-scheme-paloalto.jpeg`
  (no `-2`), was deliberately left unused — it's a wide shot where the
  neighboring AWS stand's branding is more prominent than Palo Alto
  Networks', so captioning it "Palo Alto Networks" would be misleading;
  `shell-scheme-paloalto-2.jpeg`, a clean dedicated shot of just that stand,
  is used instead. Three of the six source photos are portrait-orientation
  (CallCabinet, NTT DATA, Palo Alto Networks — phone photos) against the
  gallery's landscape `aspect-ratio:4/3` cards; checked the default
  center-crop via a real render rather than assuming, and each one's key
  branding/messaging stays in frame, so no per-image `object-position`
  override was needed.

- Gallery photos re-sorted 2026-09-17 after the client renamed the files in
  `assets/images/gallery/` (user's call on both points below — asked rather
  than inferred, since either one silently changes visible content):
  `custom-stand-allan-gray.jpg` → `custom-stand-Vunani.jpg` (the stand's
  branding — "VUNANI Fund Managers" signage, lighthouse feature wall — was
  always Vunani, not Allan Gray; caption/alt text corrected to match, this
  was a mislabel fix, not a re-shoot). `shell-scheme-{sentech,austell,
  mahlako}.jpg` → `custom-stand-{sentech,austell,mahlako}.jpg` — moved from
  the Shell Scheme category to Custom Stands (`data-cat`, the "Shell
  Scheme"/"Custom Stand" caption label, and alt text all updated on all
  three). Net effect: Shell Scheme now has 0 photos — the filter tab is
  left in place (not removed) and correctly shows the existing "No photos
  in this category yet — check back soon" empty state; swap in real Shell
  Scheme photos when the client has them, same as Marquees/Furniture's
  original 1-photo state. `custom-stand-fillmed.jpg` → `custom-stand-
  fillmed-hide.jpg` — the `-hide` meant "drop this from the gallery," so
  its `.g-item` (the "Display Build" card) was deleted from `gallery.html`
  entirely, dropping Custom Stands from 5 photos to 7 (gained three, lost
  one). The file itself was left on disk, not deleted, in case it's needed
  again. Note for next rename: `custom-stand-Vunani.jpg` keeps its
  capital V to match the actual filename — Windows' filesystem is
  case-insensitive so a mismatch wouldn't show up testing locally, but
  Netlify's Linux filesystem is case-sensitive and would 404 on any casing
  drift, so keep the `src` and the on-disk filename byte-for-byte identical
  if this file gets renamed again.

- Gallery rebuilt as a wrapping "Editorial Grid" 2026-09-17, replacing the
  horizontal-scroll filmstrip (superseding the two "Gallery UX fixes" /
  "peek" entries directly below this one — kept for history, but the
  `.g-grid-wrap`/`.g-scroll`/`justify-content:safe center`/`66vw` peek-width
  mechanics they describe no longer exist). Built as three real, working
  concept pages first (`gallery-concept-a/b/c.html`, since deleted once a
  choice was made — Editorial Grid / Bold Filmstrip / Case Studies), tested
  with Playwright, compared in an Artifact the user picked from. Chose
  Editorial Grid: `.g-tabs`/`.g-tab` (thin underline tabs, replacing the
  pill-button `.g-filters`/`.g-filter`) sit above a `.g-grid` that's now
  `display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr))` —
  every photo visible at once, no horizontal scroll, so `.g-grid-wrap` and
  the `.g-scroll` prev/next buttons are gone entirely (removed from
  `gallery.html`, `css/styles.css` and the filter script in `js/main.js`).
  `auto-fit` is what makes sparse categories (Marquees, Furniture — 1 photo
  each) work without a special case: with only one item the unused grid
  tracks collapse to 0 instead of sitting empty, so that single photo
  renders as one large feature image rather than a small card in dead
  space — a cleaner fix than the old `justify-content:safe center`
  approach, which centered the card but still left it small.
  `.g-cap` (the category/name overlay) is now hover/focus-revealed
  (`opacity:0` → `1` on `:hover`/`:focus-visible`) rather than
  always-visible, forced back to always-visible under `max-width:680px`
  since there's no hover on touch. Lightbox is untouched (same
  `#lightbox`/`.lb-*` markup and JS, still walks only the current filter's
  visible items). Verified with Playwright: all 5 filters, lightbox open/
  keyboard nav (arrows + Escape), desktop 1440px and mobile 390px — 0
  console errors.

- Services page layout simplified to always-stacked 2026-09-17 (user's call,
  after a mobile screenshot of the Shell Scheme block looked broken — see
  the crossfade-gap fix below for the actual cause): `.svc-detail-grid` was
  a 2-column grid on desktop (`1fr 1.25fr`, alternating to `1.25fr 1fr` with
  `.sd-media{order:-1}` for every *other* service, via
  `.svc-detail:nth-child(even)` — which, because `.svc-list-diamonds` is a
  non-`.svc-detail` sibling shifting the count by one, actually matched
  services 01/03/05/07, not 02/04/06 as the selector name suggests),
  collapsing to a single column only under 960px. Now it's `grid-template-
  columns:1fr` unconditionally — text block on top, full-width photo below,
  same pattern at every breakpoint, no alternating sides. Removed the
  `nth-child(even)` column/order overrides entirely (both the base rule and
  its 960px reset) since there's nothing left to reset. `.sd-media` keeps
  its `aspect-ratio:3/2`, now rendering large (~755px tall at the 1132px
  content width) as a full-bleed break between sections rather than a
  half-width side panel.

  While in there, fixed a real bug the layout change made more visible: the
  per-service photo crossfades (`.sd-gallery .g-slide`, pure CSS
  `animation:galleryFade`) share one keyframe shape (visible from 4%-27%
  of the loop) across gallery sizes, with `animation-delay` staggered by a
  flat 5s regardless of slide count. That shape only has zero gap when
  0.27 ≥ 1/slideCount, i.e. 4+ slides — the 2-slide services (Project
  Management, Electrics, Marquees; `gallery-2`) were blank ~46% of the
  time, and 3-slide ones (Shell Scheme, Audio Visual, `gallery-3`, plus
  `.about-visual` on about.html) ~19-25% of the time. That's what the user's
  screenshot actually caught — not a missing image. Added `galleryFade2`/
  `galleryFade3`/`galleryFade5` keyframes sized to each slide's own 1/N
  share of the loop (kept the original `galleryFade` for the 4-slide
  default) and wired `.sd-gallery.gallery-N` and `.about-visual .g-slide`
  to the matching one. Verified with Playwright: sampled `#electrics`
  (gallery-2, the worst case) opacity every 300ms across a full 10s loop —
  0 blank samples post-fix (was ~46% blank before). Any *new* `gallery-N`
  variant needs a matching `galleryFadeN` keyframe or the gap reopens for
  that slide count — see the comment left in `css/styles.css` above the
  keyframes.

- Gallery UX fixes 2026-09-17: sparse categories (Marquees, Furniture — 1
  photo each) used to leave the single card pinned to the left of the
  ~1136px-wide `.g-grid` track, looking broken rather than "a smaller
  selection." Fixed with `justify-content:safe center` on `.g-grid` — rows
  that fit the track now center (1–3 item categories); rows that overflow
  (All Work, Custom Stands) still start-align and scroll, since `safe`
  falls back to `start` rather than clipping content. Also dropped the
  `.reveal` scroll-fade-in class from `.g-item` (was `opacity:0` until an
  IntersectionObserver saw 12%+ of the item in the real viewport) — inside
  a horizontally-scrolling row this was quietly killing the "peek" of the
  next card that signals there's more to swipe to, especially on mobile.
  Items now render at full opacity immediately; gap/scroll-snap layout is
  unchanged. Paired with that, the `<680px` `.g-item` width dropped from
  `78vw` to `66vw` so the next card's edge visibly peeks in (~24% of the
  card width) rather than being nearly flush with the viewport edge.
  Verified with Playwright screenshots at 1440px and 390px (all 5 filters,
  lightbox, mobile menu) — no console errors, no regressions to the
  overflow/scroll case. Considered and declined for now (user's call,
  2026-09-17): per-filter photo-count badges ("Marquees (1)") and
  switching the filmstrip to a wrapping grid — revisit the wrapping-grid
  question once a category's photo count makes one endless row unwieldy
  (rough gut-check: 15–20+ photos in a single filter).

- Gallery page shipped 2026-09-16: `gallery.html`, filterable by Custom
  Stands / Shell Scheme / Marquees / Furniture, plus an "All Work" view and
  a click-to-enlarge lightbox (prev/next respects the active filter) — both
  vanilla JS in `js/main.js`, no library, matching the site's existing
  constraint. Nav link and footer link added to all five pages;
  `sitemap.xml` updated. 10 real photos moved from the staging folder
  (`assets/images/gallary_tab/`, populated by the client) into
  `assets/images/gallery/` with descriptive filenames: 5 Custom Stands
  (Allan Gray, Batseta, Ashburton, Baillie Gifford, and an unbranded
  display build), 3 Shell Scheme (Sentech, Austell, Mahlako), 1 Marquee,
  1 Furniture (the former "orphaned" `catering.jpg`, now
  `furniture-styled-dining.jpg`). 4 files were deliberately left out of
  the gallery and remain staged, unused, in `gallary_tab/`:
  `audio-remove.jpg`, `audio-remove1.jpg`, `electrics-remove.jpg`,
  `electrics-remove1.jpg` — these are generic stock/rendered product shots
  (a 3D acoustic-room render, a vendor cabling diagram, a plain product
  photo of a mobile TV cart), not real Keith & Co installation photography,
  so publishing them as portfolio work would misrepresent it. Swap in real
  Electrics/AV photos when available (services.html already has real ones
  at `electrics-1.jpeg`/`electrics-2.jpeg` and `audio-1/2/3.jpg` — the
  gallery just doesn't have its own yet). Also worth noting: three of the
  gallery's stands (Sentech, Baillie Gifford, the unbranded FILLMED-branded
  display build) and the Mousson-branded furniture photo aren't in
  about.html's client-logo carousel — Ashburton, Austell, Mahlako and
  Allan Gray already are, so this is only those four; confirm with the
  client that it's fine to show that branding publicly before this goes
  live, same as any other client work.

- Added consistent-height testimonial previews with a "Read more"/"Show
  less" toggle (`.t-text`/`.t-more` in styles.css, wired up in main.js)
  2026-08-17. Once the Batseta letter's full 7 paragraphs were shown in
  full, its slide towered over the short First Medical one (same grid-cell
  sizing that fixed the cut-off bug above now stretched the short slide to
  match). Each `.t-text` clamps to 100px with a fade + "Read more" — but
  ONLY on slides where content actually overflows (measured via
  `scrollHeight` after `document.fonts.ready`, tagged with a `.has-more`
  class); a slide that fits at the current viewport width gets no fade and
  no button, so it never falsely implies hidden content. Clicking "Read
  more" also force-pauses the crossfade so it can't fade away mid-read.
- Fixed the Batseta testimonial rendering cut off on contact.html: `.t-stage`
  had a fixed `min-height:320px` with absolutely-positioned `.t-slide`
  children, so the box never actually grew for longer text — it only
  looked fine before because both testimonials happened to be short.
  Rebuilt as a CSS grid stack (`grid-area:1/1` on every slide) so the box
  auto-sizes to whichever slide is tallest.
- Furniture gallery (services.html) got a 4th photo (`furniture-4.jpg`)
  2026-08-17 — class dropped from `gallery-3` to no modifier, since 4
  slides is the system's default timing.
- Compressed 7 uncompressed camera-original photos added over the course
  of this session (`about-stand-2.jpg`, `audio-2.jpg`, `custom-stand-1.jpg`,
  `furniture-1.jpg`, `furniture-4.jpg`, `shell-build-2.jpg`,
  `who-we-are-3.jpg`) — same treatment as the earlier cleanup: 1800px long
  edge, JPEG quality 80, full-res masters saved/overwritten in
  `assets/images/_originals/`. ~20MB combined down to ~2.4MB.
- Shell Scheme gallery (services.html) rebuilt 2026-08-17: old
  `shell-build-1..5` refs had gone stale (files 2/4/5 deleted, 2's
  extension changed) leaving most of the gallery broken. Replaced with the
  client's 3 new photos (`shell-build-1.jpg`, `-2.jpg`, `-3.jpg`), class
  dropped from `gallery-5` to `gallery-3` to match. `-3.jpg` is a wide
  (1.76 AR) render on a white background — letterboxed via
  `background-size:contain;background-color:var(--white)` rather than
  cropped, and white (not the usual `--navy-deep`) so the letterbox bars
  are invisible against the render's own white background.
- Sitemap.xml + robots.txt added (site root).
- The 6 oversized photos actually in use (services.html, about.html) were
  6000px+ camera/phone originals at 3.3–5.7MB each — resized to 1800px
  long edge / JPEG quality 80, now ~240–330KB each (~94% smaller total).
  Full-res originals preserved in `assets/images/_originals/`.
- `client-batseta.png` (898KB, oversized for a thumbnail logo) replaced
  with `client-batseta.jpg` (flattened onto white, 45KB). Original kept
  in `assets/logos/_originals/`.
- Fixed two WCAG AA contrast failures: header ".sub" text and
  `.form-note`/`.logo-slot` text were `#8a919c`/`#7c8494` (~3.2:1 on
  their backgrounds, below the 4.5:1 minimum) — both now use the existing
  `--text-muted` token (~4.7–6:1).

Favicon is done: `favicon.ico` (site root) + `assets/logos/favicon-16.png`,
`favicon-32.png`, `apple-touch-icon.png`, generated from the diamond mark in
`assets/logos/keithco-logo.png`. Linked in the `<head>` of all four pages.

Open Graph / Twitter Card tags are done in the `<head>` of all four pages
(`og:title`, `og:description`, `og:image`, `og:url`, `twitter:*`). Cover image
is `assets/images/og-cover.jpg` (1200x630, cropped from the Batseta stand
photo `custom-stand.jpg`) — swap the `og:image`/`twitter:image` src or
regenerate this crop whenever better photography is available. Titles/
descriptions are plain text in each page's `<head>` — edit directly.

## Conventions

- Mobile-first responsiveness is handled with two breakpoints: 960px and 680px.
- Respect `prefers-reduced-motion` (already implemented) — keep it working.
- Keep accessibility: focus-visible outlines, aria labels on icon-only
  controls, alt text on all real images you add.
- No external JS libraries. Vanilla only.
- Test by opening index.html directly or with any static server
  (e.g. `npx serve .`).
