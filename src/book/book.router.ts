import { Router } from "express";

import multer from "multer";
// import authenticate from "../middleWare/authenticate.js";
import { createBook, listOfBooks, updateBook } from "./book.controller.js";

const bookRouter = Router();

const   upload = multer({
    dest: "public/uploads/",
    limits: {
        fileSize: 10 * 1024 * 1024, // 10MB
    },


})


bookRouter.post(
  "/"
  ,
  upload.fields([
    { name: "coverImage", maxCount: 1 },
    { name: "file", maxCount: 1 },
  ]),
  createBook
);

bookRouter.patch("/:id",updateBook)
bookRouter.get("/",listOfBooks)





export default bookRouter;