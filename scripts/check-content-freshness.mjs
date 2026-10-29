#!/usr/bin/env node
/**
 * Content freshness guard.
 *
 * Catches the failure mode that produced two dead-year titles: a post ships with
 * the current year in its title, the year turns over, and nothing flags it.
 * Run in CI or before a deploy — `npm run check:freshness`.
 */
const posts = (await import('../src/data/posts.js')).default;

const now = new Date();
const CURRENT_YEAR = now.getFullYear();
const STALE_AFTER_DAYS = 365;

const deadYear = [];
const expiringYear = [];
const stale = [];

for (const p of posts) {
  const m = p.title.match(/\b(20\d{2})\b/);
  if (m) {
    const year = Number(m[1]);
    if (year < CURRENT_YEAR) deadYear.push({ ...p, year });
    else if (year === CURRENT_YEAR) expiringYear.push({ ...p, year });
  }
  const latest = p.dateModified ?? p.datePublished;
  const age = Math.round((now - new Date(latest)) / 864e5);
  if (age > STALE_AFTER_DAYS) stale.push({ ...p, age });
}

console.log(`posts: ${posts.length}`);
console.log(`dead year in title: ${deadYear.length}`);
deadYear.forEach(p => console.log(`  [${p.year}] ${p.slug}`));
console.log(`titles carrying ${CURRENT_YEAR} (dead on 1 Jan): ${expiringYear.length}`);
expiringYear.forEach(p => console.log(`  ${p.slug}`));
console.log(`not updated in ${STALE_AFTER_DAYS}d: ${stale.length}`);
stale.sort((a, b) => b.age - a.age).slice(0, 10).forEach(p => console.log(`  ${p.age}d  ${p.slug}`));

if (deadYear.length) {
  console.error(`\nFAIL: ${deadYear.length} post(s) have a past year in the title.`);
  process.exit(1);
}
console.log('\nOK: no dead-year titles.');
