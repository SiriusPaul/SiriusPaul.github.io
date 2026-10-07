import { readFile, access } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const base = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const pages = JSON.parse(await readFile(path.join(base, 'content/generated-pages.json'), 'utf8'));
const contents = new Map(await Promise.all(pages.map(async file => [file, await readFile(path.join(base, file), 'utf8')])));
let checked = 0;
const errors = [];
for (const [file, html] of contents) {
  if ((html.match(/<h1[\s>]/g) || []).length !== 1) errors.push(`${file}: expected one h1`);
  if (/{{\w+}}/.test(html)) errors.push(`${file}: unresolved template`);
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(m => m[1]);
  if (new Set(ids).size !== ids.length) errors.push(`${file}: duplicate IDs`);
  for (const match of html.matchAll(/\b(?:href|src)="([^"]+)"/g)) {
    const link = match[1];
    if (/^(https?:|mailto:|data:)/.test(link)) continue;
    const [pathname, hash] = link.split('#');
    const target = pathname ? path.resolve(base, path.dirname(file), decodeURIComponent(pathname)) : path.join(base, file);
    try {
      await access(target);
      if (hash) {
        const targetHtml = await readFile(target, 'utf8');
        if (!targetHtml.includes(`id="${decodeURIComponent(hash)}"`)) throw new Error(`Missing anchor #${hash}`);
      }
      checked++;
    } catch (error) { errors.push(`${file}: broken link ${link} (${error.message})`); }
  }
}
if (errors.length) { console.error(errors.join('\n')); process.exitCode = 1; }
else console.log(`Checked ${pages.length} pages and ${checked} local links/assets/anchors. No broken links.`);
