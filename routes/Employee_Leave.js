const express = require("express")
const router = express.Router()
const Employee_Leave = require('../controllers/Employee_Leave')
const verify = require("../middleware/JWT")

router.post('/getAllReq',verify.validateToken, Employee_Leave.getAllReq)
router.post('/leave_request',verify.validateToken, Employee_Leave.getLeaveRequest)
router.post('/leave_track',verify.validateToken, Employee_Leave.getEmpRequest)
router.post('/send',verify.validateToken, Employee_Leave.sendLeaveRequest)
router.post('/request',verify.validateToken, Employee_Leave.approveRequest)
router.post('/delete',verify.validateToken, Employee_Leave.deleteRequest)
router.post('/update',verify.validateToken, Employee_Leave.updateRequest)
router.post('/getRequests',verify.validateToken, Employee_Leave.getRequests)
router.post('/getRequestsById',verify.validateToken, Employee_Leave.getRequestsById)
router.post('/getAllRequests',verify.validateToken, Employee_Leave.getAllRequests)
router.post('/getAvailableLeaves',verify.validateToken, Employee_Leave.getAvailableLeaves)
router.post('/getAllAvailableLeaves', Employee_Leave.getAllAvailableLeaves)

router.post('/leaveRequestByDate',verify.validateToken,Employee_Leave.leaveRequestByDate)
router.post('/getLeaveByYear',verify.validateToken,Employee_Leave.getLeaveByYear)

module.exports = router