import db from '../database/connection.js';
import bcrypt from "bcrypt";
const saltRounds = 10;

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
}