import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const pages = ['courses','about','contact','help','privacy','terms'];

test('public informational pages expose unique descriptions and canonical paths', async () => {
  for (const page of pages) {
    const source = await readFile(new URL(`../app/${page}/page.tsx`, import.meta.url), 'utf8');
    assert.match(source, /description: '[^']{40,}'/, `${page} page should have a useful meta description`);
    assert.match(source, new RegExp(`canonical: '/${page}'`));
    assert.match(source, new RegExp(`openGraph: \\{ url: '/${page}' \\}`));
  }
});
