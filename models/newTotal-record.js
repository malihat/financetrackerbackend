import mongoose from "mongoose";

const newTotalSchema = new mongoose.Schema({
    total: { type: Number, required: true } 
})

export const newTotalModel = mongoose.model("total", newTotalSchema);