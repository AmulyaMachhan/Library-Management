import express from "express";
import {
  getAllBooks,
  getAllCategories,
  globalBookSearch,
  searchBooksByName,
  searchBooksByRent,
} from "../controllers/book.controller.js";

const router = express.Router();

router.route("/allbooks").get(getAllBooks);
router.route("/search/name").get(searchBooksByName);
router.route("/search/rent").get(searchBooksByRent);
router.route("/search/global").get(globalBookSearch);

router.route("/categories").get(getAllCategories);

export default router;
