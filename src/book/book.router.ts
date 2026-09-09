import { Router } from "express";
import { createBook } from "./book.controller.js";

const bookRouter = Router();


bookRouter.post("/books", createBook);


export default bookRouter;