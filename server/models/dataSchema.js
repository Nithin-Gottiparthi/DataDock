import mongoose from "mongoose";

const dataSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        }
    }
);

const data = new mongoose.model("data", dataSchema);

export default data;
