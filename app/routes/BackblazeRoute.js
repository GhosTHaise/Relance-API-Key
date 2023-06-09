import express from "express"
import { updateExistingKey, getTokenKey } from "../controllers/BackblazeController.js";


const Router = new express();
Router.route("/").get(getTokenKey);
Router.route("/").patch(updateExistingKey);

export default Router;
