# Content Refresh Plan — BGS Technologies

Generated 2026-10-29 · 32 posts · newest post **212 days** old

## The systemic problem

Two posts carried a dead year (2025) in the title. The real finding is that this
isn't a one-off:

| Bucket | Count | When it bites |
|---|---:|---|
| Dead year in title (2025) | 2 | **now** |
| Title carrying 2026 | 5 | **1 January 2027** |
| Not updated in 365+ days | 9 | now |

On 1 January 2027, **7 of 32 posts (22%)** will advertise a stale year in the SERP.
Bumping years once a year is a treadmill. Two structural fixes are now in place:

1. **`npm run check:freshness`** — fails the build when any title carries a past
   year, and warns about titles that go stale at the next new year.
2. **`dateModified`** — posts can now record a real update date. It feeds the
   `BlogPosting` schema and renders as a visible "Updated …" on the post.

## Done

| Post | Action | Why |
|---|---|---|
| `video-marketing-strategy-uae-2025` | Title de-yeared to *Video Marketing Strategy for UAE Brands*; `dateModified` set | Content is evergreen. Dropping the year beats bumping it — it leaves the treadmill entirely. Slug kept, so no redirect needed and no link equity lost. |

## Your call — retire or rewrite

| Post | Options |
|---|---|
| `digital-marketing-trends-2025-year-in-review` | **(a)** Rewrite as the 2026 review in December 2026, keeping the slug and 301-ing nothing. **(b)** Retire with a 301 to `/blog`. A year-in-review has a ~12-month life by design; this one is 10 months past its window. I did not act — deleting or redirecting published content is a decision for you. |

## Refresh queue

### High — update before 1 January 2027

The five 2026-titled posts. Each needs a content pass plus either a year bump or
de-yearing, and a `dateModified`:

- `complete-meta-ads-strategy-uae-brands-2026`
- `tiktok-advertising-uae-complete-2026-guide`
- `digital-marketing-dubai-what-actually-works-2026`
- `2026-social-media-playbook-uae-businesses`
- `google-ads-vs-meta-ads-uae-business-2026`

Recommendation: de-year three of them (the Meta, TikTok and social playbook posts
are evergreen in substance) and keep the year only on the two that are genuinely
annual comparisons.

### High — aging platform references

Scanning post bodies surfaced claims tied to platform states that move:

| Reference | Posts | Risk |
|---|---|---|
| `iOS 17` tracking behaviour | Meta Ads strategy | Version-specific; dates fast |
| `Advantage+` | 4 posts | Meta renames and restructures this regularly |
| `Performance Max` | 2 posts | Google changes its capabilities often |
| third-party cookies | trends review | The deprecation timeline has shifted repeatedly |
| Twitter / X | social playbook | Naming |
| Reels | 2 posts | Format emphasis shifts |

### Medium — 9 posts over a year old

Oldest first: `getting-started-marketing-automation-beginners-playbook` (423d),
`building-brand-authority-crowded-market` (416d),
`how-to-choose-digital-marketing-agency-dubai` (409d),
`ai-tools-marketing-teams-2025` (402d — year is in the slug, not the title, so it
renders fine; leave the slug alone),
`rebranding-your-business-when-and-how` (395d),
`funnel-design-customer-journey-awareness-to-sale` (388d),
`how-to-build-marketing-budget-uae` (381d),
`performance-marketing-metrics-uae-business-owners` (374d),
`social-proof-reviews-testimonials-strategy` (367d).

### Medium — 58 unsourced statistics

The corpus makes **58 percentage claims** with no citation or as-of date anywhere
(for example "over 99% of internet users", "9.5 million users", "20–40% ROAS").
These read as authoritative but are unverifiable, which cuts against the E-E-A-T
the content is otherwise building. Adding a source and a date to each is the
single highest-value editorial pass available.

### Seasonal — time-sensitive

`ramadan-marketing-uae-strategy-that-converts` — Ramadan 2027 begins around
**February 2027**. Refresh and re-promote in **December 2026**, roughly 8 weeks
ahead, so it is indexed and ranking before planning season.

## Freshness signals now wired

| Signal | Status |
|---|---|
| `dateModified` in `BlogPosting` schema | live — falls back to `datePublished` |
| Visible "Updated …" on the post | live — renders only when genuinely updated |
| Internal links to refreshed content | live — cluster-driven, min 3 inbound per post |
| Sitemap | live — 61 URLs |
| Build-time staleness guard | live — `npm run check:freshness` |
