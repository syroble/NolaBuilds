import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { ENV } from "./config/env";
import { errorHandler } from "./middleware/error";
import { seedDatabaseIfEmpty } from "./config/supabase";

// Import routers
import authRouter from "./routes/auth.routes";
import projectsRouter from "./routes/projects.routes";
import estimatesRouter from "./routes/estimates.routes";
import aiRouter from "./routes/ai.routes";

async function startServer() {
  const app = express();
  const PORT = ENV.PORT || 3000;

  // JSON parsing and URL-encoded body processors
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // API router mappings
  app.use("/api/auth", authRouter);
  app.use("/api/projects", projectsRouter);
  app.use("/api/estimates", estimatesRouter);
  app.use("/api/ai", aiRouter);

  // Health check endpoint
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", uptime: process.uptime() });
  });

  // Integration of Vite middleware for asset compilation in development
  if (ENV.NODE_ENV !== "production") {
    console.log("Starting server in DEVELOPMENT mode with Vite Middleware...");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    console.log("Starting server in PRODUCTION mode with static file delivery...");
    const distPath = path.join(process.cwd(), "dist");
    
    // Serve static files compiled inside 'dist/'
    app.use(express.static(distPath));
    
    // SPA fallback router to serve index.html for React routing
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  // Global centralized error handler middleware
  app.use(errorHandler);

  // Seed the Cloud SQL database with default dataset if empty
  await seedDatabaseIfEmpty();

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`NOLA BUILDS server active at http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((error) => {
  console.error("Critical failure during server startup:", error);
  process.exit(1);
});
