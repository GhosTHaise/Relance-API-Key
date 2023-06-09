import express from "express"
import BackblazeRoute from "./routes/BackblazeRoute.js"
import cors from "cors"

const app = new express();
const PORT = 4000;
//MiddleWare
app.use(cors());
//API Route Declaration
app.use("/api/v1/backblaze",BackblazeRoute);

app.use("/",(req,res)=>{
    res.status(200).json({
        message : "App to reaload api key automaticly"
    })
})

app.listen(PORT,()=> console.log("Serveur start on : http://localhost:4000/"));