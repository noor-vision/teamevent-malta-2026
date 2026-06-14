<!-- From: d:\Marketpost\Noor Vision\Team Events\Websites\teamevent-malta-2026\AGENTS.md -->
# AGENTS.md — Noor Vision Malta Onsite 2026 Team Event Website

> This file is written for AI coding agents who need to understand and work on the project. The project documentation is in English, so this file is also written in English.

> **Important note about prior documentation:** Earlier versions of this file (and `components/README.md`) described a data-driven architecture that loaded event content from `data/event-data.json`. That architecture is **not present** in the current codebase. The site is now static HTML with content written directly in `index.html`. Do not rely on the JSON-driven description.

## Project Overview

This is a single-page, static event website for the **Noor Vision GmbH Malta Onsite 2026** team offsite. The page content is static markup in `index.html`, styled with SCSS, and enhanced with GSAP animations.

- **Single-page static HTML** — all content lives in `index.html`.
- **SCSS build step** — modular SCSS partials are compiled to `styles/styles.css` with Sass.
- **GSAP animations** — scroll-triggered reveals, hero entrance, and hover micro-interactions.
- **Inline SVG icon sprite** — icons are defined once in `index.html` and reused via `<use href="#icon-name">`.
- **Brand-compliant styling** using colors from the Noor Vision Branding Guide.

## Technology Stack

- **HTML5** (`index.html`) — semantic page skeleton, accessibility landmarks, and inline SVG icon sprite.
- **SCSS/CSS3** (`styles/styles.scss` + partials) — design tokens, responsive layout, print stylesheet, and reduced-motion support. Compiled to `styles/styles.css`.
- **Vanilla JavaScript ES6+** (`script.js`) — mobile menu, smooth scroll, active-section nav highlighting, print button, and GSAP-driven animations.
- **GSAP 3 + ScrollTrigger** — loaded from `cdnjs.cloudflare.com`.
- **Google Fonts** — Syne (headers) and Montserrat (body), loaded from `fonts.googleapis.com`.
- **Assets** — custom SVG icons in an inline sprite, raster images in `assets/images/`, and the Noor Vision logo in `assets/`.

## Project Structure

```
.
├── index.html              # English main page with static content and SVG icon sprite
├── index-de.html           # German translation of the main page
├── script.js               # GSAP animations + interactivity
├── styles/
│   ├── styles.scss         # SCSS entry point
│   ├── _tokens.scss        # Design tokens (colors, fonts, spacing)
│   ├── _mixins.scss        # Sass mixins and breakpoint helpers
│   ├── _animations.scss    # Reserved for CSS animations (currently empty — GSAP handles motion)
│   ├── _base.scss          # Reset & typography
│   ├── _layout.scss        # Header, hero, footer
│   ├── _components.scss    # Buttons, cards, sections
│   ├── _responsive.scss    # Media queries
│   ├── _print.scss         # Print styles
│   ├── styles.css          # Compiled CSS (generated)
│   └── styles.css.map      # Source map (generated)
├── components/
│   └── README.md           # Reserved for future reusable components (currently outdated)
├── assets/
│   ├── logo.svg            # Noor Vision logo (SVG)
│   ├── logo.png            # Noor Vision logo (PNG)
│   └── images/             # Event images (JPG)
├── details/                # Original branding materials (not served on the site)
│   ├── Noor Vision Branding Guidepdf.pdf
│   └── noor-vision-logo.svg
├── package.json            # npm scripts + Sass dev dependency
├── package-lock.json       # npm lockfile
├── node_modules/           # Installed npm dependencies
├── .gitignore
├── README.md               # Human-facing project documentation
└── AGENTS.md               # This file
```

## Runtime Architecture

1. The browser loads `index.html`, which links to the compiled `styles/styles.css`, loads GSAP from a CDN, and includes the inline SVG icon sprite.
2. `script.js` runs after `DOMContentLoaded`:
   - `initMobileMenu()` toggles the responsive navigation with GSAP.
   - `initSmoothScroll()` adds smooth scrolling for anchor links.
   - `initActiveNav()` highlights the current section in the nav using ScrollTrigger.
   - `initPrintButton()` wires the floating **Print / Save PDF** button.
   - `initAnimations()` runs GSAP entrance animations and hover micro-interactions; it bails out when `prefers-reduced-motion: reduce` is set.

