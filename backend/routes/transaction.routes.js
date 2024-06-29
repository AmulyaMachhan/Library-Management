import express from "express";
import {
  getBooksByDateInterval,
  getBooksRentedByUser,
  getTotalRentByBook,
  getTransactionsByBook,
  issueBook,
  returnBook,
} from "../controllers/transaction.controller.js";

const router = express.Router();

router.route("/issue").post(issueBook);
router.route("/return").post(returnBook);

router.route("/book").get(getTransactionsByBook);
router.route("/book/rent").get(getTotalRentByBook);

router.route("/user/:userId").get(getBooksRentedByUser);

router.route("/date").get(getBooksByDateInterval);

export default router;
