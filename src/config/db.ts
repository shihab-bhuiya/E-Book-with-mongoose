import mongoose from "mongoose";
import { config } from "./config.js";

const connectDB = async () => {
  try {
    mongoose.connection.on("connected", () => {
      console.log("Connected Database Successfully");
    });

    mongoose.connection.on("error", (err) => {
      console.log("Error in database connection:", err);
    });

    await mongoose.connect(config.dataBaseurl as string);
  } catch (err) {
    console.log("Error is:", err);
    process.exit(1);
  }
};

export default connectDB;