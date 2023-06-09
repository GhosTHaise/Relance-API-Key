import fetch from "node-fetch"
import { connectToDB } from "../MongoDB/connect.js"
import API from "../MongoDB/models/API.js"
import * as dotenv from "dotenv"


dotenv.config();
const updateExistingKey = async (req,res) => {
    try {
        //
        const authorization_key_headers = Buffer.from(`${process.env.keyID}:${process.env.applicationKey}`).toString('base64');
        const request_authorization_token = await fetch("https://api.backblazeb2.com/b2api/v2/b2_authorize_account",{
            method : "GET",
            headers : {
                "Authorization" : `Basic ${authorization_key_headers}`
            },
        });
        const {authorizationToken} = await request_authorization_token.json(); 
        //We have GOT TOKEN
        const request_uploadUrl  = await fetch("https://api005.backblazeb2.com/b2api/v2/b2_get_upload_url",{
            method : "GET",
            headers : {
                "Authorization" : authorizationToken
            },
            body : {
                bucketId : process.env.BUCKET_ID
            }
        })
        
        const upload_url = await request_uploadUrl.json();
        
        res.status(200).json({
            key : upload_url
        })
    } catch (error) {
        console.log(error);
    }
}

export {
    updateExistingKey
}

//curl -H 'Authorization: 4_005f1b3c53e8cde0000000001_01ace089_5f1bd2_acct_IcIhm5CXKp2u2a4Z8-TDmvqawc4=' -d '{"bucketId": "3ff1db23dc15439e888c0d1e"}' https://api005.backblazeb2.com/b2api/v2/b2_get_upload_url