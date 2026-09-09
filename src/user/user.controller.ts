import type { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";

import userModel from "./user.model.js";

import bcyrpt from "bcrypt"

import { config } from "../config/config.js";
import jwt from "jsonwebtoken";
import type { User } from "./user.types.js";

const createUser = async(req:Request, res: Response, next: NextFunction)=>{

    const {name,email,password} = req.body;

    //validation

    if(!name || !email || !password){
        const error = createHttpError(400,"All filed are required");
        return next(error);
    }

    try{ 

    const user = await userModel.findOne({email: email});

    if(user){
        const error = createHttpError(400,"User already exist");
        return next(error);
    }
} catch(err){
    const error = createHttpError(500,"Internal server error");
    return next(error);
}



    // password -> hash

    let newUser : User;

    try{

    const hashedPassword = await bcyrpt.hash(password, 10);

    newUser = await userModel.create({
        name,
        email,
        password:hashedPassword,
    })  
} catch(err){
    const error = createHttpError(500,"Internal server error");
    return next(error);
}
try{

    // token generation

    const token = jwt.sign({sub: newUser._id}, config.JwtSecrect as string, {expiresIn: "600"})

    res.status(200).json({
        accessToken: token,
    })}
catch(err){
    const error = createHttpError(500,"Error while generating token");
    return next(error);} 

}




export {createUser};