import app from "./src/app.js"

const port =process.env.PORT || 5000

const startServer = ()=>{
    app.listen(port,()=>{
        console.log(`Listening is running on :${port}`);
    })
}


startServer()