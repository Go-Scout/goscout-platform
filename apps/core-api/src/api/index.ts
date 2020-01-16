import { Application, Router } from "express";
import { usersRoutes } from "../users/usersRoutes";

const use = (app: Application, router: Router): void => {
  router.get("/warmup", (req, res) => res.send({ status: "ok" }));
  usersRoutes(router);

  app.use("/api/v1", router);
};

export default { use };
