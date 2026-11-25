import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// PNG files always start with these 8 magic bytes.
const PNG_MAGIC = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);

const sourcePath = "./image.png";
let data;
try {
  data = readFileSync(sourcePath);
} catch (err) {
  if (err && err.code === "ENOENT") {
    console.error(`error: ${sourcePath} not found — run from the repo root, next to image.png`);
  } else {
    console.error(`error: cannot read ${sourcePath}: ${err.message}`);
  }
  process.exit(1);
}

if (data.length < 8 || !data.subarray(0, 8).equals(PNG_MAGIC)) {
  console.error(`error: ${sourcePath} is not a valid PNG file (bad magic bytes)`);
  process.exit(1);
}

const rawOutDir = process.env.MAKEFUN_OUTPUT_DIR;
const outDir = rawOutDir !== undefined && rawOutDir !== "" ? rawOutDir : "/output";
mkdirSync(outDir, { recursive: true });

const outPath = join(outDir, "entry.png");
writeFileSync(outPath, data);
console.log(`wrote ${data.length} bytes to ${outPath}`);
