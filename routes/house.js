import express from "express";
import HouseController from "../controllers/house.js"

const router = express.Router()

router.get("/:checkin_date/:checkout_date", HouseController.apiGetAvailableHouses)

export default router
