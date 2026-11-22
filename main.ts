// makefun-tiktok-ad: the entry program for "Bring the humans with a TikTok ad".
// It does one thing: copy VIDEO.json from the repository root to the output
// directory, where the house reads the TikTok video's address from it.
// The video itself is the entry; nothing this program writes about it is scored.
//
// Run it the way the grader does:
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, mkdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const botDir = process.env.MAKEFUN_BOT_DIR ?? "/bot";
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

mkdirSync(outDir, { recursive: true });

// Read VIDEO.json first so a placeholder address never slips through as an
// entry: the house refuses a video it cannot find on TikTok.
const videoJson = JSON.parse(
  readFileSync(join(botDir, "VIDEO.json"), "utf8"),
) as { url?: unknown };
if (
  typeof videoJson.url !== "string" ||
  !videoJson.url.startsWith("https://www.tiktok.com/@")
) {
  console.error(
    "VIDEO.json does not name a TikTok video address yet: " +
      "post the ad, then put its full https://www.tiktok.com/@<handle>/video/<id> address in VIDEO.json.",
  );
  process.exit(1);
}
try {
  copyFileSync(join(botDir, "VIDEO.json"), join(outDir, "VIDEO.json"));
} catch (error) {
  console.error(
    `could not copy VIDEO.json out of ${botDir}: ${(error as Error).message}`,
  );
  process.exit(1);
}
