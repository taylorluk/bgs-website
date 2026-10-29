/**
 * Topic clusters — hub-and-spoke, anchored on service pages.
 *
 * Derived from SERP-overlap testing (see docs/seo/cluster-plan.md). Every pair
 * of blog topics tested shared 0 of the top 10 results, so grouping posts into
 * broad editorial pillars would have been fiction. Instead each cluster is
 * anchored on the SERVICE page that should rank commercially, with posts as
 * spokes feeding it.
 *
 * This replaces `category` as the basis for internal linking. Categories stay
 * as display labels; clusters decide what links to what.
 */
const clusters = [
  {
    id: "arabic-seo",
    name: "Arabic & Bilingual Search",
    hub: "arabic-seo",
    spokes: [
      "arabic-seo-uae-ranking-both-languages",
    ],
  },
  {
    id: "ai-search",
    name: "AI Search & GEO",
    hub: "ai-search-optimisation",
    spokes: [
      "ai-search-optimisation-uae-brands-geo",
    ],
  },
  {
    id: "paid-ads",
    name: "Paid Advertising",
    pillar: "paid-advertising-uae-complete-guide",
    hub: "paid-advertising",
    spokes: [
      "paid-advertising-uae-complete-guide",
      "complete-meta-ads-strategy-uae-brands-2026",
      "tiktok-advertising-uae-complete-2026-guide",
      "4x-meta-ads-roas-without-increasing-budget",
      "google-ads-vs-meta-ads-uae-business-2026",
      "google-ads-smart-bidding-strategies-uae",
      "performance-marketing-metrics-uae-business-owners",
    ],
  },
  {
    id: "social",
    name: "Social & Video",
    hub: "social-media-management",
    spokes: [
      "2026-social-media-playbook-uae-businesses",
      "linkedin-advertising-uae-b2b-brands-complete-guide",
      "linkedin-b2b-lead-generation-uae",
      "video-marketing-strategy-uae-2025",
    ],
  },
  {
    id: "ai",
    name: "AI Marketing",
    hub: "ai-receptionist-chatbots",
    spokes: [
      "ai-search-optimisation-uae-brands-geo",
      "ai-chatbots-vs-human-agents-uae",
      "ai-receptionists-transforming-customer-service-dubai",
      "ai-generated-content-use-without-destroying-brand",
      "ai-tools-marketing-teams-2025",
    ],
  },
  {
    id: "branding",
    name: "Branding",
    hub: "branding-creative",
    spokes: [
      "brand-guidelines-uae-business-documentation",
      "brand-identity-mistakes-costing-you-customers",
      "rebranding-your-business-when-and-how",
      "building-brand-authority-crowded-market",
    ],
  },
  {
    id: "automation",
    name: "CRM & Automation",
    pillar: "marketing-automation-crm-uae-complete-guide",
    hub: "marketing-automation",
    spokes: [
      "marketing-automation-crm-uae-complete-guide",
      "gohighlevel-vs-hubspot-uae-smes",
      "whatsapp-automation-uae-businesses",
      "whatsapp-business-marketing-conversations-to-customers",
      "crm-automation-playbook-stop-losing-leads",
      "getting-started-marketing-automation-beginners-playbook",
      "email-marketing-automation-sequences",
    ],
  },
  {
    id: "conversion",
    name: "Conversion & Funnels",
    hub: "landing-pages-funnels",
    spokes: [
      "landing-page-design-principles-uae",
      "funnel-design-customer-journey-awareness-to-sale",
      "ecommerce-store-conversion-rate-1-percent-to-4-percent",
      "social-proof-reviews-testimonials-strategy",
    ],
  },
  {
    id: "local-seo",
    name: "Local SEO & Reputation",
    pillar: "dubai-seo-how-to-rank-local-searches",
    hub: "seo-local-search",
    spokes: [
      "arabic-seo-uae-ranking-both-languages",
      "dubai-seo-how-to-rank-local-searches",
      "local-seo-dubai-google-my-business",
      "restaurant-google-reviews-3-4-to-4-9-stars-8-weeks",
    ],
  },
  {
    id: "strategy",
    name: "Strategy & Market",
    pillar: "digital-marketing-dubai-what-actually-works-2026",
    hub: "content-marketing",
    spokes: [
      "marketing-agency-cost-dubai-pricing-guide",
      "digital-marketing-dubai-what-actually-works-2026",
      "how-to-build-marketing-budget-uae",
      "how-to-choose-digital-marketing-agency-dubai",
      "ramadan-marketing-uae-strategy-that-converts",
      "digital-marketing-trends-2025-year-in-review",
      "content-marketing-strategy-dubai-smes",
    ],
  },
];

export default clusters;

/**
 * slug -> the post's PRIMARY cluster.
 *
 * A post may appear as a spoke in more than one cluster (a local-SEO post is
 * relevant to both the SEO and the Arabic SEO service pages, for example). For
 * hub -> spoke linking that is correct and desirable. But a post has exactly
 * one home, so this keeps the FIRST cluster that claims it — clusters are
 * declared most-specific-first.
 */
export const clusterBySlug = clusters.reduce((acc, c) => {
  for (const slug of c.spokes) {
    if (!(slug in acc)) acc[slug] = c;
  }
  return acc;
}, {});

/** service slug -> the cluster it anchors. */
export const clusterByHub = Object.fromEntries(clusters.map(c => [c.hub, c]));
