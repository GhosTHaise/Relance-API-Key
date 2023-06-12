import express from "express"
import BackblazeRoute from "./routes/BackblazeRoute.js"
import cors from "cors";
import cron from "node-cron";
import fetch from "node-fetch";
import * as dotenv from "dotenv";

dotenv.config();

const app = new express();
const PORT = 4000;

cron.schedule("* * */4 * * *",() => {
    const event_handle = async () => {
        try {
            let request = await fetch(process.env.SERVER_URL,{
                method : "Patch"
            });
    
            await request.json();
        } catch (error) {
            console.log("Unable to refresh key :"+error.message);
        }
    }

    event_handle()
})
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