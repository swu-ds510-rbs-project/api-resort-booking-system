import db from '../database/connection.js';
export default class Booking {
    static async addBooking(booking, result) {
        const query = `INSERT INTO booking (checkin_date, checkout_date, no_of_guest, special_request, is_cancel, house_id, guest_id) 
        VALUES (?, ?, ?, ?, ?, ?, ?)`
        const params = [
            booking.checkin_date,
            booking.checkout_date,
            booking.no_of_guest,
            booking.special_request ? booking.special_request : null,
            booking.is_cancel,
            booking.house_id,
            booking.guest_id
        ]
        db.query(query, params, (err, res) => {
            if (err) result(err, null);
            else result(null, res);
        })
    }

    static async getBookingsByGuest(guest_id, result) {
        const query = `SELECT * FROM booking b JOIN house h ON b.house_id = h.house_id WHERE guest_id = ?`
        db.query(query, guest_id, (err, res) => {
            if (err) result(err, null);
            else result(null, res);
        })
    }

    static async getTotalBookingPerMonthYear(result) {
        const query = `SELECT DATE_FORMAT(checkin_date, "%Y-%m") as checkin_month_year, count(*) as total_bookings FROM booking group by checkin_month_year order by checkin_month_year`
        db.query(query, (err, res) => {
            if (err) result(err, null);
            else result(null, res);
        })
    }
}
