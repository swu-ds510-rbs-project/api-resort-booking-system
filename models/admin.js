import db from '../database/connection.js';
import bcrypt from "bcrypt";
// const saltRounds = 10;
import jwt from "jsonwebtoken";
import config from 'config';
const SECRET = config.get("SECRET")

export default class Admin {

    static async getAdminByLogin(filter, result) {
        try {
            let query = "SELECT * FROM admin where username = ?"
            db.query(query, filter.username, (err, res) => {
                if (err) result(err, null);
                else if (res.length === 0) result(["ไม่พบ username นี้ในระบบ"], null);
                else {
                    bcrypt.compare(filter.password, res[0].password, (err, response) => {
                        if (!response) result(["รหัสผ่านไม่ถูกต้อง"], null);
                        else {
                            var token = jwt.sign({ username: filter.username }, SECRET, { expiresIn: '10h' });
                            res[0].token = token
                            delete res[0].password;
                            result(null, res);
                        }
                    });
                }
            })
        } catch (e) {
            console.error(`Unable to login: ${e}`)
            return { error: e }
        }
    }

    static async verifyAdmin(token, result) {
        try {
            var decoded = jwt.verify(token, SECRET);
            result(null, decoded)
        } catch (e) {
            console.error(`Unable to verify: ${e}`)
            result(e, null)
        }
    }

    static async getAdminByUsername(username, result) {
        try {
            let query = "SELECT * FROM admin where username = ?"
            db.query(query, username, (err, res) => {
                if (err) result(err, null);
                else if (res.length === 0) result("not found username", null);
                else {
                    delete res[0].password;
                    result(null, res);
                }
            })
        } catch (e) {
            console.error(`Unable to login: ${e}`)
            return { error: e }
        }
    }
}