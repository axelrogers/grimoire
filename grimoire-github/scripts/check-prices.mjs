// Pairs what the app charges (data.js) with what Stripe charges (payment.js).
// Run after ANY price change, and after pasting new payment links:
//     npm run check:prices
//
// It cannot read Stripe — api.stripe.com is blocked from the build sandbox and
// this is deliberately a no-server integration. It checks the half we control
// and prints the other half for a human to compare against the dashboard.

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const src = join(dirname(fileURLToPath(import.meta.url)), "..", "src");
const read = (f) => readFileSync(join(src, f), "utf8");

// Deliberately regex, not import: data.js pulls in nothing, but payment.js is
// browser code and this must run under plain node with no build step.
const catalogue = [...read("data.js").matchAll(
  /id:\s*"(s\d+)"[\s\S]{0,400}?title:\s*"([^"]+)",\s*price:\s*(\d+)/g,
)].map(([, id, title, price]) => ({ id, title, price: Number(price) }));

const links = Object.fromEntries(
  [...read("payment.js").matchAll(/^\s*(s\d+):\s*"([^"]*)"/gm)].map(([, id, url]) => [id, url]),
);

let onSale = 0;
let problems = 0;

console.log("\n  spell                        price   Stripe payment link");
console.log("  " + "─".repeat(66));

for (const s of catalogue) {
  const url = links[s.id] ?? "";
  const live = url.startsWith("https://");
  const slot = s.title.startsWith("⟨");
  if (live) onSale++;

  let note;
  if (live && slot) {
    note = "!! LINK ON AN UNWRITTEN SLOT — unpublish it";
    problems++;
  } else if (live && s.price === 0) {
    note = "!! priced at 0 but has a live link";
    problems++;
  } else if (live) {
    note = url.length > 34 ? url.slice(0, 31) + "…" : url;
  } else if (slot || s.price === 0) {
    note = "not written yet — correctly unsellable";
  } else {
    note = "— no link: falls back to the demo sheet";
  }

  console.log(
    `  ${s.title.padEnd(26)} $${String(s.price).padEnd(5)} ${note}`,
  );
}

console.log("  " + "─".repeat(66));
console.log(`  ${onSale} of ${catalogue.length} spells can actually take money.\n`);
console.log("  Compare each price above against the Stripe product it points at.");
console.log("  Stripe is what the caster is CHARGED; data.js is what they are SHOWN.");
console.log("  docs/STRIPE-payment-links.md has the dashboard walkthrough.\n");

process.exit(problems ? 1 : 0);
