import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
  {
    text: { type: String, required: true },
    amount: { type: Number, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Transaction", transactionSchema);
