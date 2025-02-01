import {Router} from "express";

const router = Router();

import {
    getSidebarUsers,
    getAllMessages,
    sendMessage
} from "../controllers/message.controller.js"

import {protectRoute} from "../middlewares/auth.middleware.js"

router.get("/sidebar-users", protectRoute, getSidebarUsers )
router.get("/:receiverID", protectRoute, getAllMessages )
router.get("/send", protectRoute, sendMessage )

export default router;