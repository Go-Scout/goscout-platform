import { Application, Router } from "express";

const use = (app: Application, router: Router): void => {
  app.use("/api/v1", router);
};

export default { use };
