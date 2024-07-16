import express from "express";
import {
  getAllTransactions,
  getBooksByDateInterval,
  getBooksRentedByUser,
  getTotalRentByBook,
  getTransactionsByBook,
  getUsersWithIssuedBook,
  issueBook,
  returnBook,
} from "../controllers/transaction.controller.js";

const router = express.Router();

router.route("/issue").post(issueBook);
router.route("/return").post(returnBook);

router.route("/book").get(getTransactionsByBook);
router.route("/book/rent").get(getTotalRentByBook);

router.route("/user/:userId").get(getBooksRentedByUser);
router.route("/users/book").get(getUsersWithIssuedBook);

router.route("/date").get(getBooksByDateInterval);

router.route("/alltransactions").get(getAllTransactions);

export default router;
