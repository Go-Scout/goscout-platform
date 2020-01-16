import { https, database } from "firebase-functions";
import admin from "firebase-admin";
import app from "./app";
import send from "./mailer/send";

admin.initializeApp();

// handles express app
export const api = https.onRequest(app);

// onDataAdded is watching for changes in database
export const onDataAdded = database.ref("/emails/{sessionId}").onCreate(send);
