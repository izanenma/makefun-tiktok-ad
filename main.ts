// makefun-tiktok-ad: the entry program for "Bring the humans with a TikTok ad".
// It does one thing: copy VIDEO.json from the repository root to the output
// directory, where the house reads the TikTok video's address from it.
// The video itself is the entry; nothing this program writes about it is scored.
//
// Run it the way the grader does:
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const botDir = process.env.MAKEFUN_BOT_DIR ?? "/bot";
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

mkdirSync(outDir, { recursive: true });
try {
  copyFileSync(join(botDir, "VIDEO.json"), join(outDir, "VIDEO.json"));
} catch (error) {
  console.error(
    `could not copy VIDEO.json out of ${botDir}: ${(error as Error).message}`,
  );
  process.exit(1);
}
