/**
 * Schema.org JSON-LD builders.
 *
 * Every page previously shipped the same MarketingAgency object and nothing
 * else. These builders let each template contribute the markup that matches
 * what it actually renders (articles, services, FAQs, breadcrumbs).
 */
import { SITE_URL, SITE_NAME, ORG, SOCIAL_PROFILES, absoluteUrl } from '../consts.js';

/** Stable @id so other nodes can reference the organisation instead of repeating it. */
export const ORG_ID = `${SITE_URL}/#organization`;
export const SITE_ID = `${SITE_URL}/#website`;

export function organizationSchema(description) {
  return {
    '@type': 'MarketingAgency',
    '@id': ORG_ID,
    name: SITE_NAME,
    legalName: ORG.legalName,
    url: SITE_URL,
    logo: {
      '@type': 'ImageObject',
      url: `${SITE_URL}/logo.png`,
    },
    image: `${SITE_URL}/og-image.png`,
    description,
    telephone: ORG.telephone,
    email: ORG.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: ORG.streetAddress,
      addressLocality: ORG.addressLocality,
      addressCountry: ORG.addressCountry,
    },
    sameAs: Object.values(SOCIAL_PROFILES),
    areaServed: 'Worldwide',
  };
}

export function websiteSchema() {
  return {
    '@type': 'WebSite',
    '@id': SITE_ID,
    url: SITE_URL,
    name: SITE_NAME,
    publisher: { '@id': ORG_ID },
    inLanguage: 'en',
  };
}

/** items: [{ name, path }] in order, root first. */
export function breadcrumbSchema(items) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

/** faqs: [{ q, a }] — `a` may contain inline HTML. */
export function faqSchema(faqs) {
  return {
    '@type': 'FAQPage',
    mainEntity: faqs.map(f => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.a,
      },
    })),
  };
}

export function blogPostingSchema(post, path) {
  const url = absoluteUrl(path);
  return {
    '@type': 'BlogPosting',
    '@id': `${url}#article`,
    headline: post.title,
    description: post.excerpt,
    image: post.image,
    datePublished: post.datePublished,
    dateModified: post.dateModified ?? post.datePublished,
    articleSection: post.category,
    inLanguage: 'en',
    author: post.authorIsOrganization
      ? { '@id': ORG_ID }
      : {
          '@type': 'Person',
          name: post.author,
          ...(post.authorJobTitle ? { jobTitle: post.authorJobTitle } : {}),
          ...(post.authorUrl ? { url: post.authorUrl } : {}),
        },
    publisher: { '@id': ORG_ID },
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    isPartOf: { '@id': SITE_ID },
  };
}

export function serviceSchema(service, path) {
  const url = absoluteUrl(path);
  return {
    '@type': 'Service',
    '@id': `${url}#service`,
    name: service.title,
    serviceType: service.title,
    description: service.heroSub ?? service.tagline,
    provider: { '@id': ORG_ID },
    areaServed: [
      { '@type': 'Country', name: 'United Arab Emirates' },
      { '@type': 'City', name: 'Dubai' },
    ],
    url,
    ...(service.features?.length
      ? {
          hasOfferCatalog: {
            '@type': 'OfferCatalog',
            name: `${service.title} — what's included`,
            itemListElement: service.features.map(f => ({
              '@type': 'Offer',
              itemOffered: { '@type': 'Service', name: f.title, description: f.desc },
            })),
          },
        }
      : {}),
  };
}

export function collectionPageSchema({ name, description, path, items, itemPath }) {
  return {
    '@type': 'CollectionPage',
    name,
    description,
    url: absoluteUrl(path),
    isPartOf: { '@id': SITE_ID },
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: items.length,
      itemListElement: items.map((item, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        url: absoluteUrl(itemPath(item)),
        name: item.title,
      })),
    },
  };
}
