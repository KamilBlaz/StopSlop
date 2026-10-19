import assert from 'node:assert/strict';
import { readFileSync, statSync } from 'node:fs';

const root = new URL('../', import.meta.url);
const html = readFileSync(new URL('index.html', root), 'utf8');
const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]);
assert.equal(new Set(ids).size, ids.length, 'HTML IDs must be unique.');

let checked = 0;
for (const [, reference] of html.matchAll(/\b(?:src|href)="([^"]*)"/g)) {
  if (/^(?:[a-z][a-z\d+.-]*:|\/\/)/i.test(reference)) continue;
  assert(!reference.startsWith('/'), `Use a relative URL for GitHub Pages: ${reference}`);
  if (reference.startsWith('#')) {
    const fragment = reference.slice(1);
    assert(!fragment || ids.includes(fragment), `Missing fragment target: ${reference}`);
  } else if (reference) {
    const target = new URL(reference.split(/[?#]/)[0], root);
    assert(statSync(target).isFile(), `Missing local file: ${reference}`);
  }
  checked += 1;
}

console.log(`Validated ${checked} local references and ${ids.length} unique IDs.`);
