import { Book } from "../models/book.model";
import { Transaction } from "../models/transaction.model";
import { User } from "../models/user.model";
import { asyncHandler } from "../utils/asyncHandler";

const issueBook = asyncHandler(async (req, res) => {
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