There is no JSON data loading or runtime DOM rendering from configuration. All content is static.

## Build and Run Commands

This project uses npm and Sass.

```bash
# Install dependencies (Sass)
npm install

# Compile SCSS once
npm run build

# Compile SCSS and watch for changes
npm run watch

# Serve locally on http://localhost:8000
npm run serve
```

You can also open `index.html` directly in a browser after `styles/styles.css` has been compiled. GSAP is loaded from a CDN, so an internet connection is needed for animations on first load.

## Development Conventions

### SCSS is the Source of Truth for Styles

- Always edit files in `styles/*.scss`, never `styles/styles.css` directly.
- `styles/styles.css` and `styles/styles.css.map` are generated artifacts. Re-run `npm run build` after SCSS changes.
- Design tokens live in `styles/_tokens.scss`. Use the variables (`$nv-navy-dark`, `$color-accent`, `$space-md`, etc.) instead of hard-coded values.

### Content Updates

- All page content is static HTML in `index.html` (English) and `index-de.html` (German). Update the markup directly for text, dates, locations, images, etc.
- Keep both language versions in sync when event details change (e.g., dates, transport, restaurants).
- Event images belong in `assets/images/` and are referenced by `src` attributes in `index.html` and `index-de.html`.
- The Noor Vision logo is used from `assets/logo.png` (header/footer) and `assets/logo.svg` (favicon).

### Icons

- Icons are defined in a hidden inline SVG sprite near the top of `index.html`.
- Reference icons with `<svg aria-hidden="true"><use href="#icon-name"></use></svg>`.
- Add new `<symbol>` definitions to the sprite when needed.

### Accessibility

- Keep semantic HTML, proper heading order, `aria-labelledby`, and landmarks.
- Maintain focus-visible styles and skip links.
- Respect `prefers-reduced-motion` in both CSS and JS.

## Testing Instructions

There are **no automated tests**. Manual testing checklist:

1. Run `npm run build` and confirm `styles/styles.css` is regenerated without errors.
2. Open `index.html` directly (or via `npm run serve`) in Chrome, Edge, Firefox, and Safari.
3. Verify all sections render: Hero, Overview, Logistics, Itinerary, Dining, Packing, Footer.
3a. Open `index-de.html` and verify all sections render in German.
4. Test the mobile menu at narrow viewports.
5. Click each nav link and confirm smooth scrolling and active-state highlighting.
6. Click external map links and confirm they open in a new tab with `rel="noopener noreferrer"`.
7. Click the floating **Print / Save PDF** button and verify the print stylesheet produces a clean output.
8. Test reduced-motion preference if possible (`prefers-reduced-motion: reduce`) — animations should be disabled.
9. Optional: run HTML/CSS/JS validators.

## Security Considerations

- **Static hosting:** There is no server-side code, so server-side injection risks are minimal.
- **External resources:** GSAP and Google Fonts are loaded from CDNs. External map links use `target="_blank"` with `rel="noopener noreferrer"`.
- **No secrets:** Do not store API keys, credentials, or personal data in these files.
- Since content is static HTML, be mindful of what you insert if adding untrusted content.

## Deployment

Deploy the site as static files to any static host (GitHub Pages, Netlify, Vercel, S3, Azure Blob, Nginx, Apache, etc.).

**Files that should be deployed:**

- `index.html`
- `index-de.html`
- `script.js`
- `styles/styles.css`
- `assets/` (icons, images, logos)

**Files that should NOT be deployed** (internal/reference only):

- `details/`
- `styles/*.scss` and `styles/styles.css.map` (source files/maps are not needed at runtime, although source maps are harmless)
- `README.md`
- `AGENTS.md`
- `.claude/settings.local.json`
- `package.json`
- `package-lock.json`
- `node_modules/`
- `server.log`

## Browser Support

Target browsers are the latest versions of Chrome, Edge, Firefox, and Safari. The site uses modern CSS features such as `clamp()`, CSS Grid, Flexbox, and Sass-generated styles.

## Future Enhancements

- The `components/` folder is reserved for reusable HTML partials if the site grows beyond a single page. The current `components/README.md` references a data-driven JSON model that does not exist and should be rewritten if that folder is used.
- If the project grows, consider adding a small static-site generator or a build tool (e.g., Vite) and moving the icon sprite into individual SVG files.
