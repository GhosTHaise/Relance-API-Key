import fetch from "node-fetch"
import { connectToDB } from "../MongoDB/connect.js"
import API from "../MongoDB/models/API.js"
import * as dotenv from "dotenv"
import jwt from "jsonwebtoken"

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
            method : "POST",
            headers : {
                "Authorization" : authorizationToken
            },
            body : JSON.stringify({
                bucketId : process.env.BUCKET_ID
            })
        })
        
        const {authorizationToken : uploadUrl_authorizationToken,uploadUrl} = await request_uploadUrl.json();
        const jwt_token = jwt.sign({
            authorizationToken : uploadUrl_authorizationToken,
            uploadUrl
        },process.env.JWT_SECRET_KEY);

        //WE GOT JWT-TOKEN
        connectToDB()

        const BackBlaze_api_jwt = {
            name : "backblaze",
            token : jwt_token,
            date_last_upload : new Date().toLocaleString()
        }
        
        const _last_data = await API.find({name : "backblaze"});
        if(_last_data.length < 1){
            const new_API = new API({...BackBlaze_api_jwt});
            await new_API.save()
        }else{
            await API.findOneAndUpdate({name : "backblaze"},BackBlaze_api_jwt)
        }

        res.status(200).json({
            message : "New access Token Upload !"
        })
    } catch (error) {
        console.log(error);
    }
}

const getTokenKey = async (req,res) => {
    try {
        connectToDB()

        const backblaze_token = await API.find({name : "backblaze"});
        res.status(200).json({
            backblaze_token
        })
    } catch (error) {
        console.log(error);
    }
}

export {
    updateExistingKey,
    getTokenKey
}

//curl -H 'Authorization: 4_005f1b3c53e8cde0000000001_01ace089_5f1bd2_acct_IcIhm5CXKp2u2a4Z8-TDmvqawc4=' -d '{"bucketId": "3ff1db23dc15439e888c0d1e"}' https://api005.backblazeb2.com/b2api/v2/b2_get_upload_url