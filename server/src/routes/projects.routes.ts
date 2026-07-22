import { Router } from "express";
import { ProjectsController } from "../controllers/projects.controller";
import { authMiddleware } from "../middleware/auth";

const router = Router();

router.get("/leads", authMiddleware, ProjectsController.getLeads);
router.post("/leads", authMiddleware, ProjectsController.createLead);
router.put("/leads/:id", authMiddleware, ProjectsController.updateLead);
router.delete("/leads/:id", authMiddleware, ProjectsController.deleteLead);

router.get("/projects", authMiddleware, ProjectsController.getProjects);
router.post("/projects", authMiddleware, ProjectsController.createProject);
router.get("/projects/:id", authMiddleware, ProjectsController.getProjectById);
router.put("/projects/:id", authMiddleware, ProjectsController.updateProject);

router.get("/events", authMiddleware, ProjectsController.getEvents);
router.post("/events", authMiddleware, ProjectsController.createEvent);

export default router;
