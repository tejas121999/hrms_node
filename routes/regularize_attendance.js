const express = require("express")
const router = express.Router()
const regularizeAttendance = require('../controllers/regularize_attendance')
const verify = require("../middleware/JWT")

router.post('/addRegularizeAttendance',verify.validateToken,regularizeAttendance.addRegularizeAttendance);
router.post('/getRegularizeAttendance',verify.validateToken,regularizeAttendance.getRegularizeAttendance);
router.post('/getRegularizeAttendanceByEmpId',verify.validateToken,regularizeAttendance.getRegularizeAttendanceByEmpId);

router.post('/updateRegularizeeAttendance',verify.validateToken,regularizeAttendance.updateRegularizeAttendance)
router.post('/deleteRegularizeAttendance',verify.validateToken,regularizeAttendance.deleteRegularizeAttendance)
router.post('/approvedOrDecline',verify.validateToken,regularizeAttendance.approveRegularizeAttendance)

module.exports = router