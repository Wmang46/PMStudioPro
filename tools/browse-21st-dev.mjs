/**
 * browse-21st-dev.mjs — Screenshot 21st.dev component pages for evaluation
 *
 * Usage:
 *   node tools/browse-21st-dev.mjs                    # Screenshot all curated picks
 *   node tools/browse-21st-dev.mjs <url> [name]       # Screenshot a specific component
 *   node tools/browse-21st-dev.mjs --category heros   # Screenshot a category listing
 *
 * Output: .tmp/21st-dev/picks/*.png
 */
import puppeteer from 'puppeteer';
import { mkdir } from 'fs/promises';

const outputDir = '.tmp/21st-dev/picks';
await mkdir(outputDir, { recursive: true });

// Curated picks for PMStudioPro portfolio
const curatedPicks = [
  { name: 'testimonial-card-serafim', url: 'https://21st.dev/serafimcloud/testimonial-card' },
  { name: 'testimonial-card-hextaui', url: 'https://21st.dev/preetsuthar17/testimonial-card' },
  { name: 'animated-shader-hero', url: 'https://21st.dev/community/components/ravikatiyar162/animated-shader-hero' },
  { name: 'hero-pill', url: 'https://21st.dev/Codehagen/hero-pill/default' },
  { name: 'backgrounds-listing', url: 'https://21st.dev/community/components/s/background' },
  { name: 'shaders-listing', url: 'https://21st.dev/community/components/s/shader' },
  { name: 'features-listing', url: 'https://21st.dev/community/components/s/features' },
];

let targets;
const args = process.argv.slice(2);

if (args[0] === '--category') {
  targets = [{ name: args[1], url: `https://21st.dev/community/components/s/${args[1]}` }];
} else if (args[0]?.startsWith('http')) {
  targets = [{ name: args[1] || 'custom', url: args[0] }];
} else {
  targets = curatedPicks;
}

const browser = await puppeteer.launch({ headless: true });
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });

for (const { name, url } of targets) {
  console.log(`Capturing ${name}...`);
  try {
    await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });
    await new Promise(r => setTimeout(r, 3000));
    await page.screenshot({ path: `${outputDir}/${name}.png`, fullPage: false });
    console.log(`  -> ${outputDir}/${name}.png`);
  } catch (e) {
    console.log(`  Error: ${e.message.substring(0, 80)}`);
  }
}

await browser.close();
console.log('\nDone.');
