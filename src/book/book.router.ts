import { Router } from "express";
import { createBook } from "./book.controller.js";
import multer from "multer";

const bookRouter = Router();

const   upload = multer({
    dest: "public/uploads/",
    limits: {
        fileSize: 20 * 1024 * 1024, // 20MB
    },

})


bookRouter.post(
  "/books",
  upload.fields([
    { name: "coverImage", maxCount: 1 },
    { name: "file", maxCount: 1 },
  ]),
  createBook
);




export default bookRouter;