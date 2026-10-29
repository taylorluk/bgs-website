import type { APIRoute } from 'astro';
import posts from '../data/posts.js';
import services from '../data/services.js';
import clusters from '../data/clusters.js';
import { SITE_URL, SITE_NAME, ORG } from '../consts.js';

/**
 * /llms.txt — a curated map of the site for LLM consumers.
 *
 * Generated at build time so it cannot drift from the real content.
 *
 * Worth knowing: Google states llms.txt is NOT used by Google Search and
 * neither helps nor hurts rankings or AI Overviews visibility. It is published
 * here for non-Google AI systems that may read it, and carries no weight in
 * this site's Google strategy.
 */
export const GET: APIRoute = () => {
  const byHub = Object.fromEntries(clusters.map(c => [c.hub, c]));
  const bySlug = Object.fromEntries(posts.map(p => [p.slug, p]));

  const lines: string[] = [];
  lines.push(`# ${SITE_NAME}`);
  lines.push('');
  lines.push(
    `> ${ORG.legalName} is a full-service marketing, technology and AI agency based in ` +
    `${ORG.addressLocality}, UAE, serving clients in 15+ countries. Services span paid ` +
    `advertising, social media, SEO, branding, web and ecommerce development, CRM and ` +
    `marketing automation, and applied AI.`
  );
  lines.push('');

  lines.push('## Key pages');
  lines.push('');
  lines.push(`- [Services](${SITE_URL}/services): All ${services.length} marketing, technology and AI services.`);
  lines.push(`- [Our Work](${SITE_URL}/work): Client case studies and measured results.`);
  lines.push(`- [About](${SITE_URL}/about): Company background, values and approach.`);
  lines.push(`- [Offers](${SITE_URL}/offers): Current free trials and strategy-call offers.`);
  lines.push(`- [Contact](${SITE_URL}/contact): Enquiries and bookings.`);
  lines.push('');

  for (const cluster of clusters) {
    const hub = services.find(s => s.slug === cluster.hub);
    if (!hub) continue;
    lines.push(`## ${cluster.name}`);
    lines.push('');
    lines.push(`- [${hub.title}](${SITE_URL}/services/${hub.slug}): ${hub.metaDesc ?? hub.tagline}`);
    for (const slug of cluster.spokes) {
      const post = bySlug[slug];
      if (post) lines.push(`- [${post.title}](${SITE_URL}/blog/${slug}): ${post.excerpt}`);
    }
    lines.push('');
  }

  lines.push('## Facts');
  lines.push('');
  lines.push(`- Legal name: ${ORG.legalName}`);
  lines.push(`- Location: ${ORG.streetAddress}, ${ORG.addressLocality}, UAE`);
  lines.push(`- Contact: ${ORG.email} / ${ORG.telephone}`);
  lines.push(`- Full sitemap: ${SITE_URL}/sitemap-index.xml`);
  lines.push('');

  return new Response(lines.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
