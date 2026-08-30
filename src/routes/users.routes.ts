import { Router } from "express";
import { createUser } from "../controller/user.controller.js";


const userRoutes = Router();

userRoutes.post("/regiser", createUser)

export default userRoutes