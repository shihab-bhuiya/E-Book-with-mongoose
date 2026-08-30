import express, { type NextFunction, type Request, type Response } from "express";

import createHttpError from "http-errors";
import globalErrorHandler from "./middleWare/glodbalErrorHandeler.js";
import userRoutes from "./routes/users.routes.js";

const app = express();

app.get('/',async(req,res)=>{

    // const error =   createHttpError(400,"Something went wrong");
    // throw error;

    res.json({
        success:true,
        message:"Server Running On 5000",
    })
})


app.use('/api/users',userRoutes);

app.use(globalErrorHandler)

export default app;