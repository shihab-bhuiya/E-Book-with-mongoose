import express from "express";

const app = express();

app.get('/',async(req,res)=>{
    res.json({
        success:true,
        message:"Server Running On 5000",
    })
})

export default app;