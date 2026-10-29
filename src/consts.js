/**
 * Single source of truth for site-wide constants.
 * Previously the production URL was hardcoded inside Layout.astro, which meant
 * it could not be shared with the sitemap integration or the structured data.
 */
// The live site serves on the apex host; www 301-redirects to it. Canonicals,
// sitemap URLs and schema @ids must name the host that actually answers 200,
// otherwise every canonical points at a redirect.
export const SITE_URL = 'https://bgstech.ae';

export const SITE_NAME = 'BGS Technologies';

export const DEFAULT_TITLE = 'BGS Technologies — Full-Service Marketing Agency | Dubai';

export const DEFAULT_DESCRIPTION =
  'BGS Technologies is a world-class full-service marketing agency based in Dubai. We deliver performance marketing, branding, web, AI services, and more — globally.';

export const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.png`;

/** Social profiles used for schema.org sameAs and the footer social links. */
export const SOCIAL_PROFILES = {
  linkedin: 'https://www.linkedin.com/company/bgs-technologies',
  instagram: 'https://www.instagram.com/bgstechnologies',
};

export const ORG = {
  telephone: '+971521456818',
  email: 'hello@bgstech.ae',
  streetAddress: '205, Damas Tower, 2nd Al Maktoum Road, Riggat Al Buteen',
  addressLocality: 'Deira, Dubai',
  addressCountry: 'AE',
  legalName: 'BGS Technologies L.L.C-FZ',
};

/** Absolute URL for a site-relative path, with the trailing slash canonicals use. */
export function absoluteUrl(pathname) {
  const clean = pathname.endsWith('/') ? pathname : `${pathname}/`;
  return new URL(clean, SITE_URL).href;
}
