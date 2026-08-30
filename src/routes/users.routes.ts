import { Router } from "express";
import { createUser } from "../controller/user.controller.js";


const userRoutes = Router();

userRoutes.post("/register", createUser)

export default userRoutes