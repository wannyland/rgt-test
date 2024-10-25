import { Router } from "express";
import booksRouter from "./books";

const indexRouter = Router();

indexRouter.use("/books", booksRouter);

module.exports = indexRouter;
