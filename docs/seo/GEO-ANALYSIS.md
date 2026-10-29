# GEO / AI Search Analysis — BGS Technologies

Generated 2026-10-29 · 62 pages · 32 posts · 20 service pages

> Google's own position: *"From Google Search's perspective, optimizing for generative
> AI search is optimizing for the search experience, and thus still SEO."*
> Everything below is SEO fundamentals applied to AI-search surfaces, not a separate discipline.

## GEO Readiness Score: 53 / 100

| Criterion | Weight | Score | Weighted |
|---|---:|---:|---:|
| Passage-level citability | 25 | 40 | 10.0 |
| Structural readability | 20 | 75 | 15.0 |
| Multi-modal content | 15 | 30 | 4.5 |
| Authority & brand signals | 20 | 25 | 5.0 |
| Technical accessibility | 20 | 90 | 18.0 |
| **Total** | **100** | | **52.5 → 53** |

**What caps the score:** authority and citability. The technical foundation is excellent
and the content is genuinely deep, but it is anonymous, undated until this week, built
almost entirely of prose, and 31 of 32 posts are past the window where third-party studies
see meaningful citation rates.

## Platform readiness

No GEO measurement tool (DataForSEO, SE Ranking) is connected, so these are **qualitative
readiness assessments, not measured visibility**.

| Surface | Readiness | Reasoning |
|---|---|---|
| Google AI Overviews | Moderate | Cites pages that already rank. Technical SEO is now strong; ranking is the gate. |
| Google AI Mode | Weak | Weakly ranking-correlated; rewards freshness and entity authority — both weak here. |
| ChatGPT | Weak | Leans on Wikipedia and Reddit presence. BGS has neither. |
| Perplexity | Weak | Reddit-heavy citation base. No presence. |
| Bing Copilot | Moderate | Bing index + standard SEO. Should follow the Google work. |

## AI crawler access — now explicit

Previously every AI crawler fell under a bare `User-agent: * / Allow: /`. Permissive, but
undeclared. `public/robots.txt` now names them, with search citability and model training
kept strictly separate.

### Search citability (whether this site can be *cited* in AI answers)

| Crawler | Governs | Status |
|---|---|---|
| `Googlebot` | Google Search, AI Overviews **and** AI Mode eligibility | Allowed (via `*`) |
| `OAI-SearchBot` | ChatGPT Search citability | **Allowed, explicit** |
| `Claude-SearchBot` | Claude search citability | **Allowed, explicit** |
| `PerplexityBot` | Perplexity AI search | **Allowed, explicit** |
| `Applebot` | Siri / Spotlight / Safari discovery | **Allowed, explicit** |

### Model training (a licensing choice, not a search-visibility one)

| Crawler | Governs | Status |
|---|---|---|
| `GPTBot` | OpenAI model training | Allowed |
| `ClaudeBot` | Anthropic model training | Allowed |
| `Google-Extended` | Gemini / Vertex training & grounding | Allowed |
| `Applebot-Extended` | Apple Intelligence training | Allowed |

Allowing training was a deliberate default: for an agency, broad model familiarity with the
brand is worth more than withholding content. Flipping any of these to `Disallow` opts out
of training **without** touching the citability granted above.

> Two pairs are routinely conflated and are kept separate here: `GPTBot` ≠ `OAI-SearchBot`,
> and `Google-Extended` ≠ `Googlebot`. Blocking `Google-Extended` would **not** remove the
> site from AI Overviews or AI Mode — both are served from the `Googlebot` index.

## llms.txt — now published, with no Google weight

`/llms.txt` is generated at build time from the real content (`src/pages/llms.txt.ts`), so
it cannot drift. It maps the 8 topic clusters, their hub service pages and spoke posts.

**It carries no weight in the score.** Google's AI optimization guide states llms.txt is not
used by Google Search and neither helps nor hurts visibility or rankings. It is published
for non-Google systems that may read it. Do not treat it as a Google lever.

## Technical accessibility — the strong point (90/100)

