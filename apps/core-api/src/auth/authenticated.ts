import { Request, Response } from "express";
import admin from "firebase-admin";

export async function isAuthenticated(req: Request, res: Response, next: Function): Promise<Function | Response> {
  const { authorization } = req.headers;

  if (!authorization) return res.status(401).send({ message: "Unauthorized" });
  if (!authorization.startsWith("Bearer")) return res.status(401).send({ message: "Unauthorized" });

  const split = authorization.split("Bearer ");
  if (split.length !== 2) return res.status(401).send({ message: "Unauthorized" });

  const token = split[1];

  const decodedToken: admin.auth.DecodedIdToken = await admin.auth().verifyIdToken(token);
  if (!decodedToken) return res.status(401).send({ message: "Unauthorized" });
  console.log("decodedToken", JSON.stringify(decodedToken));

  res.locals = {
    ...res.locals,
    uid: decodedToken.uid,
    role: decodedToken.role,
    email: decodedToken.email
  };

  return next();
}
