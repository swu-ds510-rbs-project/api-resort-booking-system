import express from "express";
import AdminController from "../controllers/admin.js"
import { loginAdminValidator } from "../validators/admin.js";

const router = express.Router()

router.post("/login", loginAdminValidator, AdminController.apiLoginAdmin)
router.post("/authen", AdminController.apiAuthenAdmin)

export default router
