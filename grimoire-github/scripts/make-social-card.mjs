// Renders social-card.html to public/social-card.png at 1200x630.
// Run from grimoire-github/:  node scripts/make-social-card.mjs
import { createRequire } from 'node:module';
const require = createRequire(process.env.PW_HOME || '/home/claude/.npm-global/lib/node_modules/playwright/');
const { chromium } = require('playwright');
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1200, height: 630 } });
await p.goto(new URL('../social-card.html', import.meta.url).href, { waitUntil: 'load' });
await p.waitForTimeout(900);
await p.screenshot({ path: new URL('../public/social-card.png', import.meta.url).pathname });
await b.close();
console.log('wrote public/social-card.png');
