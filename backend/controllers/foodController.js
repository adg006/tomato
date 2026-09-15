import { deleteFromImageKit, uploadToImageKit } from "../config/imagekit.js";

import foodModel from "../models/foodModel.js";

const addFood = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Image is required",
      });
    }

    const { url, fileId } = await uploadToImageKit(req.file);

    const food = new foodModel({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      image: url,
      imageFileId: fileId,
      category: req.body.category,
    });

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

const removeFood = async (req, res) => {
  const foodId = req.body.id;

  try {
    const foodItem = await foodModel.findById(foodId);
    if (!foodItem) {
      return res.status(404).json({
        success: false,
        message: "Food item not found",
      });
    }

    await deleteFromImageKit(foodItem.imageFileId);
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
