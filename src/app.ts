import express, {
  type Application,
  type Request,
  type Response,
} from "express";

import config from "./config/index.js";
import globalErrorHandler from "./middlewares/globalErrorHandler.js";
import notFoundHandler from "./middlewares/notFound.js";
import helmet from "helmet";

import { AuthRoutes } from "./modules/auth/auth.route.js";
import formatUptime from "./utils/formatUptime.js";

export async function createApp(): Promise<Application> {
  const app: Application = express();

  // Middleware setup
  app.use(helmet());

  app.use(express.json({ limit: "20mb" }));
  app.use(express.urlencoded({ extended: true, limit: "20mb" }));

  app.use((req, _res, next) => {
    req.id = `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
    next();
  });

  app.get("/", (_req: Request, res: Response) => {
    res.status(200).json({
      success: true,
      message: `Welcome to the ClassyShop ${config.serviceName} API!`,
    });
  });

  app.get("/health", (_req, res) => {
    res.status(200).json({
      success: true,
      message: "Service is healthy",
      timestamp: new Date().toISOString(),
      uptime: formatUptime(process.uptime()),
      service: config.serviceName,
    });
  });

  app.use("/api/v1", AuthRoutes);

  app.use(notFoundHandler);

  app.use(globalErrorHandler);

  return app;
}
