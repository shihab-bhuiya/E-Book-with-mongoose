import express, { type NextFunction, type Request, type Response } from "express";


import globalErrorHandler from "./middleWare/glodbalErrorHandeler.js";
import userRouter from "./user/user.router.js";


const app = express();
app.use(express.json())


app.get('/',async(req,res)=>{

    // const error =   createHttpError(400,"Something went wrong");
    // throw error;

    res.json({
        success:true,
        message:"Server Running On 5000",
    })
})


app.use('/api/user', userRouter);



app.use(globalErrorHandler)

export default app;