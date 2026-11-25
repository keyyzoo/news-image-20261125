import { copyFileSync, existsSync, mkdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const PNG_MAGIC: readonly number[] = [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a];

function main(): void {
  const source = "./image.png";
  if (!existsSync(source)) {
    throw new Error("image.png not found next to main.ts");
  }
  const bytes = readFileSync(source);
  if (bytes.length < PNG_MAGIC.length) {
    throw new Error("image.png is too small to be a PNG");
  }
  for (let i = 0; i < PNG_MAGIC.length; i++) {
    if (bytes[i] !== PNG_MAGIC[i]) {
      throw new Error("image.png does not start with the PNG magic bytes");
    }
  }
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  const dest = join(outDir, "entry.png");
  copyFileSync(source, dest);
  console.log(`Wrote ${dest} (${bytes.length} bytes)`);
}

main();
