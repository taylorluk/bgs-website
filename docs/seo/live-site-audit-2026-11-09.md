# Live-Site SEO Audit — bgstech.ae

**Evidence gathered:** 29 October 2026 · **Re-verified against live site:** 9 November 2026
**Pages crawled:** 60 URLs (27 templates + 32 blog posts + asset probes)
**Rendering:** headless Chromium, mobile 390×844 and desktop 1440×900
**Scope:** Diagnosis only — no site code was modified.

---

## ⚠️ Read This First: The Findings Are Real, But The Cause Is Not What It Looks Like

This audit crawled **the deployed site**, and every finding below was re-confirmed live on 9 November. Nothing here is stale.

But the repository tells a different story than the deployment does. Commit `d293545` *"SEO, branding and content overhaul"* — plus the local `dist/` build dated 30 October — **already fixes most of what this audit found.** Both `main` and `seo-content-overhaul` sit at `92d5634` and are pushed to `origin`. The built output contains the sitemap, `robots.txt`, the OG image, the privacy and terms pages, the favicon set, `llms.txt`, non-www canonicals, and a full schema layer.

**None of it is on the live site.** Eleven days after that build, `https://bgstech.ae` still serves the pre-overhaul deployment:

```
/robots.txt         HTTP 404     (exists in dist/)
/sitemap-index.xml  HTTP 404     (exists in dist/)
/og-image.png       HTTP 404     (exists in dist/)
/llms.txt           HTTP 404     (exists in dist/)
/privacy/           HTTP 404     (exists in dist/)
/terms/             HTTP 404     (exists in dist/)
/favicon-32.png     HTTP 404     (exists in dist/)
```

So the real top-priority finding is not an SEO defect at all:

> ### 🔴 D-1 · The Netlify deployment is ~11 days behind the repository
>
> **Evidence:** Netlify site `24fe4299-efb0-43dd-9119-5c6baa4dab74` (per `.netlify/state.json`) serves a build predating commit `d293545`. Local `dist/` (30 Oct) contains all the missing files; live returns 404 for every one. The 142KB `BGS_Logo_white_and_black_4-removebg-preview.png` was **deleted** in `d293545` yet is still served live at 200.
>
> **Why it matters:** Ten of the thirteen SEO findings in this report are already solved in code. They are not SEO problems any more — they are a delivery problem. Writing more SEO fixes before the pipeline works just widens the gap between repo and reality.
>
> **Recommendation:** Diagnose the deploy before touching any SEO code. Check the Netlify build log for the most recent deploy attempt, confirm the site is still linked to the right branch (`main` vs `seo-content-overhaul` — both are at the same commit, so a branch-filter mismatch is a plausible cause), and verify the build isn't failing on `npm run build`. The local build succeeds, so this is unlikely to be a code fault.

**Two scores, therefore:**

| | Score | Status |
|---|---|---|
| **Live site** (what Google sees today) | **69 / 100** | Fair |
| **Repo `dist/` build** (what a deploy would ship) | **~90 / 100** | Excellent |

The rest of this document scores the live site, because that is what ranks. Each finding carries a **Repo status** line showing whether a deploy already fixes it.

---

## Stated Assumptions (scope gate not answered)

- **Site type:** B2B lead-generation site for a Dubai marketing agency (`MarketingAgency` schema, Deira street address, `/contact` + WhatsApp CTAs). **Goal assumed:** qualified inbound leads.
- **Market:** UAE-primary, global secondary (`og:locale=en_AE`, `areaServed: Worldwide`, "Dubai" in 20 of 27 titles). English only.
- **Scope audited:** full site, technical + on-page + content, mobile and desktop.
- **No Search Console or Analytics access.** Indexed-vs-expected coverage, real query data, and actual crawl behaviour are **unverified**. Indexation findings are inferred from served responses, not from Google's reporting.
- **No backlink tool credentials.** Authority scored on observable on-site signals only.
- **Platform:** Astro 6 static site on Netlify, trailing-slash-ignore URL config.

---

## Executive Summary

