import { Book } from "../models/book.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const getAllBooks = asyncHandler(async (req, res) => {
  try {
    const books = await Book.find();
    res.status(201).json(books);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
