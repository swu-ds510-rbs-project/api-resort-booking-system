import { body, validationResult } from "express-validator";
export const getAvailableHousesValidator = [
    body('checkin_date', 'กรุณาเลือกวันที่ต้องการ Check-in').not().isEmpty(),
    body('checkout_date', 'กรุณาเลือกวันที่ต้องการ Check-out').not().isEmpty(),
    // check in date ต้องเกิดขึ้นก่อน check out
    // check in date และ check out date ต้องเป็นอนาคตเท่านั้น
]