# SEO_CHANGELOG.md — Promised Land Property Solutions
> Comprehensive SEO work log for promisedland-website.
> Maintained by Claude Code. Last updated: 2026-04-16.
> Purpose: Hand off to ChatGPT for ongoing SEO strategy development.

---

### Session 172 (2026-04-16) — City Page Expansion + Dallas Hub Upgrade

**New pages created:**
- `/irving-foreclosures` — Tier 2 standalone page, own canonical, FAQ schema, JS data loader filtering `irving` from Dallas County JSON
- `/grand-prairie-foreclosures` — Tier 2 standalone page, own canonical, FAQ schema, JS data loader filtering `grandprairie` from Dallas County JSON. Includes note about Dallas/Tarrant County split.

**dallas-foreclosures.html upgraded:**
- Added above-the-fold CTA block (urgency banner with red border + "Get a Free Cash Offer" button linking to `#seoLeadForm`)
- Added educational section: "What Happens After a Foreclosure Notice in Texas?" — 3-card grid (Notice Filed, Sale Date Set, Your Window to Act)
- Added trust section: "How We Help Homeowners Facing Foreclosure" — 4-card grid (Sell Fast, No Repairs, Cash Offer, Flexible Closing)
- Added `<span id="seoLeadForm"></span>` anchor before the CTA form div
- Lead form conversion improvements: urgency badge above h3, new `situation` textarea field, red urgency text above submit button
- Static city nav updated to include Irving and Grand Prairie pill links
- JS CITY_SLUGS and CITY_LABELS updated to include `irving` and `grandprairie`

**Internal linking strengthened:**
- `stop-foreclosure-dallas.html` — Added "Related Pages" pill nav: /dallas-foreclosures, /sell-my-house-fast-dallas, /sell-inherited-house-dallas, /irving-foreclosures, /grand-prairie-foreclosures
- `sell-my-house-fast-dallas.html` — Added "Related Pages" pill nav: same 5 pages
- `sell-inherited-house-dallas.html` — Added "Related Pages" pill nav: /dallas-foreclosures, /stop-foreclosure-dallas, /sell-my-house-fast-dallas
- `index.html` — Added Irving + Grand Prairie pill links under "Dallas Foreclosure Listings" section. DeSoto and Lancaster already linked.

**sitemap.xml updated:**
- Added `/irving-foreclosures` (priority 0.8, weekly)
- Added `/grand-prairie-foreclosures` (priority 0.8, weekly)
- Upgraded `/desoto-foreclosures` from 0.7 → 0.8
- Upgraded `/lancaster-foreclosures` from 0.7 → 0.8
- `/dallas-foreclosures` remains at 0.9
- `/dallas-county-foreclosures-by-city` remains at 0.7

**New coordination file:**
- `ai_coordination/PROGRAMMATIC_SEO_PLAN.md` — Documents property-level page strategy (planned, not yet built)

---

## Site Overview

**Domain:** https://www.promisedlandpropertysolutions.com
**Business:** Cash home buyer in Dallas / DFW area
**Primary market:** Distressed homeowners — foreclosure, inherited property, divorce, repairs, landlords
**Site type:** Static HTML/CSS/JS — no CMS, no backend routing. Deployed on Vercel.
**Companion app:** dealbot2_0 (Flask app at app.promisedlandpropertysolutions.com) — NOT part of this SEO work.

---

## Full Page Inventory (as of 2026-04-16)

### Core Money Pages (indexed, high priority)
| URL | Title | Purpose |
|-----|-------|---------|
| / | Home | Main landing page |
| /sell-my-house-fast-dallas | Sell My House Fast Dallas | Primary sell-fast page |
| /stop-foreclosure-dallas | Stop Foreclosure Dallas | Foreclosure seller page |
| /sell-inherited-house-dallas | Sell Inherited House Dallas | Probate/inheritance seller page |
| /dallas-foreclosures | Dallas County Foreclosure Notices | Public data hub — trustee sale notices |

### City Foreclosure Pages — Tier 2 (indexed independently)
| URL | Status |
|-----|--------|
| /desoto-foreclosures | Active, own canonical |
| /lancaster-foreclosures | Active, own canonical |

