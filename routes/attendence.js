const express = require("express")
const router = express.Router()
const AttendenceControler = require("../controllers/attendence")
const verify = require("../middleware/JWT")

router.post('/getAttendence',verify.validateToken, AttendenceControler.getAttendence)
router.post('/punchin',verify.validateToken, AttendenceControler.punchin)
router.post('/getPunchInStatus',verify.validateToken, AttendenceControler.checkPunch)
router.post('/addAttendence',verify.validateToken, AttendenceControler.addAttendence)
router.post('/getAllAttendence',verify.validateToken, AttendenceControler.getAllAttendence)
router.post('/editAttendence',verify.validateToken, AttendenceControler.editAttendence)
router.post('/empPresentDays',verify.validateToken, AttendenceControler.getPresentDays)


router.post('/getMonthlyAttendance',verify.validateToken,AttendenceControler.getMonthlyAttendance)
router.post('/getDateAttendanceAndLeave',verify.validateToken,AttendenceControler.getDateAttendanceAndLeave)
router.post('/getEmpAttendenceByDate',verify.validateToken,AttendenceControler.getEmpAttendenceByDate)
router.post('/getAllEmpAttendenceByDate',verify.validateToken,AttendenceControler.getAllEmpAttendenceByDate)



module.exports = router