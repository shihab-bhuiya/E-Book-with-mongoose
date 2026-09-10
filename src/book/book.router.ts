import { Router } from "express";
import { createBook } from "./book.controller.js";
import multer from "multer";

const bookRouter = Router();

const   upload = multer({
    dest: "uploads/",
    limits: {
        fileSize: 20 * 1024 * 1024, // 10MB
    },

})


bookRouter.post("/books", upload.single("file"), createBook);




export default bookRouter;