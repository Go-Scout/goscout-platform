import express from "express";
import bodyParser from "body-parser";
import compression from "compression";
import cors from "cors";

const app = express();
app.use(compression());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors({ origin: true }));
app.get("/warmup", (req, res) => res.send({ status: "ok" }));

export default app;
