import express from "express";
import GuestController from "../controllers/guest.js"
import { registerGuestValidator } from "../validators/guest.js";

const router = express.Router()

router.post("/", registerGuestValidator, GuestController.apiRegisterGuest)

export default router
