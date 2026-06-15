# Noor Vision GmbH - Malta Onsite 2026 Team Event Website

A scalable, responsive, and visually polished event website for the Noor Vision GmbH Malta Onsite 2026 team offsite. Built with HTML5, SCSS/CSS3, GSAP, and a tiny bit of vanilla JavaScript.

## Features

- **Static HTML structure** - all content lives directly in `index.html`
- **SCSS architecture** - modular partials for tokens, mixins, layout, components, responsive, and print styles
- **GSAP animations** - scroll-triggered reveals, hero entrance, hover micro-interactions on clickable elements, mobile menu
- **Tabler Icons** - lightweight, consistent SVG icons inlined via an SVG sprite
- **Brand-compliant styling** using colors from the Noor Vision Branding Guide
- **Responsive design** for mobile, tablet, and desktop
- **Smooth scroll navigation** with active-section highlighting
- **Print-friendly stylesheet** for easy PDF generation
- **Accessible** - semantic HTML, skip links, focus states, keyboard navigation, `prefers-reduced-motion` support

## Brand Colors

Extracted from the Noor Vision Branding Guide:

| Color | Hex | Usage |
|-------|-----|-------|
| Navy Dark | `#121D4B` | Primary text, header, footer |
| Navy Mid | `#1E317D` | Secondary accents |
| Navy Light | `#263E9F` | Gradients, highlights |
| Off-White | `#F2F2F2` | Text on dark backgrounds |
| Light Gray | `#F4F4F4` | Page background |
| Accent Teal | `#2EF2E0` | Buttons, badges, links |

Typography: **Syne** (headers), **Montserrat** (body).

## Project Structure

```
.
├── index.html              # Main page with all content and SVG icon sprite
├── script.js               # GSAP animations + minimal interactivity
├── styles/
│   ├── styles.scss         # SCSS entry point
│   ├── _tokens.scss        # Design tokens
│   ├── _mixins.scss        # Sass mixins
│   ├── _animations.scss    # Reserved for CSS animations (currently empty - GSAP handles motion)
│   ├── _base.scss          # Reset & typography
│   ├── _layout.scss        # Header, hero, footer
│   ├── _components.scss    # Buttons, cards, sections
│   ├── _responsive.scss    # Media queries
│   ├── _print.scss         # Print styles
│   └── styles.css          # Compiled CSS (generated)
├── components/             # Reserved for future reusable HTML components
├── assets/
│   ├── logo.svg            # Noor Vision logo (from details folder)
│   ├── logo.png            # Noor Vision logo as PNG
│   └── images/             # Event images
├── details/                # Original branding materials (not part of site)
│   ├── Noor Vision Branding Guidepdf.pdf
│   └── noor-vision-logo.svg
├── package.json            # npm scripts + Sass dev dependency
└── README.md               # This file
```

## How to View

### Quick preview (after building)

Once `styles/styles.css` has been compiled, you can open `index.html` directly in a modern browser. GSAP is loaded from a CDN, so an internet connection is needed for animations on first load.

### Local development

```bash
# Install Sass
npm install

# Build the CSS
npm run build

# Or build and watch for SCSS changes
npm run watch

# Serve locally
npm run serve
```

Then visit `http://localhost:8000`.

## How to Reuse for a Future Team Event

Follow these steps to adapt the site for the next Noor Vision team event:

### 1. Update the content

Open `index.html` and edit the static markup directly:

- Hero text, tagline, description, and CTA buttons
- Navigation links
- Overview stat cards
- Logistics info items
- Itinerary days, activities, dress code, and images
- Dining note and restaurant cards
- Packing checklist
- Footer message and copyright

### 2. Update the icon sprite (if needed)

All icons live in the hidden SVG sprite near the top of `index.html`. The sprite currently uses Tabler Icons. Add or replace symbols as needed, then reference them with `<use href="#icon-name">`.

### 3. Replace images (optional)

Drop new images into `assets/images/` and update the `src` attributes in `index.html`.

### 4. Adjust styling (optional)

Open the SCSS partials in `styles/`:

- `_tokens.scss` - brand colors, Mediterranean accents, fonts, spacing, border radius
- `_components.scss` - cards, buttons, sections
- `_layout.scss` - header, hero, footer

After editing, run `npm run build` to regenerate `styles/styles.css`.

### 5. Update the logo (if needed)

If the company logo changes, replace:

- `assets/logo.svg`
- `assets/logo.png`

## Browser Support

- Chrome / Edge (latest)
- Firefox (latest)
- Safari (latest)

## Accessibility Notes

- Use the "Skip to main content" link at the top of the page.
- All interactive elements are keyboard reachable.
- Images and icons have descriptive `alt` text.
- Print styles remove decorative backgrounds and optimize contrast.

## Credits

- Design & development: Noor Vision GmbH
- Brand guideline: Noor Vision Branding Guide 2025
- Fonts: [Syne](https://fonts.google.com/specimen/Syne) & [Montserrat](https://fonts.google.com/specimen/Montserrat) via Google Fonts
