import express from "express";
import GuestController from "../controllers/guest.js"
import { registerGuestValidator, loginGuestValidator } from "../validators/guest.js";

const router = express.Router()

router.post("/", registerGuestValidator, GuestController.apiRegisterGuest)
router.post("/login", loginGuestValidator, GuestController.apiLoginGuest)
router.post("/authen", GuestController.apiAuthenGuest)

export default router
