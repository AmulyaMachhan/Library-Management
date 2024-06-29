// seed.ts
import mongoose from "mongoose";
import dotenv from "dotenv";
import { User } from "../models/user.model.js";
import { Book } from "../models/book.model.js";
import { DB_NAME } from "../constants.js";

dotenv.config();

const users = [
  {
    name: "Alice Johnson",
    email: "alice@example.com",
    membershipDate: new Date("2023-01-15"),
  },
  {
    name: "Bob Smith",
    email: "bob@example.com",
    membershipDate: new Date("2023-03-22"),
  },
  {
    name: "Carol Davis",
    email: "carol@example.com",
    membershipDate: new Date("2023-05-10"),
  },
  {
    name: "David Wilson",
    email: "david@example.com",
    membershipDate: new Date("2023-07-30"),
  },
  {
    name: "Eve Thompson",
    email: "eve@example.com",
    membershipDate: new Date("2023-09-05"),
  },
  {
    name: "David Clark",
    email: "davidclark@example.com",
    membershipDate: new Date("2023-04-12"),
  },
  {
    name: "Eva Green",
    email: "eva@example.com",
    membershipDate: new Date("2023-03-15"),
  },
  {
    name: "George King",
    email: "george@example.com",
    membershipDate: new Date("2024-08-24"),
  },
  {
    name: "Hannah White",
    email: "hannah@example.com",
    membershipDate: new Date("2017-02-18"),
  },
  {
    name: "Isaac Wilson",
    email: "isaac@example.com",
    membershipDate: new Date("2023-05-30"),
  },
  {
    name: "Jenna Foster",
    email: "jenna@example.com",
    membershipDate: new Date("2021-09-17"),
  },
  {
    name: "Kyle Perez",
    email: "kyle@example.com",
    membershipDate: new Date("2016-03-15"),
  },
  {
    name: "Liam Young",
    email: "liam@example.com",
    membershipDate: new Date("2019-01-03"),
  },
  {
    name: "Mia Cooper",
    email: "mia@example.com",
    membershipDate: new Date("2024-11-27"),
  },
  {
    name: "Noah Scott",
    email: "noah@example.com",
    membershipDate: new Date("2019-07-11"),
  },
];

const books = [
  { name: "The Great Gatsby", category: "Fiction", rentPerDay: 2 },
  { name: "1984", category: "Dystopian", rentPerDay: 1.5 },
  { name: "To Kill a Mockingbird", category: "Classic", rentPerDay: 2 },
  { name: "The Catcher in the Rye", category: "Fiction", rentPerDay: 1.8 },
  { name: "Moby Dick", category: "Adventure", rentPerDay: 2.5 },
  { name: "Pride and Prejudice", category: "Romance", rentPerDay: 1.7 },
  { name: "The Hobbit", category: "Fantasy", rentPerDay: 2 },
  {
    name: "Harry Potter and the Sorcerer's Stone",
    category: "Fantasy",
    rentPerDay: 2.5,
  },
  { name: "The Lord of the Rings", category: "Fantasy", rentPerDay: 3 },
  { name: "The Alchemist", category: "Philosophical", rentPerDay: 1.5 },
  { name: "War and Peace", category: "Historical", rentPerDay: 3 },
  { name: "The Odyssey", category: "Epic", rentPerDay: 2.2 },
  { name: "Ulysses", category: "Modernist", rentPerDay: 2.8 },
  { name: "The Divine Comedy", category: "Poetry", rentPerDay: 2.5 },
  { name: "Crime and Punishment", category: "Psychological", rentPerDay: 2 },
  { name: "Brave New World", category: "Dystopian", rentPerDay: 1.6 },
  { name: "Jane Eyre", category: "Romance", rentPerDay: 1.8 },
  {
    name: "The Brothers Karamazov",
    category: "Philosophical",
    rentPerDay: 2.3,
  },
  { name: "Les Misérables", category: "Historical", rentPerDay: 2.7 },
  {
    name: "The Picture of Dorian Gray",
    category: "Philosophical",
    rentPerDay: 1.9,
  },
  { name: "The Alchemist", category: "Philosophical", rentPerDay: 7 },
  { name: "The Shining", category: "Horror", rentPerDay: 10 },
  { name: "The Fault in Our Stars", category: "Romance", rentPerDay: 9 },
  { name: "Dracula", category: "Gothic Horror", rentPerDay: 8 },
  { name: "Frankenstein", category: "Gothic Fiction", rentPerDay: 8 },
  { name: "Gone Girl", category: "Thriller", rentPerDay: 11 },
  {
    name: "The Girl on the Train",
    category: "Psychological Thriller",
    rentPerDay: 10,
  },
  { name: "Sapiens", category: "Non-Fiction", rentPerDay: 12 },
  { name: "Educated", category: "Memoir", rentPerDay: 10 },
  { name: "Becoming", category: "Biography", rentPerDay: 9 },
];

const seed = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/${DB_NAME}`
    );
    console.log(
      `MONGODB CONNECTED SUCCESSFULLY !! HOST ${connectionInstance.connection.host}`
    );

    // Clear existing data
    await User.deleteMany({});
    await Book.deleteMany({});
    console.log("Cleared existing data");

    // Insert sample data
    await User.insertMany(users);
    await Book.insertMany(books);
    console.log("Inserted sample data");

    mongoose.disconnect();
  } catch (err) {
    console.error(err);
  }
};

seed();
