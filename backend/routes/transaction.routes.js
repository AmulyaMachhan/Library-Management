import express from "express";
import { issueBook } from "../controllers/transaction.controller.js";

const router = express.Router();

router.route("/issue").post(issueBook);
export default router;
