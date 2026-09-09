import type { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";

import userModel from "./user.model.js";

import bcyrpt from "bcrypt"

import { config } from "../config/config.js";
import jwt from "jsonwebtoken";

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

    const hashedPassword = await bcyrpt.hash(password, 10);

    const newUser = await userModel.create({
        name,
        email,
        password:hashedPassword,
    })


    // token generation

    const token = jwt.sign({sub: newUser._id}, config.JwtSecrect as string, {expiresIn: "7d"})

    res.status(200).json({
        accessToken: token,
    })

}




export {createUser};