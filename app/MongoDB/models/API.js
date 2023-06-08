import { model,models,Schema } from "mongoose";

const API_KEY_Schema = new Schema({
    name : {
        type : String,
        required : [true,"Name is required"]
    },
    token : {
        type : String,
        required : [true,"Token is required"]
    }
})

const API = models.API || new model("API",API_KEY_Schema);