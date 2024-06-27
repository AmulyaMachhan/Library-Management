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

export const searchBooksByName = asyncHandler(async (req, res) => {
  const { query } = req.query;

  try {
    const books = await Book.find({ name: { $regex: query, $options: "i" } });
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export const searchBooksByRent = asyncHandler(async (req, res) => {
  const min = parseFloat(req.query.min) || 0;
  const max = parseFloat(req.query.max) || Number.MAX_SAFE_INTEGER;

  try {
    const books = await Book.find({ rentPerDay: { $gte: min, $lte: max } });
    res.status(200).json(books.sort((a, b) => a.rentPerDay - b.rentPerDay));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export const globalBookSearch = asyncHandler(async (req, res) => {
  const { category, query } = req.query;
  const min = parseFloat(req.query.min) || 0;
  const max = parseFloat(req.query.max) || Number.MAX_SAFE_INTEGER;

  try {
    const books = await Book.find({
      category: category,
      name: { $regex: query, $options: "i" },
      rentPerDay: { $gte: min, $lte: max },
    });
    res.status(200).json(books.sort((a, b) => a.rentPerDay - b.rentPerDay));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
