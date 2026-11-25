import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const PNG_SIGNATURE = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);

function hasValidPngSignature(bytes: Buffer): boolean {
  if (bytes.length < PNG_SIGNATURE.length) {
    return false;
  }
  return bytes.subarray(0, PNG_SIGNATURE.length).equals(PNG_SIGNATURE);
}

function main(): number {
  try {
    const scriptDir = dirname(fileURLToPath(import.meta.url));
    const inputPath = join(scriptDir, "image.png");
    const bytes = readFileSync(inputPath);

    if (!hasValidPngSignature(bytes)) {
      console.error(`Error: ${inputPath} does not have a valid PNG signature (expected 8-byte PNG signature, got ${bytes.length} bytes).`);
      return 1;
    }

    const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
    mkdirSync(outputDir, { recursive: true });

    const outputPath = join(outputDir, "entry.png");
    writeFileSync(outputPath, bytes);

    console.log(`Wrote ${outputPath} (${bytes.length} bytes)`);
    return 0;
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error(`Error: ${message}`);
    return 1;
  }
}

process.exitCode = main();
