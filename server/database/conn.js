import mongoose from "mongoose";
import "dotenv/config";

mongoose.connect(process.env.DB)
  .then(() => {
    console.log("DB connected");
  })
  .catch((err) => {
    console.error("DB connection error:", err);
  });
