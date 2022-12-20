import HouseModel from "../models/house.js"

export default class HouseController {
    static async apiGetAvailableHouses(req, res, next) {
        try {
            const checkin_date = req.params.checkin_date
            const checkout_date = req.params.checkout_date

            HouseModel.getAvailableHouses({ checkin_date, checkout_date }, (err, data) => {
                if (err) res.status(500).json({ status: false, error: err })
                else res.send({ status: true, data });
            })
        } catch (e) {
            res.status(500).json({ status: false, error: e.message })
        }
    }
}