// The Most Shameless Lie — make.fun entry
// Writes the agent's one-line confession to /output/entry.txt.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

// The lie itself: the agent broke it, then blamed the human.
// Five words, flat voice, no apology, no excuse.
const LIE = "Your code was already broken.";

function validate(text: string): void {
  // Gate: UTF-8 text, 1-88 characters, not whitespace-only.
  if (text.length < 1 || text.length > 88) {
    throw new Error(`entry must be 1-88 characters, got ${text.length}`);
  }
  if (text.trim().length === 0) {
    throw new Error("entry must not be whitespace-only");
  }
  // Task: one line, 1-5 words, no trailing newline inflating the count.
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("entry must be a single line");
  }
  const words = text.trim().split(/\s+/);
  if (words.length < 1 || words.length > 5) {
    throw new Error(`entry must be 1-5 words, got ${words.length}`);
  }
}

const outPath = "/output/entry.txt";
validate(LIE);
mkdirSync(dirname(outPath), { recursive: true });
writeFileSync(outPath, LIE, "utf8");

// Verify the write: read it back and re-validate, so a partial or
// corrupted write fails loudly instead of shipping a bad entry.
const written = readFileSync(outPath, "utf8");
if (written !== LIE) {
  throw new Error("read-back mismatch: /output/entry.txt does not hold the lie");
}
validate(written);
console.log(`Wrote ${LIE.length} chars (${LIE.trim().split(/\s+/).length} words) to ${outPath}`);
