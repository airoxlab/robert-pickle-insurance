# RKC Financials and Insurance Services — website

Static, dependency-free website for an insurance agency in **Claremore, Oklahoma (Rogers County)**.
Plain HTML, one CSS file, one JS file. No build step, no framework, no npm install.

**Business details used throughout the site**

| Field | Value |
|---|---|
| Name | RKC Financials and Insurance Services |
| Category | Insurance agency (mobile — no storefront) |
| Phone | (580) 471-5506 |
| Location | Claremore, OK 74017 — serving all of Rogers County |

## Pages

| File | Purpose | Primary keyword target |
|---|---|---|
| `index.html` | Home | insurance agency Claremore OK |
| `about.html` | About the agency, mobile model, standards | local insurance agent Claremore |
| `services.html` | All lines of coverage, hub page | insurance services Rogers County |
| `auto-insurance.html` | Long-form auto guide + FAQ | auto insurance Claremore OK |
| `home-insurance.html` | Home / renters / mobile home guide + FAQ | homeowners insurance Claremore |
| `life-financial-services.html` | Term, permanent, final expense, annuities, business planning | life insurance & annuities Claremore |
| `faq.html` | 20+ questions, includes FAQ schema | insurance questions Oklahoma |
| `contact.html` | Contact, service-area map, quote form | contact insurance agent Claremore |

Supporting files: `robots.txt`, `sitemap.xml`, `assets/css/style.css`, `assets/js/main.js`.

## Before this goes live — please confirm or replace

1. **Domain.** Every canonical URL, the sitemap and `robots.txt` use `https://www.rkcfinancials.com/`.
   Find and replace that string with the real domain.
2. **Email address.** `data-agency-email="info@rkcfinancials.com"` on the `<body>` of every page drives
   the contact forms. Replace with the real inbox.
3. **Availability hours** in `contact.html` are placeholders (marked with an HTML comment).
4. **License number, year established, carrier appointments, staff bios** — deliberately left blank
   in `about.html` (marked with an HTML comment) rather than invented. Add the real details.
5. **Photos.** The design uses SVG icons and gradients only, so it looks finished with zero images.
   Real photos of the agent will improve trust; drop them into `assets/img/` and add `<img>` tags.

## Contact forms

There is no server, so both forms build a pre-filled email via `mailto:` (see the clearly marked block
in `assets/js/main.js`). To connect a real backend — Formspree, Netlify Forms, Basin, or your own
script — add `action` and `method` to the `<form>` elements and delete that block.

## SEO notes

- `InsuranceAgency` structured data on the home page (name, phone, locality, `areaServed`).
- `FAQPage` structured data on `faq.html`.
- Unique title + meta description + canonical on every page.
- Local keywords worked into headings and body copy: Claremore, Rogers County, Verdigris, Catoosa,
  Inola, Oologah, Chelsea, Foyil, Owasso, Collinsville, Pryor.
- Once live, claim the Google Business Profile and make sure the name, phone and service area match
  this site exactly.

## Hosting

Any static host works: Netlify, Cloudflare Pages, GitHub Pages, Vercel, or plain shared hosting via
FTP. Upload the folder contents as-is.
