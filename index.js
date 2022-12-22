import express from "express";
import cors from "cors";
import config from 'config';

import db from './database/connection.js';
import houseRouter from './routes/house.js'
import guestRouter from './routes/guest.js'
import bookingRouter from './routes/booking.js'
import adminRouter from './routes/admin.js'

const app = express();
const PORT = config.get("PORT");
// const CLIENT = config.get("CLIENT");

app.use(express.json());
app.use(cors({}));
// app.use(cors({
//     origin: [CLIENT],
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     credentials: true
// }));

try {
    app.listen(PORT, () => {
        console.log(`listening on port ${PORT}`);
    })
} catch (err) {
    throw err
}

app.get('/titles', async (req, res) => {
    db.query(`SELECT * FROM booking LIMIT 3;`, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.json({ status: "success", result })
        }
    });
});

app.use('/house', houseRouter);
app.use('/guest', guestRouter);
app.use('/booking', bookingRouter);
app.use('/admin', adminRouter);

app.use("*", (req, res) => res.status(404).json({ error: "not found" }));