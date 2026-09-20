# Keith & Co Consulting — Website

Static website for Keith & Co Consulting (Pty) Ltd — keithandco.co.za

## Run it locally

No build step needed. Either:

- Open `index.html` directly in a browser, or
- Serve it properly (recommended, so paths behave like production):

```bash
npx serve .
# or
python3 -m http.server 8000
```

## Full technical documentation

Open `developer-guide.html` in a browser (or serve it like any other page)
for a walkthrough of the design system, page structure, JS behavior, the
image gallery aspect-ratio gotcha, testimonials, and the contact form
integration. It's excluded from the sitemap and `robots.txt` since it's for
developers, not visitors.

## Edit it with Claude Code

This project includes a `CLAUDE.md` file that Claude Code reads automatically —
it contains the brand rules (colours, fonts, the diamond motif), content rules,
and the outstanding TODO list. Just open the folder in VS Code, start Claude
Code, and ask for what you need, e.g.:

- "Work through the TODO list in CLAUDE.md — start with adding Open Graph tags
  and a favicon to all pages."
- "Add a Gallery page matching the existing design, with a filterable image
  grid (Custom Stands / Shell Scheme / Signage / Flooring categories)."
- "Wire the contact form up to Netlify Forms."
- "I've added photos to assets/images — replace the hero slide gradients and
  the [ Image ] placeholders with them."

## Deploy

The site is plain static files, so any static host works:

- **Netlify**: drag the folder into app.netlify.com, or connect a Git repo.
  Bonus: the contact form can use Netlify Forms with one attribute.
- **Vercel**: `npx vercel` in this folder, or connect a Git repo.
- **Cloudflare Pages**: connect a Git repo, no build command, output dir `/`.

Then point the `keithandco.co.za` DNS at the host (each host's dashboard walks
you through adding a custom domain), and HTTPS is issued automatically.

## Structure

```
index.html        Home
about.html        About Us
services.html     Services (9 service lines)
gallery.html      Filterable photo gallery + lightbox
contact.html      Contact + enquiry form + testimonials
css/styles.css    Full design system (one file)
js/main.js        Slider, menu, reveal animations, form handler
assets/images/    Photography (add real photos here)
assets/logos/     Company + client logos (add real files here)
CLAUDE.md         Project context for Claude Code
```