### City Foreclosure Pages — Tier 3 (canonicalized to grouped page)
| URL | Canonical Points To |
|-----|---------------------|
| /garland-foreclosures | /dallas-county-foreclosures-by-city |
| /duncanville-foreclosures | /dallas-county-foreclosures-by-city |
| /mesquite-foreclosures | /dallas-county-foreclosures-by-city |
| /glenn-heights-foreclosures | /dallas-county-foreclosures-by-city |
| /cedar-hill-foreclosures | /dallas-county-foreclosures-by-city |
| /balch-springs-foreclosures | /dallas-county-foreclosures-by-city |

### Grouped City Page (new)
| URL | Status |
|-----|--------|
| /dallas-county-foreclosures-by-city | Active, own canonical, static HTML only |

### Situation Pages (indexed, lower priority)
| URL | Purpose |
|-----|---------|
| /behind-on-mortgage-dallas | Behind on payments |
| /probate-estate-sale-dallas | Probate/estate |
| /relocating-sell-house-dallas | Relocation |
| /sell-house-divorce-dallas | Divorce |
| /sell-house-needs-repairs-dallas | Needs repairs |
| /sell-vacant-property-dallas | Vacant property |
| /tax-liens-dallas | Tax liens |
| /tired-landlord-dallas | Landlord burnout |

### Utility / Legal Pages (not SEO targets)
| URL |
|-----|
| /about |
| /contact |
| /privacy |
| /terms |

### Pages That Do NOT Exist Yet (opportunities)
- /irving-foreclosures — Irving is a large DFW city, strong Tier 2 candidate
- /grand-prairie-foreclosures — Large DFW city, strong Tier 2 candidate

---

## SEO Work Completed — Session Log

---

### Session 168–169 (2026-04-15) — Crawl Path Strengthening

**Problem:** Several SEO pages existed but Google couldn't reliably discover them. Key gaps:
- /dallas-foreclosures not in homepage nav
- City pages had no in-body links back to hub
- Core money pages had zero cross-links to each other
- sitemap.xml was missing 9 pages

**Fixes applied:**

**index.html (homepage):**
- Added "Foreclosure List" to main nav → /dallas-foreclosures
- Added "Dallas Foreclosure Listings" body section linking all 4 core pages
- Footer already had core links

**dallas-foreclosures.html:**
- Added contextual paragraph with inline links to /stop-foreclosure-dallas, /sell-my-house-fast-dallas, /sell-inherited-house-dallas
- City nav `<a href>` links confirmed crawlable (not JS-only)

**Core page cross-linking:**
- /stop-foreclosure-dallas → added link to /sell-inherited-house-dallas
- /sell-my-house-fast-dallas → added links to all 3 sibling core pages (had zero before)
- /sell-inherited-house-dallas → added links to all 3 sibling core pages (had zero before)

**All 8 city pages (at the time):**
- Added "Related Resources" paragraph with link back to /dallas-foreclosures, /stop-foreclosure-dallas, /sell-my-house-fast-dallas

**sitemap.xml:**
- Added /dallas-foreclosures (priority 0.9)
- Added all 8 city pages (priority 0.7, changefreq weekly)

---

### Session 170 (2026-04-15) — City Pages Fixed for Distinct Indexing

**Problem:** All city foreclosure pages were likely being treated by Google as duplicates or ignored because:
- Generic/weak title tags
- No FAQ schema
- No static HTML content before JS — the records table is JS-rendered, so Google saw near-blank pages

**Fixes applied to all 8 city pages:**

1. **Title tag** — updated to city-specific format:
   `[City] TX Foreclosure Notices 2026 | Public Record List | Promised Land Property Solutions`

2. **Meta description** — city-specific ~150 chars mentioning city, Dallas County, cash offer, sell fast

3. **FAQ schema** — added 3-question `FAQPage` JSON-LD in `<head>` per page. City-specific questions. Glenn Heights and Cedar Hill note their dual-county context.

4. **Static crawlable HTML content** added ABOVE the JS data table:
   - City-specific intro paragraph
   - `<h2>If Your [City] Home Is on This List</h2>`
   - Action paragraph with inline links to /stop-foreclosure-dallas and /sell-my-house-fast-dallas
   - `<h3>Browse [City] Foreclosure Notices</h3>` above the table

**Already correct (no change needed):** Canonical tags (all self-referencing), H1 tags, internal links.

---

### Session 171 (2026-04-15) — City Tier Strategy + Grouped Page

**Problem:** 8 city pages all competing independently, most with very low listing volume. Thin pages can hurt overall domain authority. Small cities don't justify standalone indexed pages.

**Strategy:**

