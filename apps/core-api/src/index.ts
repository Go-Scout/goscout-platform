import { https } from "firebase-functions";
import admin from "firebase-admin";
import app from "./app";

admin.initializeApp();

// runs express app
export const api = https.onRequest(app);
