import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(cors({ origin: process.env.CORS_ORIGIN, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ limit: "16kb", extended: true }));
app.use(express.static("public"));
app.use(cookieParser());

//Routes Import
import userRouter from "./routes/user.routes.js";
import bookRouter from "./routes/book.routes.js";

//Routes Declaration
app.use("/api/v1/users", userRouter);
app.use("/api/v1/books", bookRouter);

export { app };
