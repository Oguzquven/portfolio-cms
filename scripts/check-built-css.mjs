import assert from 'node:assert/strict';
import { readdir, readFile } from 'node:fs/promises';

// Validate generated CSS: the minifier previously removed standard blur
// declarations while retaining Safari-only prefixes.
const assets = new URL('../dist/assets/', import.meta.url);
const files = (await readdir(assets)).filter(name => name.endsWith('.css'));
assert.ok(files.length, 'Production CSS is missing');
const css = (await Promise.all(files.map(name => readFile(new URL(name, assets), 'utf8')))).join('\n');

function backdropValues(className) {
  const rules = new RegExp(`\\.${className}\\s*\\{([^}]*)\\}`, 'g');
  return [...css.matchAll(rules)].flatMap(([, declarations]) => {
    const match = declarations.match(/(?:^|;)\s*backdrop-filter\s*:\s*([^;}]+)/);
    return match ? [match[1].trim()] : [];
  });
}

for (const name of ['hero__stats', 'hero__card', 'navbar--scrolled']) {
  assert.equal(backdropValues(name).at(-1), 'blur(14px)', `${name}: production blur differs from development`);
}
assert.equal(backdropValues('navbar__menu').at(-1), 'none', 'Navbar menu must not retain a blurred strip');
console.log('Production CSS parity checks passed (cards, navbar, menu).');
