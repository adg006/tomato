import mongoose from "mongoose";

export const connectDB = async () => {
  await mongoose
    .connect("mongodb+srv://root:root12345@tomato.kf2fsb6.mongodb.net/tomato")
    .then(() => {
      console.log("DB Connected");
    });
};
