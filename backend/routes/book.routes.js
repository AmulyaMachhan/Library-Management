import express from "express";
import {
  getAllBooks,
  searchBooksByName,
} from "../controllers/book.controller.js";

const router = express.Router();

router.route("/allbooks").get(getAllBooks);
router.route("/search/name").get(searchBooksByName);

export default router;
