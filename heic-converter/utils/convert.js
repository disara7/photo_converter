import fs from "fs/promises";
import path from "path";
import heicConvert from "heic-convert";
import { UPLOADS_DIR, CONVERTED_DIR } from "../config.js";

async function logToFile(message) {
  const logPath = path.resolve("logs/conversion.log");
  const line = `[${new Date().toISOString()}] ${message}\n`;
  await fs.appendFile(logPath, line).catch(() => {});
}

export async function convertAllHEIC(toFormat = "jpeg") {
  try {
    const files = await fs.readdir(UPLOADS_DIR);
    const heicFiles = files.filter((f) => f.toLowerCase().endsWith(".heic"));

    await fs.mkdir(CONVERTED_DIR, { recursive: true });
    await fs.mkdir("logs", { recursive: true });

    if (heicFiles.length === 0) {
      console.log("⚠️ No HEIC files found in uploads folder.");
      await logToFile("No HEIC files found in uploads folder.");
      return { message: "No HEIC files found in uploads folder." };
    }

    const validFormats = ["jpeg", "png"];
    const format = validFormats.includes(toFormat.toLowerCase())
      ? toFormat.toLowerCase()
      : "jpeg";

    console.log(
      `🖼 Found ${heicFiles.length} HEIC files → ${format.toUpperCase()}`
    );
    await logToFile(
      `Starting batch conversion: ${heicFiles.length} files to ${format}`
    );

    const start = Date.now();
    const results = [];

    const MAX_PARALLEL = 4;
    const batches = [];
    for (let i = 0; i < heicFiles.length; i += MAX_PARALLEL) {
      batches.push(heicFiles.slice(i, i + MAX_PARALLEL));
    }

    for (const batch of batches) {
      const conversions = batch.map(async (file) => {
        const inputPath = path.join(UPLOADS_DIR, file);
        const outputFileName = file.replace(/\.heic$/i, `.${format}`);
        const outputPath = path.join(CONVERTED_DIR, outputFileName);

        try {
          console.log(`🔄 Converting: ${file}`);
          const inputBuffer = await fs.readFile(inputPath);

          const outputBuffer = await heicConvert({
            buffer: inputBuffer,
            format: format.toUpperCase(),
            quality: 1.0,
          });

          await fs.writeFile(outputPath, outputBuffer);
          console.log(`✅ Done: ${outputFileName}`);
          await logToFile(`Converted: ${file} → ${outputFileName}`);
          results.push({ file: outputFileName, status: "converted" });
        } catch (err) {
          console.error(`❌ Failed to convert ${file}: ${err.message}`);
          await logToFile(`Error converting ${file}: ${err.message}`);
          results.push({ file, status: "error", error: err.message });
        }
      });

      await Promise.all(conversions);
    }

    const duration = ((Date.now() - start) / 1000).toFixed(2);
    console.log(`🏁 Completed in ${duration}s`);
    await logToFile(`Batch completed in ${duration}s`);

    return results;
  } catch (err) {
    console.error("🚨 Fatal Error:", err.message);
    await logToFile(`Fatal error: ${err.message}`);
    throw err;
  }
}
