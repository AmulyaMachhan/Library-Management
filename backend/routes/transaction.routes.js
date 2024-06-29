import express from "express";
import {
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

export default router;
