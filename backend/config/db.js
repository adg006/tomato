import dns from "dns";
import mongoose from "mongoose";

// Windows DNS often refuses MongoDB SRV lookups; use public resolvers
dns.setServers(["8.8.8.8", "1.1.1.1"]);

const mongoUri =
  process.env.MONGODB_URI ||
  "mongodb+srv://root:root12345@tomato.kf2fsb6.mongodb.net/tomato";

export const connectDB = async () => {
  try {
    await mongoose.connect(mongoUri, { family: 4 });
    console.log("DB Connected");
  } catch (error) {
    console.error("DB connection failed:", error.message);
  }
};
