import GuestModel from "../models/guest.js"

export default class GuestController {

    static async apiRegisterGuest(req, res, next) {
        try {
            const firstname = req.body.firstname
            const lastname = req.body.lastname
            const tel = req.body.tel
            const email = req.body.email
            const password = req.body.password

            GuestModel.addGuest({ firstname, lastname, tel, email, password }, (err, data) => {
                if (err) res.status(500).json({ status: false, error: err })
                else res.send({ status: true, data });
            })
        } catch (e) {
            res.status(500).json({ status: false, error: e.message })
        }
    }

    static async apiLoginGuest(req, res, next) {
        try {
            const email = req.body.email
            const password = req.body.password

            GuestModel.getGuestByLogin({ email, password }, (err, data) => {
                if (err) res.status(500).json({ status: false, error: err })
                else res.send({ status: true, data });
            })
        } catch (e) {
            res.status(500).json({ status: false, error: e.message })
        }
    }
}