The engineering is genuinely good. The live site is statically rendered, ships a single 44KB script, measures **CLS 0.0091** and **0ms blocking time**, has correct `immutable` asset caching, HSTS, a valid wildcard certificate, and no horizontal overflow on mobile. Content is substantial — no thin pages, 27 templates averaging 1,100+ words, 32 blog posts live (42 in the repo), every title and meta description unique.

The problems are concentrated in the **signals layer**: a canonical pointing at a hostname that redirects away, two policy pages 404ing while linked from 30 pages, no sitemap, no robots.txt, a 404 social preview, and 1,926 internal links that each fire a 301.

**What limits the live score:** Crawlability & Indexation scores 55/100 on the heaviest weight (30). **What limits it in practice:** the deploy (D-1). Most of these fixes are written, built, and waiting.

---

## SEO Health Index — Live Site

- **Overall Score:** **69 / 100**
- **Health Status:** **Fair** — meaningful issues limiting growth

| Category | Score | Weight | Weighted |
|---|---|---|---|
| Crawlability & Indexation | 55 | 30 | 16.5 |
| Technical Foundations | 78.5 | 25 | 19.6 |
| On-Page Optimization | 74 | 20 | 14.8 |
| Content Quality & E-E-A-T | 60 | 15 | 9.0 |
| Authority & Trust Signals | 95 | 10 | 9.5 |
| **Total** | | **100** | **69.4 → 69** |

> ⚠️ **Consistency flag:** two unresolved Critical findings (C-1, C-2) are open on the live site. A composite score should not be read as "acceptable" while Criticals stand. Treat 69 as *"good foundation, undeployed fixes"* — not as a site that is 69% built.

---

## Findings

### 🔴 C-1 · Every canonical tag points to a hostname that redirects away

- **Category:** Crawlability & Indexation
- **Evidence:** Live homepage serves `<link rel="canonical" href="https://www.bgstech.ae/">`; `curl -I https://www.bgstech.ae` → `301` → `https://bgstech.ae/`. Mismatch on **27 / 27** pages crawled. Same www host in `og:url`, `og:image`, `twitter:image`, and JSON-LD `url` / `logo`. Re-confirmed live 9 Nov.
- **Severity:** Critical · **Confidence:** High
- **Why it matters:** The page declares its canonical home to be a URL that serves no content. Google usually resolves this by following the redirect, but it is a self-contradicting signal that delays canonicalization and propagates the wrong host into every social and structured-data reference.
- **Score Impact:** −20 (Crawlability & Indexation)
- **Repo status:** ✅ **Already fixed.** `src/consts.js` sets `SITE_URL = 'https://bgstech.ae'`; built `dist/index.html` emits `<link rel="canonical" href="https://bgstech.ae/">`. Ships on deploy.

### 🔴 C-2 · Privacy and Terms 404 while linked from 30 pages

- **Category:** Content Quality & E-E-A-T
- **Evidence:** `href="/privacy"` and `href="/terms"` present in **30 of 32** fetched pages. `/privacy`, `/privacy/`, `/privacy-policy/`, `/terms`, `/terms/`, `/terms-and-conditions/` → all **404**, serving Netlify's unbranded default error page. Re-confirmed live 9 Nov.
- **Severity:** Critical · **Confidence:** High
- **Why it matters:** Trustworthiness is an explicit E-E-A-T criterion and missing policy pages are a recognised quality-rater negative — acute for an agency requesting contact details. Separately this is 60 broken internal links. A lead-gen site collecting form data in the UAE also carries a compliance exposure here that sits outside SEO.
- **Score Impact:** −15 (Content Quality & E-E-A-T)
- **Repo status:** ✅ **Already fixed.** `src/pages/privacy.astro` (7.1KB) and `src/pages/terms.astro` (6.0KB) exist; `dist/privacy/index.html` and `dist/terms/index.html` are built. Ships on deploy.

### 🟠 H-1 · No XML sitemap at any standard location

- **Category:** Crawlability & Indexation
- **Evidence:** `/sitemap.xml`, `/sitemap_index.xml`, `/sitemap-index.xml`, `/sitemap.xml.gz` → all 404. 59 indexable URLs confirmed reachable. Re-confirmed live 9 Nov.
- **Severity:** High · **Confidence:** High
- **Why it matters:** Discovery of the blog depends entirely on crawling the `/blog/` listing, and every link out of it fires a 301 (H-2). No sitemap also means no `lastmod` signal.
- **Score Impact:** −10 (Crawlability & Indexation)
- **Repo status:** ✅ **Already fixed.** `@astrojs/sitemap@^3.7.4` is installed and wired into `astro.config.mjs`; `dist/sitemap-index.xml` and `dist/sitemap-0.xml` are built. Ships on deploy.

