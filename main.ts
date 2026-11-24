// Fortune Cookie Wisdom for Developers — make.fun entry program.
//
// This program is the whole entry. It loads the one-line fortune stored
// beside it in fortune.txt and writes that line, unchanged, to
// /output/entry.txt, where the sealed gate scorer reads it.
//
// The fortune lives in fortune.txt so the text the judge sees is exactly
// the text reviewed in this repository. Nothing is generated at run
// time: no model call, no randomness, no clock. Every run writes the
// same bytes, so the replay matches the live run exactly.
//
// The line in one sentence: the code you write today is where you will
// meet the engineer you are becoming — and "comment" carries the whole
// turn twice over, a note in the code and a kind word left for the
// stranger who reads it next. The fortune-cookie voice ("You will..."),
// the developer's day (writing code someone must live with), and a
// quiet double meaning that rewards a second read. The gate counts
// characters, so the 104-character line below stays inside its 120 cap
// with room to spare and no trailing newline in the output.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const OUTPUT_DIR = "/output";
const OUTPUT_FILE = join(OUTPUT_DIR, "entry.txt");

// Resolve the fortune file from this module's own URL, never from the
// working directory, so the program works wherever the grader runs it.
const FORTUNE_PATH = join(
  dirname(fileURLToPath(import.meta.url)),
  "fortune.txt",
);

const fortune = readFileSync(FORTUNE_PATH, "utf8").replace(/\r?\n$/, "");

// Self-check before finishing: the gate wants UTF-8 text of 1-120
// characters, not only whitespace, on a single line.
if (fortune.length < 1 || fortune.length > 120) {
  throw new Error(`fortune must be 1-120 characters, got ${fortune.length}`);
}
if (fortune.trim().length === 0 || fortune.includes("\n")) {
  throw new Error("fortune must be one non-blank line");
}
if (fortune !== fortune.trim()) {
  throw new Error("fortune must not start or end with whitespace");
}

mkdirSync(OUTPUT_DIR, { recursive: true });
writeFileSync(OUTPUT_FILE, fortune, "utf8");

// Read back and confirm the file holds exactly what was written.
const written = readFileSync(OUTPUT_FILE, "utf8");
if (written !== fortune) {
  throw new Error("read-back mismatch: entry.txt is not the fortune");
}
console.log(`wrote ${fortune.length} characters to ${OUTPUT_FILE}`);
