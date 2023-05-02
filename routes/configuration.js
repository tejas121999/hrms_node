const express = require("express")
const
    router = express.Router()
const config = require('../controllers/Configuration')
const verify = require("../middleware/JWT")

router.post('/Sandwich_weekly_off_for_absent_employee',verify.validateToken, config.Sandwich_weekly_off_for_absent_employee)
router.post("/Deduct_full_day_leave",verify.validateToken, config.Deduct_full_day_leave_if_employee_is_coming_after_half_day_time)
router.post("/Deduct_half_day_leave",verify.validateToken, config.Deduct_half_day_leave_if_employee_is_coming_after_grace_period)
// attendence
router.post('/Show_late_mark_data',verify.validateToken, config.Show_late_mark_in_my_attendance)
// mark attendence
router.post('/showLateMarkData',verify.validateToken, config.showLateMarkData)
router.post('/getAllPresent',verify.validateToken, config.getPresentDays)
router.post('/getShiftOfEmployee',verify.validateToken, config.getShiftOfEmployee)



module.exports = router