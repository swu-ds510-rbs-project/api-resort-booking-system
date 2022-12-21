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
}