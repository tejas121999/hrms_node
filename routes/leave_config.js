const express = require("express")
const router = express.Router()
const leaveConfigControler = require('../controllers/leave_config')
const verify = require("../middleware/JWT")

router.post('/getLeaveConfig',verify.validateToken, leaveConfigControler.getLeaveConfig)
router.post('/addLeaveConfig',verify.validateToken, leaveConfigControler.addLeaveConfig)
router.post('/editLeaveConfig',verify.validateToken, leaveConfigControler.editLeaveConfig)

module.exports = router