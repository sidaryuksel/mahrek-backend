import express from "express";
import {
    updatePerson,
    getPerson
} from "./personController";

const personRoute = express.Router();

personRoute.route('/').get(getPerson);
personRoute.route('/update').put(updatePerson);

export default personRoute;