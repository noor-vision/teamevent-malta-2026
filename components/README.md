# Components

This folder is reserved for reusable HTML components that can be shared across event pages.

## Current Approach

The current site uses a **data-driven component model** in `script.js`. Each section is rendered by a dedicated function that reads from `data/event-data.json`:

- `renderNavigation()` — site navigation
- `renderHero()` — hero banner
- `renderOverview()` — stat cards
- `renderLogistics()` — info grid
- `renderItinerary()` — timeline cards
- `renderDining()` — dietary note + restaurant cards
- `renderPacking()` — packing checklist
- `renderFooter()` — footer message

This makes the site scalable: updating the JSON updates every section consistently.

## Future Components

If the site grows to multiple pages, add HTML partials here, for example:

- `event-header.html` — reusable page header
- `event-footer.html` — reusable page footer
- `timeline-card.html` — single itinerary day template
- `stat-card.html` — overview stat template

These can be loaded by JavaScript or a static site generator and combined with the JSON configuration.
