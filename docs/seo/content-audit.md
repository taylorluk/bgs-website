# Content Quality & E-E-A-T Audit — BGS Technologies

Generated 2026-10-29 · 32 blog posts · 20 service pages

## Correction to the original SEO audit

My first audit reported "~1,300 words per service page" and treated content depth as a
strength. That figure counted the **rendered page** — nav, footer, CTA and related blocks
included. Measuring only the unique body content:

| | Reported before | Actual body |
|---|---:|---:|
| Service pages (median) | ~1,300 words | **492 words** |
| Blog posts (median) | ~1,300 words | **784 words** |

Depth is a **weakness**, not a strength. The rest of this audit works from the real numbers.

## Scores

| Category | Score | Issues found | Recommendation |
|---|---:|---|---|
| Content depth | **4/10** | Blog median 784w (20 of 32 under 800). Services median 492w (14 of 20 under 500). | Expand the top-10 commercial pages to 1,200w+ with genuinely new substance, not padding. |
| E-E-A-T signals | **3/10** | **0 external citations across all 32 posts.** All authors anonymous. 21 of 32 posts contain no first-hand experience marker. All imagery stock. | Name authors; source every statistic; add real client evidence. |
| Readability | **8/10** | Avg sentence 19 words, avg paragraph 30 words, 342 lists, clean H1→H2→H3 on all 62 pages. | No action — this is genuinely good. |
| Keyword optimisation | **8/10** | 62 unique titles, 0 duplicate descriptions, strong Dubai/UAE qualifiers. | No action. |
| Structure & formatting | **6/10** | **0 tables across 32 posts.** Only 7% of H2s are question-form. | Convert comparisons to tables; reframe headings as questions. |
| Trust indicators | **4/10** | Privacy/Terms and real NAP now present. Still no named authors, no cited sources, no review markup. | See E-E-A-T. |

**Overall content quality: 5.5 / 10**

## The most damaging finding

**Zero external citations exist anywhere in 32 posts** — yet the content makes 58 specific,
checkable percentage claims. Examples:

| Claim | Post |
|---|---|
| "78% of them will call a competitor" | `ai-receptionists-transforming-customer-service-dubai` |
| "WhatsApp has a 97% penetration rate in the UAE" | `whatsapp-business-marketing-conversations-to-customers` |
| "85% of views are silent" (Facebook) | `tiktok-advertising-uae-complete-2026-guide` |
| "open rates of 80–90% versus 20–25% for email" | `whatsapp-business-marketing-conversations-to-customers` |

One is worse than unsourced — it explicitly invokes a source that is never linked:

> "TikTok's **own internal data** says that 83% of top-performing ads feel…"

Attributing a figure to a named source and providing no link is the weakest possible
trust posture: it claims authority while making verification impossible. If the data is
real, link it. If it cannot be linked, soften the attribution.

## Thin content

**Blog — 20 of 32 posts under 800 words.** Thinnest:

| Post | Words |
|---|---:|
| `performance-marketing-metrics-uae-business-owners` | 673 |
| `email-marketing-automation-sequences` | 709 |
| `funnel-design-customer-journey-awareness-to-sale` | 714 |
| `content-marketing-strategy-dubai-smes` | 718 |
| `video-marketing-strategy-uae-2025` | 719 |

**Service pages — 14 of 20 under 500 words, and structurally identical.** Every one of the
20 has exactly **6 features, 4 FAQs and 3 stats**. That uniformity is detectable: 20 pages
sharing an identical skeleton with ~490 words of swapped copy reads as templated rather
than authoritative. These are the commercial money pages — the ones expected to rank for
"[service] agency Dubai" — and they are the thinnest content on the site.

## Experience — the weakest E-E-A-T pillar

Only **11 of 32** posts contain any first-hand marker ("we took", "our client", "in our
experience"). The strongest is `restaurant-google-reviews-3-4-to-4-9-stars-8-weeks`, which
reads as a genuine case study — and is illustrated with **Unsplash stock**. A post claiming
a specific client result, shown with a stock photo and no author, converts its best asset
into an unverifiable claim.

## Priority

1. **Source the 58 statistics.** Highest value per hour on the whole site. Converts
   unverifiable assertions into citable facts and fixes the E-E-A-T gap at once.
2. **Name the authors.** `Person` schema is already wired (`src/lib/schema.js` supports
   `jobTitle` and `url`); it needs real names and credentials.
3. **Expand the 20 service pages.** They are the commercial pages and the thinnest content.
   Break the identical 6/4/3 template — add a UAE-specific section, a real client example,
   or a pricing explainer that differs per service.
4. **Add tables.** Zero across 32 posts. Start with `google-ads-vs-meta-ads-uae-business-2026`
   — a comparison post with nothing comparable in extractable form.
5. **Replace stock imagery on evidence posts.** Case studies specifically. A real dashboard
   screenshot outweighs a thousand words of claim.

## Not an issue

Readability and keyword targeting are genuinely strong and need no work. Sentence and
paragraph length are well judged, the heading hierarchy is clean across all 62 pages, and
title/description targeting for Dubai and UAE intent is better than most agency sites. The
problem is not how this content is written — it is that nothing in it can be verified.