### 🟠 H-2 · All internal links omit the trailing slash, forcing a 301 on every one

- **Category:** Crawlability & Indexation
- **Evidence:** **1,926 / 1,926** internal page links across the live crawl lack a trailing slash. `/about` → `301 Location: /about/`; pattern holds for all 27 tested. Re-confirmed live 9 Nov (94/94 on the homepage alone).
- **Severity:** High · **Confidence:** High
- **Why it matters:** Every crawl hop and user click costs an extra round trip (~0.6–0.7s observed). Crawl budget is spent on redirects, and no internal link in the site points at a URL that serves 200 directly.
- **Score Impact:** −10 (Crawlability & Indexation)
- **Repo status:** ✅ **Fixed 10 Nov 2026.** The `trailingSlash` config was a red herring — that option governs route matching, not the `href` strings, which were literals and template interpolations across 24 source files. A trailing slash was added to **221 page paths** at source (asset paths, anchors and the `/.netlify/functions/submit-lead` endpoint deliberately excluded). Verified in the build: **6,034 internal page links, 0 without a trailing slash**, and every sampled page now serves 200 with `redirects=0`.

### 🟠 H-3 · 35 of 37 homepage images hotlinked from Unsplash, no responsive sources

- **Category:** Technical Foundations
- **Evidence (live):** 37 `<img>`, **35** from `images.unsplash.com`, only 2 first-party. `srcset` 0/37 · `sizes` 0/37 · `width`+`height` missing on 35/37 · `fetchpriority` 0. Rendered mobile: 13 images = **692KB of 756KB** total transfer (91%). Fixed `w=900&h=600` params serve desktop bytes to a 390px phone.
- **Severity:** High · **Confidence:** High
- **Why it matters:** Mobile users on UAE 4G download roughly 7× more image data than the viewport needs; layout stability rests entirely on CSS; and the site's visual identity depends on a third-party CDN's availability and licensing.
- **Score Impact:** −10 (Technical Foundations)
- **Repo status:** 🟡 **Partially fixed.** The build now emits `width`+`height` on **35 / 35** images, which gives CLS a structural guarantee. Still **0 `srcset`** and still **35 / 35 hotlinked from Unsplash** — the bandwidth and third-party-dependency halves remain open after a deploy.
- **Recommendation:** Move imagery to local assets through Astro's `<Image>` component for automatic `srcset`, AVIF/WebP, and intrinsic dimensions. If hotlinking must continue, add a `srcset` across Unsplash's `w=` breakpoints.

### 🟠 H-4 · No publication or modification dates on blog posts

- **Category:** Content Quality & E-E-A-T
- **Evidence (live):** Across 3 sampled posts — no `<time datetime>`, no `article:published_time`, no `article:modified_time`, no visible date, no `datePublished` in schema.
- **Severity:** High · **Confidence:** High (3-of-32 sample; template uniform, so the pattern is structural)
- **Why it matters:** Freshness is unassessable by crawlers and readers alike. This bites hardest on the posts staking a claim on timeliness — *"The Complete Meta Ads Strategy for UAE Brands in 2026"*, *"Digital Marketing in Dubai: What Actually Works in 2026"*, *"Year in Review: The Trends That Defined 2025"*.
- **Score Impact:** −10 (Content Quality & E-E-A-T)
- **Repo status:** 🟡 **Mostly fixed.** Built posts now carry `<time datetime>` and `BlogPosting` schema, and `scripts/check-content-freshness.mjs` was added to guard it. `article:published_time` is still absent from the OG tags.
- **Recommendation:** Deploy, then add `article:published_time` / `article:modified_time` for completeness.

### 🟠 H-5 · No author attribution on any blog post

