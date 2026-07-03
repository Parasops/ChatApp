import express from "express";
import { getMessages, sendMessages } from "../controller/messageController.js";

const router = express.Router();
router.post("/", sendMessages);
router.get("/", getMessages);
export default router;
