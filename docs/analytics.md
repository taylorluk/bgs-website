# Analytics

## Current state

| | Value | Status |
|---|---|---|
| `PUBLIC_GA_ID` | `G-L9F6T6DPW4` | **Active** — GA4 loaded directly |
| `PUBLIC_GTM_ID` | `GTM-N4BRBRN6` | **Not set** — deliberately |

Set both in Netlify under **Site configuration → Environment variables**. They are
read at build time, so a redeploy is required after changing them. Analytics only
ships in production builds — local and preview traffic never reaches the property.

## Why GTM is switched off

The container exists but is empty. Tested 29 October 2026 against a production
build: `gtm.js`, `gtm.dom` and `gtm.load` all fired, but no tags ran and no `_ga`
cookies were set. It has no published GA4 configuration tag.

That matters because **GA4 and GTM are mutually exclusive by design**. When
`PUBLIC_GTM_ID` is set, the direct gtag.js tag is suppressed — otherwise, once a
GA4 tag is added inside GTM, every pageview fires twice and sessions, engagement
and conversions all inflate.

So setting `PUBLIC_GTM_ID` before the container has a published GA4 tag would
produce **no analytics at all**.

## The switch

| `PUBLIC_GTM_ID` | `PUBLIC_GA_ID` | Result |
|---|---|---|
| empty | set | GA4 direct — **current** |
| set | set | GTM only, gtag suppressed |
| set | empty | GTM only |
| empty | empty | Nothing ships |

No code change is needed to move between these.

## Moving to GTM later

1. In GTM, add a **GA4 Configuration** tag with measurement ID `G-L9F6T6DPW4`,
   triggered on All Pages.
2. On each tag, set its **built-in consent settings** to require
   `analytics_storage`. The consent defaults this site pushes reach GTM fine —
   Consent Mode is container-agnostic — but GTM will not gate individual tags
   unless each one declares what it needs.
3. **Publish** the container. An unpublished container fires nothing.
4. Set `PUBLIC_GTM_ID=GTM-N4BRBRN6` in Netlify and redeploy. The direct tag
   suppresses itself automatically.
5. Confirm in GA4 Realtime that pageviews appear **once**, not twice.

## Consent

Google Consent Mode v2, with defaults declared before any container loads.

| Signal | EEA / UK / CH | Elsewhere |
|---|---|---|
| `analytics_storage` | denied until allowed | granted, opt-out available |
| `functionality_storage` | denied until allowed | granted |
| `ad_storage` | denied | denied |
| `ad_user_data` | denied | denied |
| `ad_personalization` | denied | denied |
| `security_storage` | granted | granted |

Advertising signals stay denied everywhere, including after a visitor opts in —
this site runs no ad cookies, and the privacy policy says so.

The banner stores the choice in `localStorage` under `bgs-consent` and re-applies
it on load before anything reports. All storage access is wrapped, so private
mode degrades to the defaults rather than throwing. A **Cookie settings** control
in the footer reopens it.

Not verified: the EEA branch. Region matching is resolved client-side by gtag
based on visitor location, and testing was done from outside the EEA. To confirm,
load the site through a VPN with a German or UK exit — the banner should appear
with analytics denied until accepted.

## Before launch

- [ ] Set `PUBLIC_GA_ID` in Netlify and redeploy
- [ ] Confirm the GA4 data stream URL is the apex `bgstech.ae`, not `www`
- [ ] Exclude internal traffic: GA4 Admin → Data Streams → Configure tag settings
      → Define internal traffic (add `localhost`), then Admin → Data filters to
      activate it. Test hits from local builds on 29–30 October 2026 are in the
      property and should be filtered out.

## PostHog

Added 30 October 2026 via `npx @posthog/wizard`, then reworked. Runs alongside
GA4 rather than instead of it — the GTM/GA4 exclusivity above does not apply.

| | Value |
|---|---|
| `PUBLIC_POSTHOG_KEY` | project token (`phc_…`), public by design |
| `PUBLIC_POSTHOG_HOST` | `https://us.i.posthog.com` |

### What was changed from the wizard output

The wizard's version called `posthog.init()` on load with no consent check, which
contradicted the privacy policy. It also rewrote `netlify/functions/submit-lead.js`
to emit OpenTelemetry logs, pulling five `@opentelemetry/*` packages into the
lambda that handles lead submissions.

- **Consent gating added.** PostHog initialises with `opt_out_capturing_by_default`
  and `persistence: 'memory'`, so nothing is captured and no identifier is stored
  until the visitor allows analytics. The banner calls `bgsApplyPostHogConsent()`
  on both accept and decline. PostHog does not read Google Consent Mode, so it is
  driven directly.
- **Production guard added**, matching GA4 — nothing ships in dev or preview.
- **Exception capture disabled.** The wizard enabled unhandled error and rejection
  capture; error text can carry page data, so it is off until someone decides it
  is wanted.
- **Lead function reverted.** OpenTelemetry in a lambda on the revenue path is
  real cold-start cost for log lines Netlify already captures from `console`.
  If server-side events are wanted later, `posthog-node` is far lighter.
- **Dependencies removed.** All five OTel packages and `posthog-js` — the
  component uses PostHog's inline snippet, so nothing imported the npm package.

Kept from the wizard: the `posthog.capture()` calls on the contact form, CTA form
and newsletter form. They are guarded with `window.posthog?.` and are no-ops while
opted out.
