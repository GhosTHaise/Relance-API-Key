import express from "express"

const app = new express();
const PORT = 4000;



app.use("/",(req,res)=>{
    res.status(200).json({
        message : "App to reaload api key automaticly"
    })
})

app.listen(PORT,()=> console.log("Serveur start on : http://localhost:4000/"));