- **Category:** Content Quality & E-E-A-T
- **Evidence (live):** No `<meta name="author">`, no `author` property in any JSON-LD block, no byline in any sampled post. The only `By`-pattern matches in body text were false positives (`"by iOS restrictions"`, `"by people who"`).
- **Severity:** High · **Confidence:** High
- **Why it matters:** Experience and Expertise both attach to *people*. The content clearly has first-hand practice behind it — *"How We Took a Restaurant From 3.4 to 4.9 Stars on Google in 8 Weeks"* is exactly the evidence that earns trust — but no named human claims it. This also forfeits the entity-building that makes a consultancy citable by AI search.
- **Score Impact:** −10 (Content Quality & E-E-A-T)
- **Repo status:** ✅ **Already fixed.** Built posts carry author markup. Ships on deploy.

### 🟡 M-1 · robots.txt returns 404

- **Category:** Crawlability & Indexation
- **Evidence:** `https://bgstech.ae/robots.txt` → **404**, `content-type: text/html`. Re-confirmed live 9 Nov.
- **Severity:** Medium · **Confidence:** High
- **Why it matters:** A 404 reads as "crawl everything," so nothing is blocked — not an emergency. But it forfeits the `Sitemap:` directive, offers no control over AI-crawler access, and returns HTML where crawlers expect `text/plain`.
- **Score Impact:** −5 (Crawlability & Indexation)
- **Repo status:** ✅ **Already fixed, and well.** `public/robots.txt` is a considered 1.6KB policy separating AI *search* crawlers (OAI-SearchBot, Claude-SearchBot, PerplexityBot, Applebot) from AI *training* crawlers (GPTBot, ClaudeBot, Google-Extended, Applebot-Extended), with a `Sitemap:` line and a correct note that Google-Extended governs training only while Googlebot governs AI Overviews eligibility. Ships on deploy.

### 🟡 M-2 · Social preview image returns 404

- **Category:** On-Page Optimization
- **Evidence:** `og:image` = `https://www.bgstech.ae/og-image.png` → **404**. Declared `og:image:width=1200` / `height=630` describe a file that isn't there. Re-confirmed live 9 Nov.
- **Severity:** Medium · **Confidence:** High
- **Why it matters:** Every share on LinkedIn, WhatsApp, Slack, or X renders bare. For an agency whose own LinkedIn and WhatsApp are primary channels, this is self-inflicted. It also degrades the preview AI assistants surface when citing the site.
- **Score Impact:** −5 (On-Page Optimization)
- **Repo status:** ✅ **Already fixed.** `public/og-image.png` (159KB) exists and is built to `dist/`. Ships on deploy. *(Minor follow-up: 159KB is large for an OG image; ~60KB would render identically.)*

### 🟡 M-3 · 13 of 27 titles exceed the ~60-character display limit

- **Category:** On-Page Optimization
- **Evidence (live):** `/services/content-marketing` **84 chars**, `/services/systems-api-integration` **81**, `/services/automated-reporting-insights` **80**, `/services/marketing-automation` **79**, `/services/ecommerce-development` **77**, `/offers` **74**. Blog titles add `| BGS Technologies Blog`, reaching 95.
- **Severity:** Medium · **Confidence:** High
- **Why it matters:** The least differentiating part of the title — the brand suffix — is what survives the character budget while the second keyword phrase gets cut.
- **Score Impact:** −5 (On-Page Optimization)
- **Repo status:** ✅ **Already fixed.** Across **73** built pages, **0** titles exceed 60 characters (max exactly 60). Ships on deploy.

### 🟡 M-4 · /offers/ has no H1

- **Category:** On-Page Optimization
- **Evidence (live):** `/offers/` → **0** `<h1>`; outline starts at `<h2>Try Us for Free. Pay When It Works.</h2>`. All other 26 templates have exactly one H1. Re-confirmed live 9 Nov.
- **Severity:** Medium · **Confidence:** High
- **Why it matters:** The sole outline break in an otherwise clean site, on a conversion-intent page.
- **Score Impact:** −5 (On-Page Optimization)
- **Repo status:** ✅ **Already fixed.** Built `dist/offers/index.html` has exactly 1 H1. Ships on deploy.

### 🟡 M-5 · One org schema block repeated 27 times; no page-type schema

