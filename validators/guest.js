import { body, validationResult } from "express-validator";
import db from '../database/connection.js';

export const registerGuestValidator = [
    body('firstname', 'กรุณากรอกชื่อ').not().isEmpty(),
    body('lastname', 'กรุณากรอกนามสกุล').not().isEmpty(),
    body('tel', 'กรุณากรอกเบอร์โทร').not().isEmpty(),
    body('email', 'กรุณากรอกอีเมลให้ถูกต้อง').isEmail(),
    body('email').trim().custom((value, { req }) => {
        return new Promise((resolve, reject) => {
            const query = "SELECT * FROM guest WHERE email = ?"
            db.query(query, req.body.email, (err, res) => {
                if (err) reject(new Error('Input for email is error'));
                else {
                    if (res.length > 0) reject(new Error('อีเมลนี้ถูกใช้ไปแล้ว'));
                    else resolve(true);
                }
            })
        });
    }),
    body('password', 'กรุณากรอกรหัสผ่าน').not().isEmpty(),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) // ถ้ามี error จะทำอะไรบ้าง?
            return res.status(400).json({ status: false, input_err: errors["errors"] });
        next();
    }
]