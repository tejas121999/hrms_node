const express = require("express")
const router = express.Router()
const lateComingEarlygoingController = require('../controllers/lateComingEarlygoing')
const verify = require("../middleware/JWT")

router.post('/getLateComingEarlyGoing',verify.validateToken, lateComingEarlygoingController.getLateComingEarlyGoing)
router.post('/addLateComingEarlyGoing',verify.validateToken, lateComingEarlygoingController.addLateComingEarlyGoing)
router.post('/updateLateComingEarlyGoing',verify.validateToken, lateComingEarlygoingController.updateLateComingEarlyGoing)


module.exports = router

