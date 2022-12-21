import express from "express";
import BookingController from "../controllers/booking.js"

const router = express.Router()

router.post("/", BookingController.apiAddBooking)

export default router
