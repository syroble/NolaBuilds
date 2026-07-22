import { Router } from "express";
import { EstimatesController } from "../controllers/estimates.controller";
import { authMiddleware } from "../middleware/auth";

const router = Router();

router.get("/", authMiddleware, EstimatesController.getEstimates);
router.post("/", authMiddleware, EstimatesController.createEstimate);
router.delete("/:id", authMiddleware, EstimatesController.deleteEstimate);

export default router;
