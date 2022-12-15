import db from '../database/connection.js';

export default class House {
    static async getAvailableHouses(filter, result) {
        const query = `select * from house where house_id not in (
            select house_id from booking
            where (checkin_date >= "${filter.checkin_date}" and checkin_date < "${filter.checkout_date}")
            or (checkout_date > "${filter.checkin_date}" and checkout_date < "${filter.checkout_date}"))`
        db.query(query, (err, res) => {
            if (err) {
                console.log(err);
            } else {
                result(null, res);
            };
        })
    }
}