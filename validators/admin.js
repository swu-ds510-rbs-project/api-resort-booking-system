import { body, validationResult } from "express-validator";
import db from '../database/connection.js';

export const loginAdminValidator = [
    body('username', 'กรุณากรอก username').not().isEmpty(),
    body('password', 'กรุณากรอกรหัสผ่าน').not().isEmpty(),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            let inputerr = [];
            for (let i = 0; i < errors.errors.length; i++) {
                inputerr.push(errors.errors[i].msg);
            }
            return res.status(400).json({ status: false, error: inputerr });
        }
        next();
    }
]