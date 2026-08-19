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
- `css/styles.css` — the entire design system (single stylesheet)
- `js/main.js` — slider, mobile menu, scroll reveal, active-nav, form handler
  (enquiry form on `contact.html` posts to Formspree via fetch, with an inline
  success/error message; endpoint is `https://formspree.io/f/xzepgqwg`, set
  to deliver to Keith & Co's info@keithandco.co.za inbox)
- `assets/images/` — photography (hero slides, service images) — mostly TODO
- `assets/logos/` — company + client logos — mostly TODO

The top bar, header, and footer are duplicated across pages. When editing them,
apply the same change to ALL four HTML files.

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

1. Replace hero slide gradients with real photography (`.slide-N .ph` in
   styles.css). Currently CSS-only navy gradients each layered with a
   distinct geometric texture (truss lines / blueprint grid / diamond
   lattice) as an interim improvement — still not real photos.
2. Swap in a real Janus Henderson logo (PNG/JPG/SVG) once available —
   `.eps` can't be used on the web.
3. First testimonial (First Medical) is real; second (Batseta, from their
   signed recommendation letter) added 2026-08-14. Both slots on
   contact.html now filled — no more testimonial TODO unless a third is
   ever wanted (the `.t-stage` crossfade is tuned for exactly 2 slides,
   7s/14s timing — adding a 3rd needs a CSS delay/animation tweak).
4. Real photography exists for services/about (assets/images/) but is
   applied via CSS `background-image` on `<div>`s, not `<img>` tags — so
   none of it has an accessible text alternative for screen readers. Same
   will apply to the hero slides once real photos land there.
5. Deploy bloat: `assets/logos/company_logos/` (~3MB of duplicate staging
   logos + the unusable Janus Henderson `.eps`) and two orphaned unused
   images (`team-on-site1.jpg`, `catering.jpg`) aren't referenced by any
   page — worth excluding from deploy or deleting.
6. Make the commercial-use donation for Halo Handletter to the author
   (dafont.com/halohandletter.font lists a PayPal address) — the font file
   itself is already live and wired up, only the donation is outstanding.
7. (Deferred, not blocking) Myriad Pro Semibold for `.brand .name .sub`
   needs a Creative Cloud subscription — client's free Adobe Fonts plan
   only includes Bold/Bold Condensed. Shipped on Bold instead (see brand
   rules above). Revisit only if Creative Cloud gets picked up anyway.

### Done (audited 2026-07-22)

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
