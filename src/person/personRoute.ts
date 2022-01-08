import express from "express";
import {
    updateNode,
    getPerson,
    createNode,
    clearNodeAndChildren
} from "./personController";

const personRoute = express.Router();

personRoute.route('/').get(getPerson);
personRoute.route("/:id").put(updateNode).delete(clearNodeAndChildren);
personRoute.route('/node').post(createNode);

export default personRoute;
