import { Router } from "express";
import { sync } from "./showcasesController";
import { isAuthenticated } from "../auth/authenticated";
import { isAuthorized } from "../auth/authorized";

export function showcasesRoutes(router: Router) {
  // sync showcase database
  router.get("/showcases/sync", isAuthenticated, isAuthorized({ hasRole: ["admin", "manager"] }), sync);
}
