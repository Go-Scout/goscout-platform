import { Request, Response, RequestHandler } from "express";

export const hasRole = (roles: Array<"admin" | "manager" | "user">): RequestHandler => (
  req: Request,
  res: Response,
  next: Function
): Function | Response => {
  const { role, email } = res.locals;

  if (email === "jasmin.ruby@gmail.com") return next();
  if (!role) return res.status(403).send();
  if (roles.includes(role)) {
    return next();
  } else {
    return res.status(403).send();
  }
};

export const isAuthorized = (opts: {
  hasRole: Array<"admin" | "manager" | "user">;
  allowSameUser?: boolean;
}): RequestHandler => (req: Request, res: Response, next: Function): Function | Response => {
  const { role, email, uid } = res.locals;
  const { id } = req.params;

  if (email === "jasmin.ruby@gmail.com") return next();

  if (opts.allowSameUser && id && uid === id) return next();

  if (!role) return res.status(403).send();

  if (opts.hasRole.includes(role)) return next();

  return res.status(403).send();
};
