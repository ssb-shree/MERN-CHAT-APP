import {Router} from "express";

const router = Router();

import {
    registerUser,
    loginUser,
    logoutUser,
    createMagicLink,
    verifyMagicLink,
    updateUserProfile,
    checkAuth
} from "../controllers/auth.controller.js"

import {protectRoute} from "../middlewares/auth.middleware.js"

router.post("/register", registerUser);
router.post("/login", loginUser);

// wont be using below routes since we dont have an smtp server made just for fun
router.post("/create-magic", createMagicLink);
router.get("/verify-magic", verifyMagicLink);

router.post("/logout", logoutUser);

router.get("/check-auth", protectRoute, checkAuth)

router.patch("/update-profile", protectRoute, updateUserProfile)

export default router;