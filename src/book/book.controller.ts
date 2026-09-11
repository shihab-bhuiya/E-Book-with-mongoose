import type { NextFunction, Request, Response } from "express";
import BookModel from "./book.model.js";
import createHttpError from "http-errors";

import fs from "fs/promises";
import cloudinary from "../config/cloudinary.js";

const createBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log("BODY:", req.body);
    console.log("FILES:", req.files);

    const { title, author, genre } = req.body;

    const files = req.files as {
      coverImage?: Express.Multer.File[];
      file?: Express.Multer.File[];
    };

    const coverImage = files.coverImage?.[0];
    const file = files.file?.[0];

    // Check required fields
    if (!title || !author || !genre || !coverImage || !file) {
      throw createHttpError(400, "All fields are required");
    }

    // Upload cover image to Cloudinary
    const coverUploadResult = await cloudinary.uploader.upload(
      coverImage.path,
      {
        folder: "book-covers",
        resource_type: "image",
      }
    );

    // Upload book file/PDF to Cloudinary
    const fileUploadResult = await cloudinary.uploader.upload(file.path, {
      folder: "books-pdf",
      resource_type: "raw",
    });

    // Save Cloudinary URLs in MongoDB
    const newBook = await BookModel.create({
      title,
      author,
      genre,
      coverImage: coverUploadResult.secure_url,
      file: fileUploadResult.secure_url,
    });

    // Delete temporary files from local server
    await fs.unlink(coverImage.path);
    await fs.unlink(file.path);

    res.status(201).json({
      message: "Book created successfully",
      book: newBook,
    });
  } catch (error) {
    next(error);
  }
};

export { createBook };