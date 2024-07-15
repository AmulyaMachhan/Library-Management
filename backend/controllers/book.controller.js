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
  let filter = {};

  if (req.query.min || req.query.max) {
    filter.rentPerDay = {
      $gte: req.query.min || 0,
      $lte: req.query.max || Number.MAX_SAFE_INTEGER,
    };
  }

  if (req.query.category) {
    filter.category = req.query.category;
  }

  if (req.query.name) {
    filter.name = { $regex: req.query.name, $options: "i" };
  }

  try {
    const books = await Book.find(filter);
    res.status(200).json(books.sort((a, b) => a.rentPerDay - b.rentPerDay));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export const getAllCategories = asyncHandler(async (req, res) => {
  try {
    const categories = await Book.distinct("category");
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
