const express = require("express")
const router = express.Router()
const attendanceNotificationControler = require("../controllers/attendance_notification")
const verify = require("../middleware/JWT")


// ApprovalNotification
router.post('/getApprove',verify.validateToken, attendanceNotificationControler.getApprovalNotification)
router.post('/addApprove',verify.validateToken, attendanceNotificationControler.addApprovalNotification)
router.post('/updateApprove',verify.validateToken, attendanceNotificationControler.updateApprovalNotification)
router.post('/deleteApprove',verify.validateToken, attendanceNotificationControler.deleteApprovalNotification)

// AbsentNotification
router.post('/getAbsent',verify.validateToken, attendanceNotificationControler.getAbsentNotification)
router.post('/addAbsent',verify.validateToken, attendanceNotificationControler.sendAbsentNotification)
router.post('/updateAbsent',verify.validateToken, attendanceNotificationControler.updateAbsentNotification)
router.post('/deleteApbsent',verify.validateToken, attendanceNotificationControler.deleteAbsentNotification)

// Missing_Attendance_Notification
router.post('/getMissing',verify.validateToken, attendanceNotificationControler.getMisingAttendence)
router.post('/addMissing',verify.validateToken, attendanceNotificationControler.addMisingAttendence)
router.post('/updateMissing',verify.validateToken, attendanceNotificationControler.updateMisingAttendence)
router.post('/deleteMissing',verify.validateToken, attendanceNotificationControler.deleteMisingAttendence)

module.exports = router