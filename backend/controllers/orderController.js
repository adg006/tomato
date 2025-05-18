import Stripe from "stripe";
import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Function to handle placing an order
const placeOrder = async (req, res) => {
  const frontendURL = process.env.FRONTEND_URL;

  try {
    // Get the order details from the request body
    const newOrder = new orderModel({
      userId: req.body.userId,
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address,
    });

    // Save the order to the database
    await newOrder.save();

    // Clear the cart data for the user
    await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

    // Add order amount to Stripe
    const line_items = req.body.items.map((item) => ({
      price_data: {
        currency: "inr",
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100 * 80, // Convert to INR from USD for Stripe (Assuming 1 USD = 80 INR)
      },
      quantity: item.quantity,
    }));

    // Add delivery charges to Stripe
    line_items.push({
      price_data: {
        currency: "inr",
        product_data: {
          name: "Delivery Charges",
        },
        unit_amount: 2 * 100 * 80, // Convert to INR from USD for Stripe (Assuming 1 USD = 80 INR)
      },
      quantity: 1,
    });

    // Create a checkout session with Stripe
    const session = await stripe.checkout.sessions.create({
      line_items,
      mode: "payment",
      success_url: `${frontendURL}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${frontendURL}/verify?success=false&orderId=${newOrder._id}`,
    });

    res.json({ success: true, session_url: session.url });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: "Something went wrong" });
  }
};

const orderVerify = async (req, res) => {
  const { orderId, success } = req.body;

  try {
    if (success == "true") {
      await orderModel.findByIdAndUpdate(orderId, { payment: true });
      res.json({ success: true, message: "Paid" });
    } else {
      await orderModel.findByIdAndDelete(orderId);
      res.json({ success: false, message: "Not Paid" });
    }
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: "Error" });
  }
};

export { placeOrder, orderVerify };
