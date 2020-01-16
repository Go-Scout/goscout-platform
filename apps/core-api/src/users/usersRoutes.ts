import { Router } from "express";
import { all, create, get, patch, remove } from "./usersController";
import { isAuthenticated } from "../auth/authenticated";
import { isAuthorized } from "../auth/authorized";

export function usersRoutes(router: Router) {
  // create a user
  router.post("/users", isAuthenticated, isAuthorized({ hasRole: ["admin", "manager"] }), create);

  // list all users
  router.get("/users", isAuthenticated, isAuthorized({ hasRole: ["admin", "manager"] }), all);

  // get :id user
  router.get("/users/:id", [
    isAuthenticated,
    isAuthorized({ hasRole: ["admin", "manager"], allowSameUser: true }),
    get
  ]);

  // updates :id user
  router.patch("/users/:id", [
    isAuthenticated,
    isAuthorized({ hasRole: ["admin", "manager"], allowSameUser: true }),
    patch
  ]);

  // deletes :id user
  router.delete("/users/:id", [
    isAuthenticated,
    isAuthorized({ hasRole: ["admin", "manager"], allowSameUser: true }),
    remove
  ]);
}
