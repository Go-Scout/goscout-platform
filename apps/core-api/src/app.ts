import express from "express";
import bodyParser from "body-parser";
import compression from "compression";
import cors from "cors";
import api from "./api";

// create express app and router
const app = express();
const router = express.Router();

app.use(compression());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors({ origin: true }));
api.use(app, router); // attach api routes

export default app;
