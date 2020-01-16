import { Response } from "express";

export function handleError(res: Response, err: Error): Response {
  return res.status(500).send({ message: err.message });
}
