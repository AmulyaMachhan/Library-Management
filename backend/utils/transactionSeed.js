import mongoose from "mongoose";
import dotenv from "dotenv";
import { User } from "../models/user.model.js";
import { Book } from "../models/book.model.js";
import { Transaction } from "../models/transaction.model.js";
import { DB_NAME } from "../constants.js";

dotenv.config();

const populateTransactions = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/${DB_NAME}`
    );
    console.log(
      `MONGODB CONNECTED SUCCESSFULLY !! HOST ${connectionInstance.connection.host}`
    );
    // Fetch all books and users from the DB
    const books = await Book.find();
    const users = await User.find();

    if (!books.length || !users.length) {
      console.log("Please populate the books and users collections first.");
      return;
    }

    const transactions = [];

    // Generate 50 random transactions
    for (let i = 0; i < 50; i++) {
      const randomBook = books[Math.floor(Math.random() * books.length)];
      const randomUser = users[Math.floor(Math.random() * users.length)];
      const issueDate = new Date();
      const daysIssued = Math.floor(Math.random() * 30); // Random issue period up to 30 days
      const returnDate = new Date(issueDate);
      returnDate.setDate(issueDate.getDate() + daysIssued);

      const rentPerDay = randomBook.rentPerDay || 10; // Default rent per day if missing
      const totalRent = daysIssued * rentPerDay;

      // Create transaction entry
      const newTransaction = {
        bookId: randomBook._id,
        userId: randomUser._id,
        issueDate: issueDate,
        returnDate: returnDate,
        totalRent: totalRent,
      };

      transactions.push(newTransaction);
    }

    // Insert transactions into the DB
    await Transaction.insertMany(transactions);

    console.log("50 transactions successfully inserted!");
  } catch (error) {
    console.error("Error populating transactions:", error);
  } finally {
    mongoose.connection.close(); // Close DB connection when done
  }
};

// Run the script
populateTransactions();
