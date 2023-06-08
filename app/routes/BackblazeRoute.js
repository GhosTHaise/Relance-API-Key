import express from "express"
import { updateExistingKey } from "../controllers/BackblazeController";


const Router = new express();

Router.route("/").patch(updateExistingKey);

export default Router;
