import mongoose, { model, Model, models, Schema } from "mongoose";

const programSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  type: { type: String, enum: ["training", "nutrition"] },
  request: { type: mongoose.Schema.Types.ObjectId, ref: "Request" },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

export default mongoose.models.Program || model("Program", programSchema);
