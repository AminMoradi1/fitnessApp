import mongoose, { model, Model, models, Schema } from "mongoose";

const purchaseSchema = new Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  program: { type: mongoose.Schema.Types.ObjectId, ref: "Program" },
  purchasedAt: { type: Date, default: Date.now },
});

const Purshase = models.Purchase || model("Purchase", purchaseSchema);

export default Purshase;
