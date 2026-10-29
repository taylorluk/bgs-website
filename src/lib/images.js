/**
 * Remote images (Unsplash) are served with explicit `w` and `h` query params,
 * so their intrinsic size is already known at build time. Reading it back lets
 * every <img> carry width/height and reserve its box before it loads.
 */
const FALLBACK = { width: 1200, height: 630 };

export function imageDims(url, fallback = FALLBACK) {
  if (typeof url !== 'string') return fallback;
  const w = url.match(/[?&]w=(\d+)/);
  const h = url.match(/[?&]h=(\d+)/);
  if (!w || !h) return fallback;
  return { width: Number(w[1]), height: Number(h[1]) };
}
