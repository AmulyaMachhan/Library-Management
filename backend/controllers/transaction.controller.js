import { User } from "../models/user.model.js";
import { Book } from "../models/book.model.js";
import { Transaction } from "../models/transaction.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const issueBook = asyncHandler(async (req, res) => {
  const { bookName, userId, issueDate } = req.body;

  try {
    // Validate user
    const user = await User.findById(userId);
    if (!user) return res.status(400).json({ message: "User not found" });

    // Find the book
    const book = await Book.findOne({ name: bookName });
    if (!book) return res.status(400).json({ message: "Book not found" });

    // Check if the book is already issued and not returned
    const existingTransaction = await Transaction.findOne({
      bookId: book._id,
      returnDate: null,
    });

    // Create transaction
    const transaction = new Transaction({
      bookId: book._id,
      userId: user._id,
      issueDate: new Date(issueDate),
    });

    if (existingTransaction)
      return res.status(400).json({ message: "Book is already issued" });

    await transaction.save();
    res.status(201).json({ message: "Book issued successfully", transaction });
  } catch (error) {
    res.status(500).json({ message: err.message });
  }
});

export const returnBook = asyncHandler(async (req, res) => {
  const { bookName, userId, returnDate } = req.body;

  try {
    // Validate user
    const user = await User.findById(userId);
    if (!user) return res.status(400).json({ message: "User not found" });

    // Find the book
    const book = await Book.findOne({ name: bookName });
    if (!book) return res.status(400).json({ message: "Book not found" });

    // Find the transaction where the book is issued to the user and not yet returned
    const transaction = await Transaction.findOne({
      bookId: book._id,
      userId: user._id,
      returnDate: null,
    });

    if (!transaction)
      return res.status(400).json({
        message: "No active transaction found for this book and user",
      });

    // Calculate rent
    const issue = new Date(transaction.issueDate);
    const returnD = new Date(returnDate);
    const diffTime = Math.abs(returnD.getTime() - issue.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const rent = diffDays * book.rentPerDay;

    // Update transaction
    transaction.returnDate = returnD;
    transaction.rent = rent;
    await transaction.save();

    res.json({ message: "Book returned successfully", rent });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export const getTransactionsByBook = asyncHandler(async (req, res) => {
  const { bookName } = req.query;

  try {
    const book = await Book.findOne({ name: bookName });
    if (!book) return res.status(400).json({ message: "Book not found" });

    const transactions = await Transaction.find({ bookId: book._id }).populate(
      "userId"
    );

    const totalCount = transactions.length;
    const currentTransaction = transactions.find((t) => !t.returnDate);
    const status = currentTransaction
      ? { currentlyIssuedTo: currentTransaction.userId.name }
      : { status: "Not issued currently" };

    res.status(200).json({ totalCount, status });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export const getTotalRentByBook = asyncHandler(async (req, res) => {
  const { bookName } = req.query;

  try {
    const book = await Book.findOne({ name: bookName });
    if (!book) return res.status(400).json({ message: "Book not found" });

    const transactions = await Transaction.find({
      bookId: book._id,
    });

    const totalRent = transactions.reduce(
      (sum, txn) => sum + (txn.rent || 0),
      0
    );

    res.status(200).json({ bookName: book.name, totalRent });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export const getBooksRentedByUser = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(400).json({ message: "User not found" });

    const transactions = await Transaction.find({ userId: user._id }).populate(
      "bookId"
    );

    const booksIssued = transactions.map((txn) => ({
      bookName: txn.bookId.name,
      issueDate: txn.issueDate,
      returnDate: txn.returnDate,
    }));

    res.status(200).json({ user: user.name, booksIssued });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export const getBooksByDateInterval = asyncHandler(async (req, res) => {
  const { start, end } = req.query;

  if (!start || !end)
    return res
      .status(400)
      .json({ message: "Start and end dates are required" });

  try {
    const startDate = new Date(start);
    const endDate = new Date(end);

    const transactions = await Transaction.find({
      issueDate: { $gte: startDate, $lte: endDate },
    })
      .populate("userId")
      .populate("bookId");

    const results = transactions.map((txn) => ({
      bookName: txn.bookId.name,
      userName: txn.userId.name,
      issueDate: txn.issueDate,
      returnDate: txn.returnDate,
    }));

    res.status(200).json(results);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export const getAllTransactions = asyncHandler(async (req, res) => {
  try {
    const transactions = await Transaction.find()
      .populate("userId")
      .populate("bookId");
    res.json(transactions?.sort((a, b) => b.returnDate - a.returnDate));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export const getUsersWithIssuedBook = asyncHandler(async (req, res) => {
  const { bookName } = req.query;

  try {
    const book = await Book.findOne({ name: bookName });
    if (!book) return res.status(400).json({ message: "Book not found" });

    const transactions = await Transaction.find({
      bookId: book._id,
      returnDate: null,
    }).populate("userId");

    const usersWithIssuedBook = transactions.map((txn) => ({
      userId: txn.userId._id,
      userName: txn.userId.name,
      issueDate: txn.issueDate,
    }));

    if (usersWithIssuedBook.length === 0) {
      return res
        .status(200)
        .json({ message: "No users currently have this book issued." });
    }

    // Return the list of users who have the book issued and not yet returned
    res.status(200).json(usersWithIssuedBook);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
