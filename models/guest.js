import db from '../database/connection.js';
import bcrypt from "bcrypt";
const saltRounds = 10;
import jwt from "jsonwebtoken";
import config from 'config';
const SECRET = config.get("SECRET")

export default class Guest {

    static async addGuest(guest, result) {
        try {
            bcrypt.hash(guest.password, saltRounds, (err, hash) => {
                const insertQuery = `INSERT INTO guest (first_name, last_name, tel, email, password) 
                VALUES (?, ?, ?, ?, ?)`
                const params = [
                    guest.firstname,
                    guest.lastname,
                    guest.tel,
                    guest.email,
                    hash,
                ]
                db.query(insertQuery, params, (err, res) => {
                    if (err) result(err, null);
                    else result(null, res);
                })
            })
        } catch (e) {
            console.error(`Unable to register: ${e}`)
            return { error: e }
        }
    }

    static async getGuestByLogin(filter, result) {
        try {
            let query = "SELECT * FROM guest where email = ?"
            db.query(query, filter.email, (err, res) => {
                if (err) result(err, null);
                else if (res.length === 0) result("not found email", null);
                else {
                    bcrypt.compare(filter.password, res[0].password, (err, response) => {
                        if (!response) result("password invaild", null);
                        else {
                            var token = jwt.sign({ email: filter.email }, SECRET, { expiresIn: '10h' });
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
}