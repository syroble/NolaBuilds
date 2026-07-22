import { Router } from "express";
import { AIController } from "../controllers/ai.controller";
import { authMiddleware } from "../middleware/auth";

const router = Router();

// Exposes server-side Gemini AI blueprint generator endpoint
router.post("/suggestion", authMiddleware, AIController.getDesignSuggestions);

export default router;