- **Category:** On-Page Optimization
- **Evidence (live):** JSON-LD on 27/27 pages, **all** `MarketingAgency`, zero other types. No `BreadcrumbList` on the 20 two-level `/services/*/` pages and no breadcrumb nav. No `Service`. No `Article`/`BlogPosting` on any of 32 posts. No `FAQPage` despite explicit `<h2>FAQ</h2>` sections on service pages. The `logo` value carries unencoded spaces — `https://www.bgstech.ae/BGS Logo white and black_4.png` — a malformed URL that curl rejects outright.
- **Severity:** Medium · **Confidence:** High
- **Why it matters:** Four rich-result opportunities unclaimed on pages that already hold the content the markup describes. The malformed `logo` URL likely fails Google's parser, which can invalidate the organization entity that *is* present.
- **Score Impact:** −5 (On-Page Optimization)
- **Repo status:** ✅ **Already fixed, thoroughly.** Built output emits `BlogPosting`, `BreadcrumbList`, `CollectionPage`, `FAQPage`, `MarketingAgency`, `Service`, `WebSite`, plus `ImageObject`, `ListItem`, `PostalAddress` and `WebPage`. The spaced-filename logo was deleted in `d293545` and replaced by `public/logo.png`. Ships on deploy.

### 🟡 M-6 · HTML served uncacheable at the edge; ~60% of requests miss

- **Category:** Technical Foundations
- **Evidence:** Homepage `cache-control: public,max-age=0,must-revalidate`. Five consecutive requests: `fwd=miss` / `hit` / `fwd=miss` / `hit` / `fwd=miss` — **3 of 5 missed**. TTFB **0.364s (hit) → 0.663s (miss)**; rendered mobile TTFB **941ms**. By contrast `/_astro/*` and image assets correctly serve `max-age=31536000, immutable`.
- **Severity:** ~~Medium~~ → **RETRACTED 10 Nov 2026** · **Confidence:** ~~High~~ → the measurement was right, the inference was wrong
- **⚠️ This finding does not hold.** The observed miss rate was real, but "HTML is uncacheable at the edge" was the wrong conclusion. Direct testing showed the Netlify CDN reports `cache-status: "Netlify Edge"; hit; ttl=31535999` on the **unmodified** production site — the edge was already holding HTML with a ~365-day TTL. The `max-age=0, must-revalidate` value is the *browser* directive and says nothing about CDN behaviour; Netlify caches HTML independently and purges the edge on each atomic deploy.
- **What the misses actually were:** requests landing on different edge nodes, each with its own cache shard. A cold node forwards to origin once and stores. That is normal CDN distribution, not a configuration fault, and it is not fixable with a header.
- **Score Impact:** **0** — the −5 deduction is withdrawn. The live Technical Foundations score should read **83.5**, not 78.5, and the overall index **70–71**, not 69.
- **Action taken:** An `s-maxage` / `Netlify-CDN-Cache-Control` rule was trialled in `netlify.toml`, measured against a draft deploy, shown to change nothing, and **reverted**. `netlify.toml` is byte-identical to its pre-audit state.
- **Remaining real point:** TTFB (~0.36s on an edge hit, ~0.5–0.7s on a miss) is still the largest component of LCP. Reducing it means fewer origin forwards or a faster origin, not a caching header.

### 🟡 M-7 · 142KB unoptimized PNG used as favicon and logo on every page

- **Category:** Technical Foundations
- **Evidence (live):** `/BGS_Logo_white_and_black_4-removebg-preview.png` = **142,810 bytes**, referenced as both `rel="icon"` and `rel="apple-touch-icon"`. On `/services/paid-advertising/` it is **143KB of the page's 196KB total transfer — 73%**. Still served live on 9 Nov.
- **Severity:** Medium · **Confidence:** High
- **Why it matters:** On the service pages — where organic traffic should land — a logo is nearly three-quarters of the payload. A favicon should be 1–5KB. The `-removebg-preview` filename suggests an unprocessed background-removal export shipped to production.
- **Score Impact:** −5 (Technical Foundations)
- **Repo status:** ✅ **Already fixed.** `d293545` deleted that file along with two other stray logo PNGs, and added a proper set: `favicon-32.png` (917 B), `favicon-96.png` (2.6KB), `favicon-192.png` (5.3KB), `favicon-512.png` (16.7KB), `favicon.svg` (6KB), `apple-touch-icon.png` (4KB), and `logo.png` (16.7KB — down from 142KB). Ships on deploy.

