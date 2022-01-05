import express from "express";
import {
    updateNode,
    getPerson,
    createNode
} from "./personController";

const personRoute = express.Router();

personRoute.route('/').get(getPerson);
personRoute.route("/:id").put(updateNode);
personRoute.route('/node').post(createNode);

export default personRoute;