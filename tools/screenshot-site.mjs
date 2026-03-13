/**
 * screenshot-site.mjs — Capture full-page screenshots of site pages
 * Usage: node tools/screenshot-site.mjs [baseUrl] [outputDir]
 * Defaults: https://pmstudiopro.com, .tmp/screenshots
 */
import puppeteer from 'puppeteer';
import { mkdir } from 'fs/promises';
import { join } from 'path';

const baseUrl = process.argv[2] || 'https://pmstudiopro.com';
const outputDir = process.argv[3] || '.tmp/screenshots';

const pages = [
  { path: '/', name: 'home' },
  { path: '/about/', name: 'about' },
  { path: '/contact/', name: 'contact' },
  { path: '/hot-topics/', name: 'hot-topics' },
];

await mkdir(outputDir, { recursive: true });

const browser = await puppeteer.launch({ headless: true });
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });

for (const { path, name } of pages) {
  const url = `${baseUrl}${path}`;
  console.log(`Capturing ${url}...`);
  await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });
  await page.screenshot({
    path: join(outputDir, `${name}.png`),
    fullPage: true,
  });
  console.log(`  -> ${name}.png`);
}

await browser.close();
console.log(`\nDone. Screenshots saved to ${outputDir}/`);
