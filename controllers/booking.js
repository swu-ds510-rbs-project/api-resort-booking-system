import BookingModel from "../models/booking.js"

export default class HouseController {
    static async apiAddBooking(req, res, next) {
        try {
            const booking = req.body
            BookingModel.addBooking(booking, (err, data) => {
                if (err) res.status(500).json({ status: false, error: err })
                else res.send({ status: true, data });
            })
        } catch (e) {
            res.status(500).json({ status: false, error: e.message })
        }
    }

    static async apiGetBookingsByGuest(req, res, next) {
        try {
            const guestId = req.params.guestId
            BookingModel.getBookingsByGuest(guestId, (err, data) => {
                if (err) res.status(500).json({ status: false, error: err })
                else res.send({ status: true, data });
            })
        } catch (e) {
            res.status(500).json({ status: false, error: e.message })
        }
    }

    static async apiGetTotalBookingPerMonthYear(req, res, next) {
        try {
            BookingModel.getTotalBookingPerMonthYear((err, data) => {
                if (err) res.status(500).json({ status: false, error: err })
                else res.send({ status: true, data });
            })
        } catch (e) {
            res.status(500).json({ status: false, error: e.message })
        }
    }
}