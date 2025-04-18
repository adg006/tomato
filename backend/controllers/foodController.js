import foodModel from "../models/foodModel.js";
import fs from "fs";

// Function to add food item
const addFood = async (req, res) => {
  let image_filename = `${req.file.filename}`;

  const food = new foodModel({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    image: image_filename,
    category: req.body.category,
  });

  try {
    await food.save();
    res.json({ success: true, message: "Food added successfully" });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to add food",
      error: error.message,
    });
  }
};

// Function to list all food items
const listFood = async (req, res) => {
  try {
    const foods = await foodModel.find({});
    res.json({ success: true, data: foods });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch food items",
      error: error.message,
    });
  }
};

// Function to remove food item
const removeFood = async (req, res) => {
  const foodId = req.body.id;

  try {
    const foodItem = await foodModel.findById(foodId);
    fs.unlink(`uploads/${foodItem.image}`, () => {});
    await foodModel.findByIdAndDelete(foodId);
    res.json({ success: true, message: "Food item removed successfully" });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to remove food item",
      error: error.message,
    });
  }
};

export { addFood, listFood, removeFood };
