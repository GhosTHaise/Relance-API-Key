import mongoose from "mongoose";
import * as dotenv from "dotenv";

dotenv.config();
let isConnected = false;

export const connectToDB = async () => {
    mongoose.set("strictQuery",true);
    if(isConnected){
        console.log("MongoDB is already connected");
        return ;
    }
    try{
        await mongoose.connect(process.env.MONGODB_URI,{
            dbName : "api_key_relance_db",
            useNewUrlParser : true,
            useUnifiedTopology : true
        });
    }catch(error){
        console.log(error);
    }
}