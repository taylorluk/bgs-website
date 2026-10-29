/**
 * Internal linking, driven by topic clusters.
 *
 * Previously this matched on `category`. That failed because the blog had 16
 * categories for 32 posts, 11 of them holding a single post — so "related"
 * posts had to be filled by rotating through the catalogue, which produced
 * links that were even rather than relevant.
 *
 * Clusters (src/data/clusters.js) are hub-and-spoke groups anchored on the
 * service page that should rank commercially. Linking follows the cluster:
 *   spoke -> hub      (every post links to its service page)
 *   hub   -> spoke    (every service page links to its posts)
 *   spoke <-> spoke   (posts link within their own cluster)
 */
import { clusterBySlug, clusterByHub } from '../data/clusters.js';

function byNewest(a, b) {
  return (b.datePublished ?? '').localeCompare(a.datePublished ?? '');
}

/**
 * Sibling posts from the same cluster, rotated so inbound links spread evenly
 * instead of piling onto whichever post is newest.
 */
export function relatedPosts(post, allPosts, limit = 3) {
  const cluster = clusterBySlug[post.slug];
  const bySlug = Object.fromEntries(allPosts.map(p => [p.slug, p]));

  // Hub-and-spoke requires spoke -> pillar on every spoke, so the pillar always
  // takes the first slot when this post is not itself the pillar.
  const pillar = cluster?.pillar && cluster.pillar !== post.slug
    ? bySlug[cluster.pillar]
    : null;

  const siblings = cluster
    ? cluster.spokes
        .filter(s => s !== post.slug && s !== cluster.pillar)
        .map(s => bySlug[s])
        .filter(Boolean)
    : [];

  const start = cluster ? Math.max(0, cluster.spokes.indexOf(post.slug)) % Math.max(1, siblings.length) : 0;
  const rotated = [...siblings.slice(start), ...siblings.slice(0, start)];

  const withPillar = pillar ? [pillar, ...rotated] : rotated;
  if (withPillar.length >= limit) return withPillar.slice(0, limit);

  // Thin cluster: top up from the rest of the catalogue, rotating from this
  // post's position so no post is left without inbound links.
  const picked = [...withPillar];
  const all = allPosts.filter(p => p.slug !== post.slug);
  const i = allPosts.findIndex(p => p.slug === post.slug);
  for (const candidate of [...allPosts.slice(i + 1), ...allPosts.slice(0, i)]) {
    if (picked.length >= limit) break;
    if (candidate.slug !== post.slug && !picked.some(p => p.slug === candidate.slug)) {
      picked.push(candidate);
    }
  }
  return picked.slice(0, limit);
}

/** The hub service page for a post, plus adjacent services, for its "Related Services" row. */
export function servicesForPost(post, allServices, limit = 3) {
  const cluster = clusterBySlug[post.slug];
  const hub = cluster ? allServices.find(s => s.slug === cluster.hub) : null;

  const picked = hub ? [hub] : [];
  if (hub) {
    // Same pillar as the hub reads as genuinely adjacent (Marketing / Technology / AI).
    for (const s of allServices) {
      if (picked.length >= limit) break;
      if (s.slug !== hub.slug && s.pillar === hub.pillar) picked.push(s);
    }
  }
  for (const s of allServices) {
    if (picked.length >= limit) break;
    if (!picked.includes(s)) picked.push(s);
  }
  return picked.slice(0, limit);
}

/** The posts in the cluster this service page anchors. */
export function postsForService(service, allPosts, limit = 3) {
  const cluster = clusterByHub[service.slug];
  const bySlug = Object.fromEntries(allPosts.map(p => [p.slug, p]));

  const spokes = cluster
    ? cluster.spokes.map(s => bySlug[s]).filter(Boolean).sort(byNewest)
    : [];
  if (spokes.length >= limit) return spokes.slice(0, limit);

  const filler = allPosts.filter(p => !spokes.some(s => s.slug === p.slug)).sort(byNewest);
  return [...spokes, ...filler].slice(0, limit);
}

/** Cluster metadata for a post, used for labelling the related block. */
export function clusterFor(post) {
  return clusterBySlug[post.slug] ?? null;
}

/** The cluster's pillar post, if this post is a spoke of one. */
export function pillarFor(post) {
  const cluster = clusterBySlug[post.slug];
  if (!cluster?.pillar || cluster.pillar === post.slug) return null;
  return cluster.pillar;
}

/** True when this post IS its cluster's pillar. */
export function isPillar(post) {
  return clusterBySlug[post.slug]?.pillar === post.slug;
}

/** Every spoke of the cluster this pillar heads — for the pillar's contents block. */
export function spokesOfPillar(post, allPosts) {
  const cluster = clusterBySlug[post.slug];
  if (!cluster || cluster.pillar !== post.slug) return [];
  const bySlug = Object.fromEntries(allPosts.map(p => [p.slug, p]));
  return cluster.spokes
    .filter(s => s !== post.slug)
    .map(s => bySlug[s])
    .filter(Boolean)
    .sort((a, b) => (b.datePublished ?? '').localeCompare(a.datePublished ?? ''));
}
