import "dotenv/config";

import { connectDB } from "../config/db.js";

import foodModel from "../models/foodModel.js";

await connectDB();

const foods = await foodModel.find({ image: { $regex: "/food/" } });
let updated = 0;

for (const food of foods) {
  const next = food.image.replace("/food/", "/tomato-food-images/");
  if (next !== food.image) {
    food.image = next;
    await food.save();
    updated += 1;
  }
}

console.log({ matched: foods.length, updated, sample: foods[0]?.image });
process.exit(0);
