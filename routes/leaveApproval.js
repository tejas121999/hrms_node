const express = require("express")
const router = express.Router()
const leaveApproval = require('../controllers/leaveApproval')
const verify = require("../middleware/JWT")

// Approval :-
// leave_approval
router.post('/getLeaveApproval',verify.validateToken, leaveApproval.getLeaveApproval)
router.post('/addLeaveApproval',verify.validateToken, leaveApproval.addLeaveApproval)
router.post('/updateLeaveApproval',verify.validateToken, leaveApproval.updateLeaveApproval)
router.post('/deleteLeaveApproval',verify.validateToken, leaveApproval.deleteLeaveApproval)

// leave_encash_application API
router.post('/getLeaveEncashApplication',verify.validateToken, leaveApproval.getLeaveEncashApplication)
router.post('/addLeaveEncashApplication',verify.validateToken, leaveApproval.addLeaveEncashApplication)
router.post('/updateLeaveEncashApplication',verify.validateToken, leaveApproval.updateLeaveEncashApplication)
router.post('/deleteLeaveEncashApplication',verify.validateToken, leaveApproval.deleteLeaveEncashApplication)

// leave_encash_approval API
router.post('/getLeaveEncashApproval',verify.validateToken, leaveApproval.getLeaveEncashApproval)
router.post('/addLeaveEncashApproval',verify.validateToken, leaveApproval.addLeaveEncashApproval)
router.post('/updateLeaveEncashApproval',verify.validateToken, leaveApproval.updateLeaveEncashApproval)
router.post('/deleteLeaveEncashApproval',verify.validateToken, leaveApproval.deleteLeaveEncashApproval)

// Notification

// leave_application_notification
router.post('/getLeaveApplicationNotification',verify.validateToken, leaveApproval.getLeaveApplicationNotification)
router.post('/addLeaveApplicationNotification',verify.validateToken, leaveApproval.addLeaveApplicationNotification)
router.post('/updateLeaveApplicationNotification',verify.validateToken, leaveApproval.updateLeaveApplicationNotification)
router.post('/deleteLeaveApplicationNotification',verify.validateToken, leaveApproval.deleteLeaveApplicationNotification)

// leave approval notification
router.post('/getLeaveApprovalNotification',verify.validateToken, leaveApproval.getLeaveApprovalNotification)
router.post('/addLeaveApprovalNotification',verify.validateToken, leaveApproval.addLeaveApprovalNotification)
router.post('/updateLeaveApprovalNotification',verify.validateToken, leaveApproval.updateLeaveApprovalNotification)
router.post('/deleteLeaveApprovalNotification',verify.validateToken, leaveApproval.deleteLeaveApprovalNotification)

// levae pending notification
router.post('/getLeavePendingNotification',verify.validateToken, leaveApproval.getLeavePendingNotification)
router.post('/addLeavePendingNotification',verify.validateToken, leaveApproval.addLeavePendingNotification)
router.post('/updateLeavePendingNotification',verify.validateToken, leaveApproval.updateLeavePendingNotification)
router.post('/deleteLeavePendingNotification',verify.validateToken, leaveApproval.deleteLeavePendingNotification)

// leave encash approval notification 
router.post('/getLeaveEncashAppovalNotification',verify.validateToken, leaveApproval.getLeaveEncashAppovalNotification)
router.post('/addLeaveEncashAppovalNotification',verify.validateToken, leaveApproval.addLeaveEncashAppovalNotification)
router.post('/updateLeaveEncashAppovalNotification',verify.validateToken, leaveApproval.updateLeaveEncashAppovalNotification)
router.post('/deleteLeaveEncashAppovalNotification',verify.validateToken, leaveApproval.deleteLeaveEncashAppovalNotification)
module.exports = router

