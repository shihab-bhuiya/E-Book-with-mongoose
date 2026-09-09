import type { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import mongoose from "mongoose";
import userModel from "./user.model.js";

const createUser = async(req:Request, res: Response, next: NextFunction)=>{

    const {name,email,password} = req.body;

    //validation

    if(!name || !email || !password){
        const error = createHttpError(400,"All filed are required");
        return next(error);
    }

    const user = await userModel.findOne({email: email});

    if(user){
        const error = createHttpError(400,"User already exist");
        return next(error);
    }



    // password -> hash

    res.status(200).json({
        message:"User Created Successfully",
    })

}




export {createUser};