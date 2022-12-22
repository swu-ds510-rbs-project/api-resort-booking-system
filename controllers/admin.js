import AdminModel from "../models/admin.js"

export default class AdminController {

    static async apiLoginAdmin(req, res, next) {
        try {
            const username = req.body.username
            const password = req.body.password

            AdminModel.getAdminByLogin({ username, password }, (err, data) => {
                if (err) res.status(500).json({ status: false, error: err })
                else res.send({ status: true, data: data[0] });
            })
        } catch (e) {
            res.status(500).json({ status: false, error: e.message })
        }
    }

    static async apiAuthenAdmin(req, res, next) {
        try {
            var token = ''
            if (req.headers.authorization) token = req.headers.authorization.split(" ")[1]
            AdminModel.verifyAdmin(token, (err, data) => {
                if (err) res.status(500).json({ status: false, error: err })
                else {
                    AdminModel.getAdminByUsername(data.username, (err, data) => {
                        if (err) res.status(500).json({ status: false, error: err })
                        else res.send({ status: true, data: data[0] });
                    })
                }
            })
        } catch (e) {
            res.status(500).json({ error: e.message })
        }
    }
}