import mongoose, { Schema } from "mongoose";

const transactionSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    book: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book",
      required: true,
    },
    issueDate: {
      type: Date,
      required: true,
    },
    returnDate: {
      type: Date,
    },
    rent: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

export const Transaction = mongoose.model("Transaction", transactionSchema);
