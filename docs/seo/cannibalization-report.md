# Keyword Cannibalization Report — BGS Technologies

Generated 2026-10-29 · 20 service pages × 32 blog posts · Jaccard term overlap on title + SERP title

36 service↔post pairs and 11 post↔post pairs cleared the overlap threshold. Most are **not**
cannibalization — a commercial service page and an informational post on the same topic serve
different intent, which is healthy hub-and-spoke. What follows are the genuine conflicts.

## 1. HIGH — the head commercial term is owned by a blog post

**Conflict keyword:** *digital marketing agency Dubai*

| Page | Intent | Currently targeting it |
|---|---|---|
| `/` (homepage) | Commercial | `BGS Technologies — Full-Service Marketing Agency \| Dubai` |
| `/blog/how-to-choose-digital-marketing-agency-dubai` | Informational | `How to Choose a Marketing Agency in Dubai` |

That post also overlaps **four** service pages (`content-marketing`, `influencer-pr`,
`marketing-automation`, `email-sms-marketing`) at 0.29–0.33 on *marketing* + *agency*.

This is the most commercially valuable keyword the business has, and the page competing
for it with the homepage is a guide telling readers how to evaluate agencies. Google must
choose between them, and an informational post is the likelier pick for a "how to choose"
query — which is the wrong page to win a bottom-of-funnel search.

**Resolution — pick one:**
- **(a) Differentiate.** Retitle the post toward the evaluation intent it actually serves
  (*"15 Questions to Ask a Marketing Agency Before You Sign"*) and leave the head term to
  the homepage. Lowest risk.
- **(b) Build the commercial page.** Create `/digital-marketing-agency-dubai` as a proper
  landing page, point the post at it, and let the homepage target the brand. Highest upside,
  most work.

Not actioned — this is a positioning decision, not a mechanical fix.

## 2. HIGH — two posts competing for LinkedIn B2B UAE — **resolved**

| Post | Overlap | Was | Now |
|---|---:|---|---|
| `linkedin-advertising-uae-b2b-brands-complete-guide` | 0.33 | *LinkedIn Advertising Guide for UAE B2B Brands* | **LinkedIn Ads for UAE B2B: Campaign Setup Guide** |
| `linkedin-b2b-lead-generation-uae` | | *How to Use LinkedIn for B2B Lead Generation in the UAE* | **Organic LinkedIn Lead Generation in the UAE** |

Both shared *linkedin* + *b2b*. The content genuinely differs — one is paid campaign setup,
the other organic prospecting — but the titles did not say so. Now each carries a distinct
primary keyword (*LinkedIn ads* vs *organic LinkedIn*). **Applied.**

## 3. MEDIUM — three posts on Meta Ads

| Post | Overlap with the "Complete Strategy" post | Distinct intent? |
|---|---:|---|
| `complete-meta-ads-strategy-uae-brands-2026` | — | Hub: broad strategy |
| `google-ads-vs-meta-ads-uae-business-2026` | 0.29 | Yes — comparison |
| `4x-meta-ads-roas-without-increasing-budget` | 0.25 | Yes — single tactic |

Intents are genuinely distinct, so this is manageable rather than broken. The risk is that
all three carry *Meta Ads* prominently in the title. Recommended: keep the Complete Strategy
post as the cluster's internal hub, and make sure the other two link up to it with
keyword-bearing anchors (the cluster linking now does this automatically).

## 4. MEDIUM — one post competes with almost everything

`digital-marketing-dubai-what-actually-works-2026` overlaps **five** other posts at 0.25–0.29:

- `ramadan-marketing-uae-strategy-that-converts`
- `how-to-build-marketing-budget-uae`
- `how-to-choose-digital-marketing-agency-dubai`
- `digital-marketing-trends-2025-year-in-review`
- plus four service pages on *marketing*

It is a broad survey post covering what every narrower post covers. Classic internal
competitor. **Recommendation:** promote it to a genuine pillar — expand it, and have it link
out to each narrower post as the authoritative overview — or narrow it to one channel. Leaving
it broad and thin (800 words) is the worst of both.

## 5. LOW — false positives

These flagged on the generic token *marketing* alone and are **not** conflicts:
`video-marketing-strategy-uae` vs `/services/analytics-reporting-dashboards`,
`ramadan-marketing` vs `/services/influencer-pr`, and similar. No action.

## Healthy hub-and-spoke — explicitly not cannibalization

| Service page (commercial) | Post (informational) | Overlap |
|---|---|---:|
| `/services/seo-local-search` | `local-seo-dubai-google-my-business` | 0.22 |
| `/services/content-marketing` | `content-marketing-strategy-dubai-smes` | 0.29 |
| `/services/marketing-automation` | `getting-started-marketing-automation-beginners-playbook` | 0.29 |
| `/services/landing-pages-funnels` | `landing-page-design-principles-uae` | 0.27 |
| `/services/social-media-management` | `2026-social-media-playbook-uae-businesses` | 0.40 |

Different search intent, and now explicitly linked hub↔spoke. These should stay as they are —
the overlap is the point.

## Prevention

The cluster architecture (`src/data/clusters.js`) now assigns every post a hub, which makes
future conflicts visible at authoring time: two posts in the same cluster with near-identical
titles is the signal to catch. Worth adding to `npm run check:freshness` as a title-similarity
check if the blog grows past ~50 posts.
