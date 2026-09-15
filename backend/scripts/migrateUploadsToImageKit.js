import "dotenv/config";

import fs from "fs";
import path from "path";

import { fileURLToPath } from "url";

import { connectDB } from "../config/db.js";
import { uploadToImageKit } from "../config/imagekit.js";

import foodModel from "../models/foodModel.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const uploadsDir = path.join(__dirname, "..", "uploads");

const migrate = async () => {
  await connectDB();

  const foods = await foodModel.find({});
  let migrated = 0;
  let skipped = 0;
  let missing = 0;

  for (const food of foods) {
    if (String(food.image).startsWith("http")) {
      console.log(`skip (already remote): ${food.name}`);
      skipped += 1;
      continue;
    }

    const localPath = path.join(uploadsDir, food.image);
    if (!fs.existsSync(localPath)) {
      console.warn(`missing file: ${food.image} (${food.name})`);
      missing += 1;
      continue;
    }

    const buffer = fs.readFileSync(localPath);
    const { url, fileId } = await uploadToImageKit({
      buffer,
      originalname: food.image,
      mimetype: "image/png",
    });

    food.image = url;
    food.imageFileId = fileId;
    await food.save();

    console.log(`migrated: ${food.name} -> ${url}`);
    migrated += 1;
  }

  console.log("\nDone:", { migrated, skipped, missing, total: foods.length });
  process.exit(0);
};

migrate().catch((error) => {
  console.error("Migration failed:", error);
  process.exit(1);
});
