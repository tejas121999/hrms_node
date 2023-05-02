const express = require("express")
const router = express.Router()
const leaveControler = require('../controllers/leave')
const verify = require("../middleware/JWT")

router.post('/getLeave',verify.validateToken, leaveControler.getLeave)
router.post('/addLeave',verify.validateToken, leaveControler.addLeave)
router.post('/updateLeave',verify.validateToken, leaveControler.updateLeave)
router.post('/getLeaveById',verify.validateToken, leaveControler.getLeaveById)
router.post('/deleteLeave',verify.validateToken, leaveControler.deleteLeave)

module.exports = router