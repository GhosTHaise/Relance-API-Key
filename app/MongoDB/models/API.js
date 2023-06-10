import mongoose,{ Schema , model} from "mongoose"

const API_KEY_Schema = new Schema({
    name : {
        type : String,
        required : [true,"Name is required"]
    },
    token : {
        type : String,
        required : [true,"Token is required"]
    },
    date_last_upload : {
        type : String,
        required : [true,"Date las upload is required"]
    }
})

const API = new model("API",API_KEY_Schema);
export default API;