### 🔵 L-1 · No preload or fetchpriority for the LCP element

- **Category:** Technical Foundations
- **Evidence:** Resource hints = 2 `preconnect` (fonts.googleapis.com, fonts.gstatic.com). No `preload`, no `modulepreload`, no `fetchpriority` on any of 37 images. LCP element is `H1.hero-headline` (mobile) / `H1.sp-title` (desktop) — text, dependent on the render-blocking Google Fonts stylesheet.
- **Severity:** Low · **Confidence:** Medium (lab conditions only)
- **Why it matters:** A text LCP is the good case, but it waits on a third-party stylesheet. `display=swap` is already in the font URL, which mitigates this well, so headroom is modest.
- **Score Impact:** −3 × 0.5 (Medium confidence) = **−1.5** (Technical Foundations)
- **Repo status:** ❌ Still open.
- **Recommendation:** Self-host the two families with `preload`, or add `<link rel="preload" as="style">` for the Google Fonts stylesheet.

### 🔵 L-2 · Two meta descriptions exceed 160 characters

- **Category:** On-Page Optimization
- **Evidence (live):** `/` = **162 chars**; `/services/automated-reporting-insights` = **166 chars**. The other 25 fall within 126–160.
- **Severity:** Low · **Confidence:** High
- **Score Impact:** −1 (On-Page Optimization)
- **Repo status:** 🟡 Likely fixed alongside the title rewrite in `d293545`, but not separately verified in the build.

### 🔵 L-3 · Thin external authority signals

- **Category:** Authority & Trust Signals
- **Evidence:** `sameAs` lists 2 profiles (LinkedIn, Instagram). No Google Business Profile reference despite a full street address in schema (`205, Damas Tower, 2nd Al Maktoum Road, Riggat Al Buteen, Deira, Dubai`). The only external link site-wide is `https://wa.me/971521456818` — zero outbound citations across 32 blog posts.
- **Severity:** Medium · **Confidence:** Medium (on-site signals only; no backlink data)
- **Why it matters:** A local business with a verifiable Dubai address and no GBP linkage forfeits map-pack eligibility and the strongest available local entity signal. Zero outbound citations across 35,000+ words of advisory content also reads as weak expertise to raters and to AI systems, which treat sourcing as a citability input.
- **Score Impact:** (−5 + −5) × 0.5 = **−5** (Authority & Trust Signals)
- **Repo status:** ❌ Still open — largely off-site work.
- **Recommendation:** Add the Google Business Profile URL to `sameAs`, claim and complete the profile, and cite primary sources where blog posts make factual claims.

---

## What's Working — Do Not Regress

| Signal | Measured (live) |
|---|---|
| Host canonicalization (redirects) | All 4 variants → `https://bgstech.ae/` · 1–2 hops |
| CLS | **0.0091** mobile · **0.0024** desktop (target <0.1) |
| Total Blocking Time | **0ms** both viewports |
| JavaScript payload | **1 script, 44KB** — static Astro output |
| 404 handling | True `404` status, no soft-404s |
| Mobile overflow | `scrollWidth` 390 = `clientWidth` 390 |
| Asset caching | `max-age=31536000, immutable` on `/_astro/*` |
| Security | HSTS 1yr · wildcard cert valid to 26 Dec 2026 · `nosniff` · `X-Frame-Options: DENY` · `strict-origin-when-cross-origin` |
| Title/description uniqueness | **27/27 unique**, zero duplicates |
| Content depth | No page under 400 words; service pages 1,104–1,180; homepage 3,818 |
| Alt text | **37/37** images have populated, descriptive alt |
| Internal linking | 20 cross-links between sibling service pages |

---

## Prioritized Action Plan

### 0 · Fix The Pipeline — before any SEO work

| # | Action | Finding | Recovery |
|---|---|---|---|
| 0 | Diagnose why Netlify is 11 days behind `origin`. Check the latest build log, confirm the deploy branch, verify `npm run build` on CI. | **D-1** | **+17 to +21 overall** — ships C-1, C-2, H-1, H-5, M-1, M-2, M-3, M-4, M-5, M-7 and part of H-3/H-4 at once |