| Check | Result |
|---|---|
| Server-side rendering | **Static HTML.** A sample post carries 1,362 words in raw source. |
| JavaScript dependency for content | **None.** One bundle, animation only. |
| Crawlers that don't run JS (GPTBot, PerplexityBot) | See full content |
| Heading hierarchy | 0 pages skip a level across 62 |
| Structured data | Organization, WebSite, Service ×20, BlogPosting ×32, FAQPage ×21, BreadcrumbList ×58 |
| RSL 1.0 licensing | Not implemented (optional) |

## Passage-level citability — the biggest gap (40/100)

| Signal | Measured | Issue |
|---|---:|---|
| Question-form H2 headings | **20 of 291 (7%)** | AI surfaces match query patterns. 93% of headings are statements. |
| Median first paragraph | **25.5 words** | Too thin to stand alone. ~44% of AI citations come from the first 30% of a page (SE Ranking). |
| Tables | **0 across 32 posts** | Comparative data is prime citation material; none is in extractable form. |
| Lists | 342 | Strong — this part works. |
| Median paragraph | 30.5 words | Good; within the 2–4 sentence target. |
| Posts opening with a definition | 11 of 32 | "X is…" patterns are heavily quoted. |
| Statistics with a cited source | **0 of 58** | Claims read as authoritative but are unverifiable. |

### Highest-leverage editorial fix

The `google-ads-vs-meta-ads-uae-business-2026` post is a direct comparison with **no table**.
Comparison content without a table is the clearest citability miss in the corpus.

Rewrite pattern for a spoke post:
1. H2 as the question a user would type — *"How much does Meta advertising cost in the UAE?"*
2. Answer in the first 40–60 words, self-contained, no prior context needed.
3. Expand to a ~130–170 word block (readability heuristic, not a Google rule).
4. Attribute every statistic with a source and an as-of date.

## Authority & brand signals — weakest (25/100)

| Signal | Status |
|---|---|
| Author | **Organization, not a credentialed Person.** All 32 posts anonymous. |
| Publication date | Present |
| Last-updated date | **Now wired** (`dateModified`, schema + visible) |
| Recency | **31 of 32 posts are 180+ days old. Only 1 under 90 days.** |
| Citations to primary sources | **None** — 58 unsourced statistics |
| `sameAs` entities | **2** (LinkedIn, Instagram) |
| Wikipedia / Wikidata | None |
| YouTube presence | None |
| Reddit presence | None |

> Ahrefs (75,000 brands, published 2025-12-12) found brand mentions correlate **~3×** more
> strongly with AI citations than backlinks — YouTube mentions strongest (~0.737) versus
> Domain Rating (~0.266). BGS has no presence on the platforms that matter most.

## Multi-modal content (30/100)

Images on every post, but all stock (108 Unsplash references). **No video, no charts, no
infographics, no calculators or interactive tools.** For an agency selling campaign
forecasting and analytics dashboards, a public ROAS or ad-budget calculator would be both
genuinely useful and a durable citation magnet.

## Top 5 highest-impact changes

1. **Run a refresh cycle.** 31 of 32 posts sit past the point where third-party studies see
   meaningful citation rates. The infrastructure is now in place (`dateModified`,
   `npm run check:freshness`); it needs the editorial pass. Highest impact by distance.
2. **Attribute the 58 statistics.** Source + as-of date on each. Converts unverifiable
   assertions into quotable, checkable facts — and fixes an E-E-A-T gap at the same time.
3. **Name the authors.** Real people with credentials and `Person` schema. The builder
   already supports `jobTitle` and `url`; it needs names. Single biggest authority lever.
4. **Convert comparison content to tables.** Zero tables across 32 posts. Start with the
   Google-vs-Meta post.
5. **Build entity presence off-site.** YouTube and Reddit specifically, plus expand `sameAs`
   beyond two profiles. This is where the Ahrefs correlation actually lives.

## Already addressed

| Item | Status |
|---|---|
| AI crawler access, explicitly declared and correctly separated | Done |
| `/llms.txt`, build-generated, no Google weight claimed | Done |
| `dateModified` in schema and visible on posts | Done |
| Full schema graph with `@id` references | Done |
| Server-side rendered content, no JS dependency | Already correct |
| Clean heading hierarchy across all 62 pages | Done |
| Cluster-based internal linking, min 3 inbound per post | Done |
