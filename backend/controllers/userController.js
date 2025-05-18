import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";
import userModel from "../models/userModel.js";

// Function to create a JWT token
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

// Function to register a new user
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingEmail = await userModel.findOne({ email });

    // Check if the email already exists
    if (existingEmail) {
      return res.json({ success: false, message: "Email already exists." });
    }

    // Validate the email format
    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Please enter a valid email.",
      });
    }

    // Check if the password is strong
    if (password.length <= 8) {
      return res.json({
        success: false,
        message: "Password must be at least 8 characters long.",
      });
    }

    // Hashing the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user
    const newUser = await userModel({
      name,
      email,
      password: hashedPassword,
    });

    // Save the user to the database
    const user = await newUser.save();

    // Create a token for the user
    const token = createToken(user._id);

    res.json({
      success: true,
      message: "User registered successfully.",
      token,
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

// Function to login a user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userModel.findOne({ email });

    // Check if the user exists
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    // Validate the password
    const isMatch = await bcrypt.compare(password, user.password);

    // Check if the password is correct
    if (!isMatch) {
      return res.json({ success: false, message: "Invalid credentials." });
    }

    // Create a token for the user
    const token = createToken(user._id);
    return res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

export { loginUser, registerUser };
