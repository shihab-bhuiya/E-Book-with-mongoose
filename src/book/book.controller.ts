import { Types } from "mongoose";
import BookModel from "./book.model.js";
import fs from "fs/promises";
import type { NextFunction, Request, Response } from "express";
// import type { AuthenticatedRequest } from "../middleWare/authenticate.js";
import createHttpError from "http-errors";
import cloudinary from "../config/cloudinary.js";

const createBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { title, genre } = req.body;

    const files = req.files as {
      coverImage?: Express.Multer.File[];
      file?: Express.Multer.File[];
    };

    const coverImage = files.coverImage?.[0];
    const file = files.file?.[0];

    if (!title || !genre || !coverImage || !file) {
      throw createHttpError(400, "All fields are required");
    }

    // const _req = req as AuthenticatedRequest;

    // if (!_req.userId) {
    //   throw createHttpError(401, "User is not authenticated");
    // }

    const coverUploadResult = await cloudinary.uploader.upload(
      coverImage.path,
      {
        folder: "book-covers",
        resource_type: "image",
      }
    );

    const fileUploadResult = await cloudinary.uploader.upload(file.path, {
      folder: "books-pdf",
      resource_type: "raw",
    });

    const newBook = await BookModel.create({
      title,
      author: new Types.ObjectId(), // Replace with the actual user ID from the authenticated request
      genre,
      coverImage: coverUploadResult.secure_url,
      file: fileUploadResult.secure_url,
    });

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


const updateBook = async(req:Request,res: Response,next:NextFunction )=>{

  const {id} = req.params;

  try{
    const updatedBook = await BookModel.findByIdAndUpdate(id,req.body,{new:true});

    if(!updatedBook){
      const error = createHttpError(404,"Book not found");
      return next(error);
    }

    res.status(200).json({
      message: "Book updated successfully",
      book: updatedBook,
    });
  } catch (error) {
    next(error);
  }
};

export { createBook, updateBook };