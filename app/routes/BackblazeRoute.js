import express from "express"
import { updateExistingKey } from "../controllers/BackblazeController.js";


const Router = new express();
Router.route("/").get((req,res)=> res.status(200).json({message : "Requesting API interaction ."}));
Router.route("/").patch(updateExistingKey);

export default Router;
