import fetch from "node-fetch"
import { connectToDB } from "../MongoDB/connect.js"
import API from "../MongoDB/models/API.js"
import * as dotenv from "dotenv"


dotenv.config();
const updateExistingKey = async (req,res) => {
    try {
        //
        const authorization_key_headers = Buffer.from(`${process.env.keyID}:${process.env.applicationKey}`).toString('base64');
        const request = await fetch("https://api.backblazeb2.com/b2api/v2/b2_authorize_account",{
            method : "GET",
            headers : {
                "Authorization" : `Basic ${authorization_key_headers}`
            },
        });
        const {authorizationToken} = await request.json(); 
        //We have GOT TOKEN
        res.status(200).json({
            key : authorizationToken
        })
    } catch (error) {
        console.log(error);
    }
}

export {
    updateExistingKey
}