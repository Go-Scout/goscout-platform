import { Application, Router } from "express";
import { usersRoutes } from "../users/usersRoutes";
import { showcasesRoutes } from "../showcases/showcasesRoutes";

const use = (app: Application, router: Router): void => {
  router.get("/warmup", (req, res) => res.send({ status: "ok" }));
  usersRoutes(router);
  showcasesRoutes(router);

  app.use("/v1", router);
};

export default { use };