```
Tier 1 — Hub:        /dallas-foreclosures
Tier 2 — Standalone: /desoto-foreclosures, /lancaster-foreclosures
Tier 3 — Grouped:    garland, glenn-heights, duncanville, mesquite, cedar-hill, balch-springs
```

**New page created:** `/dallas-county-foreclosures-by-city`
- Groups all 6 Tier 3 cities on one static, crawlable page
- Own canonical, FAQ schema, city sections, lead form
- No JS data loader — pure static HTML
- Internal links to hub + core pages

**Tier 3 pages canonicalized:**
- All 6 pages: canonical → `/dallas-county-foreclosures-by-city`
- Alert notice banner added to each page pointing to grouped page
- Pages remain live and browseable

**dallas-foreclosures.html hub updated:**
- Static "Browse by City" block added above JS city nav
- DeSoto + Lancaster gold pills + "More Cities →" link to grouped page
- All static `<a href>` tags — crawlable without JS

**sitemap.xml updated:**
- /dallas-county-foreclosures-by-city added (priority 0.7, monthly)
- Tier 3 pages downgraded to priority 0.5
- Tier 1 and Tier 2 unchanged

---

## Current Internal Linking Structure

```
Homepage (/)
├── Nav: /dallas-foreclosures, /sell-my-house-fast-dallas, /stop-foreclosure-dallas
├── Body: all 4 core pages linked
└── Footer: all core pages

/dallas-foreclosures (hub)
├── Static nav: /desoto-foreclosures, /lancaster-foreclosures, /dallas-county-foreclosures-by-city
├── JS nav: all city pages (dynamic)
├── Body: /stop-foreclosure-dallas, /sell-my-house-fast-dallas, /sell-inherited-house-dallas

/desoto-foreclosures, /lancaster-foreclosures (Tier 2)
├── Body: /dallas-foreclosures, /stop-foreclosure-dallas, /sell-my-house-fast-dallas
└── Footer: full nav

/dallas-county-foreclosures-by-city (grouped)
├── Body: /dallas-foreclosures, /stop-foreclosure-dallas, /sell-my-house-fast-dallas
└── City sections: Garland, Glenn Heights, Duncanville, Mesquite, Cedar Hill, Balch Springs

/stop-foreclosure-dallas ↔ /sell-my-house-fast-dallas ↔ /sell-inherited-house-dallas
└── All three cross-link to each other + to /dallas-foreclosures
```

---

## What Google Should See Now (vs Before)

| Signal | Before | After |
|--------|--------|-------|
| /dallas-foreclosures in homepage nav | No | Yes |
| Core pages cross-linking | None | Full mesh |
| City pages have static HTML content | No (JS only) | Yes |
| City pages have FAQ schema | No | Yes |
| Thin city pages competing with each other | Yes (8 pages) | No (2 standalone + 1 grouped) |
| sitemap includes foreclosure pages | No | Yes (all) |
| Hub page has crawlable city links | JS only | Static HTML + JS |

---

## Known Gaps / Next Opportunities

### High priority
- **/irving-foreclosures** — Irving is a major DFW city (~240k population). Would be a strong Tier 2 page. Needs: foreclosure data feed + page creation.
- **/grand-prairie-foreclosures** — Another large DFW city (~200k population). Same opportunity.

### Medium priority
- **Tarrant County expansion** — Tarrant County (Fort Worth, Arlington) has the same Tyler Odyssey portal. Documents cost $1/page minimum but foreclosure data may be available. Would open a new geographic market.
- **Google Search Console** — Submit sitemap, request indexing for new/updated pages, monitor coverage errors.
- **Backlinks** — No external backlink strategy has been executed. The foreclosure data pages are natural link targets for local news, real estate blogs, community boards.

### Low priority / future
- Blog/resource content targeting long-tail queries ("how long does foreclosure take in Texas", "what happens after trustee sale")
- Schema for LocalBusiness on homepage
- /about page optimization

---

## Technical Notes for ChatGPT

- Site is **static HTML** on Vercel. No server-side rendering. No CMS. All changes are direct file edits.
- The foreclosure data table on each page is **JavaScript-rendered** from a JSON file (`/data/dallas_foreclosures.json`). Google can execute JS but may not on first crawl — this is why static HTML content above the table matters.
- The backend app (dealbot2_0 on Render) exports the JSON. The website just reads it. They are separate deployments.
- All city pages are separate .html files — no dynamic routing.
- Canonical tags are set manually in each file.
- sitemap.xml is a static file, manually maintained.
