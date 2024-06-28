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
      return res
        .status(400)
        .json({
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
