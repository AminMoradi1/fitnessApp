import { Schema, model, models } from "mongoose";

import mongoose from "mongoose";

const requestSchema = new Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  height: { type: Number, required: true },
  weight: { type: Number, required: true },
  experience: String,
  photo: String,
  type: { type: String, enum: ["training", "nutrition"], required: true }, // 🔥 اضافه شد
  extraQuestion: { type: Boolean },
  status: { type: String, enum: ["pending", "done"], default: "pending" },
  program: { type: mongoose.Schema.Types.ObjectId, ref: "Program" },
  createdAt: { type: Date, default: Date.now },
});

export default models.Request || model("Request", requestSchema);
