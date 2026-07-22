import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";
import { authMiddleware } from "../middleware/auth";

const router = Router();

router.post("/login", AuthController.login);
router.post("/signup", AuthController.signup);
router.post("/firebase-login", AuthController.firebaseLogin);
router.get("/profile", authMiddleware, AuthController.getProfile);
router.put("/profile", authMiddleware, AuthController.updateProfile);

export default router;