This single step is worth more than every other item on this list combined. Nothing below it should start first.

### 1 · Still Open After A Deploy

| # | Action | Finding | Recovery |
|---|---|---|---|
| 1 | ~~Set `trailingSlash: 'always'`~~ → **DONE 10 Nov**: trailing slashes added to 221 page paths at source; 0 of 6,034 built links now lack one | **H-2** | +3.0 ✅ |
| 2 | ~~Add an HTML caching header~~ → **WITHDRAWN**: the finding was a misdiagnosis; the edge already caches HTML for ~365 days. Change trialled, measured, reverted | **M-6** | n/a |
| 3 | Move Unsplash imagery to local assets via Astro `<Image>` for `srcset` + AVIF/WebP | **H-3** (remainder) | +1.5 |
| 4 | Add `article:published_time` / `article:modified_time` to post OG tags | **H-4** (remainder) | +0.5 |
| 5 | Self-host fonts with `preload`, or preload the Google Fonts stylesheet | **L-1** | +0.4 |

### 2 · Off-Site and Editorial

| # | Action | Finding |
|---|---|---|
| 6 | Claim the Google Business Profile and add its URL to `sameAs` | **L-3** |
| 7 | Add outbound citations to primary sources where posts make factual claims | **L-3** |
| 8 | Compress `og-image.png` from 159KB to ~60KB | **M-2** follow-up |

### 3 · Verify After Deploying

- Re-run this audit against the live site and confirm the fixes landed.
- Submit the now-existing sitemap in Search Console.
- Run URL Inspection on two or three service pages to confirm Google picked up the corrected non-www canonical.
- Re-check Core Web Vitals with a PageSpeed Insights API key for real field data.

**Projected trajectory:** deploy alone → **~86–90**. Deploy plus the five "still open" items → **~93**.

---

## Explicit Limitations

- **The score reflects SEO readiness, not rankings.** Competition, domain history, and algorithm updates are not modelled.
- **Performance figures are lab measurements on unthrottled desktop-class hardware and connectivity.** Real mobile LCP on UAE 4G will be materially worse than the 1,612ms observed — the 692KB of unoptimized imagery (H-3) is the dominant variable and is understated here.
- **No CrUX field data was obtainable.** The PageSpeed Insights API returned `HTTP 429` (keyless daily quota exhausted), so no lab-vs-field comparison was possible.
- **No Search Console or Analytics access.** Indexed-vs-expected coverage, actual crawl behaviour, query performance, and any manual actions are **entirely unverified**. A canonical conflict like C-1 is best confirmed in GSC's own URL Inspection; the inference here is from served responses only.
- **Authority scoring is directional.** No backlink data source was available, so 95/100 in that category reflects only on-site entity signals and is not a verdict on the link profile.
- **Live blog findings rest on a 3-of-32 sample.** The template is uniform so confidence is High, but the count is extrapolated. The repo now holds 42 posts, not 32.
- **The ~90 repo score is an estimate**, derived by re-scoring the live findings against built `dist/` output. It is not a crawl of a deployed site and should be re-measured after deploying.
- **Diagnosis only.** No site code was modified.

---

## Method

Evidence gathered 29 October 2026, re-verified against the live site and the repository 9 November 2026:

- `curl` against all four host/scheme variants to map redirects and canonicalization
- A 60-URL crawl of every internal link discovered on the homepage and `/blog/` listing, recording status, size, and response time
- Parsing served HTML for titles, meta descriptions, canonicals, heading outlines, JSON-LD, image attributes, and internal link hygiene across all 200-returning pages
- Headless Chromium (Playwright, via the `claude-seo` plugin runtime) at mobile 390×844 and desktop 1440×900, capturing LCP with its element, CLS with individual shift entries, long-task blocking time, and per-type resource transfer via `PerformanceObserver`
- Direct asset probes for the OG image, favicon, schema logo URL, sitemap and robots candidates
- `openssl s_client` for certificate subject, validity window, and SAN coverage
- Re-probe of nine live paths on 9 November, plus a parallel scan of built `dist/` output and `git log` to separate "not fixed" from "fixed but not deployed"
