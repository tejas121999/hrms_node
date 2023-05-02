const express = require("express")
const router = express.Router()
const overtimeApprovalNotificationController = require('../controllers/overtimeApprovalNotification')
const verify = require("../middleware/JWT")

router.post('/addOvertimeApprovalNotification',verify.validateToken, overtimeApprovalNotificationController.addOvertimeApprovalNotification)
router.post('/getOvertimeApprovalNotification',verify.validateToken, overtimeApprovalNotificationController.getOvertimeApprovalNotification)
router.post('/updateOvertimeApprovalNotification',verify.validateToken, overtimeApprovalNotificationController.updateOvertimeApprovalNotification)
router.post('/deleteOvertimeApprovalNotification',verify.validateToken, overtimeApprovalNotificationController.deleteOvertimeApprovalNotification)

router.post('/addOvertimeNotification',verify.validateToken, overtimeApprovalNotificationController.addOvertimeNotification);
router.post('/getOvertimeNotification',verify.validateToken, overtimeApprovalNotificationController.getOvertimeNotification)
router.post('/updateOvertimeNotification',verify.validateToken, overtimeApprovalNotificationController.updateOvertimeNotification)
router.post('/deleteOvertimeNotification',verify.validateToken, overtimeApprovalNotificationController.deleteOvertimeNotification)


module.exports = router

