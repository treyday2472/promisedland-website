# Programmatic SEO Plan — Property-Level Pages

## Status: Planned (not yet built)
## Last updated: 2026-04-16

## Goal
Generate individual pages for each foreclosure property to capture
long-tail searches like "123 Main St Dallas TX foreclosure".

## Data Source
- Backend: dealbot2_0 Flask app
- Model: DistressRecord (or CourtCase + Property)
- Fields to use:
  - address (street address)
  - city
  - state
  - zip_code
  - sale_date
  - owner_name (if publicly available — verify legal/privacy)
  - case_number
  - estimated_equity (if available)

## Proposed URL Pattern
/foreclosure/[city]-[street-slug]
Example: /foreclosure/dallas-123-main-st

## Page Template Requirements
- Static or SSG-generated HTML (NOT JS-rendered)
- Unique title: "[Address] Foreclosure Notice | Dallas County | Promised Land"
- Unique meta description mentioning address + sale date
- Canonical: self-referencing
- Internal links: /dallas-foreclosures, /stop-foreclosure-dallas
- Lead capture form
- Schema: RealEstateListing or FAQPage

## Implementation Notes
- Requires Flask route or static site generator export
- Pages must be generated before sitemap submission
- Volume: potentially hundreds of pages — consider noindex on low-equity properties
- Legal: confirm public records use is compliant (Texas open records law covers court filings)

## DO NOT BUILD until:
- Foreclosure data pipeline is stable and regularly updated
- URL slug generation is standardized
- Duplicate content strategy is defined
