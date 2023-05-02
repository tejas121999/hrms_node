const express = require("express")
const router = express.Router()
const AttendenceSettingControler = require("../controllers/attendance_setting")
const verify = require("../middleware/JWT")


router.post('/getSetting',verify.validateToken, AttendenceSettingControler.getattendenceSetting)
router.post('/addAttandenceSetting',verify.validateToken, AttendenceSettingControler.addAttendenceSetting)
router.post('/editSetting',verify.validateToken, AttendenceSettingControler.editSetting)
router.post('/deleteSetting',verify.validateToken, AttendenceSettingControler.deleteSetting)

module.exports = router