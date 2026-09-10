import type { NextFunction, Request, Response } from "express";
import BookModel from "./book.model.js";
import createHttpError from "http-errors";

const createBook = async (req: Request, res: Response,next: NextFunction) => {

    console.log(req.body);
    console.log(req.file);
    try {
        const { title, author, genre, coverImage, file } = req.body;

        if (!title || !author || !genre || !coverImage || !file) {
            return next(createHttpError(400, "All fields are required"));
        }

        const newBook = await BookModel.create({ title, author, genre, coverImage, file });

        res.status(201).json({ message: "Book created successfully", book: newBook });

    } catch (error) {
        next(error);
    }
};




export { createBook };