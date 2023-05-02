const express = require("express")
const router = express.Router()
const rosterController = require('../controllers/rosterController')
const verify = require("../middleware/JWT")

router.post('/getRoster',verify.validateToken, rosterController.getRoster)
router.post('/addRoster',verify.validateToken, rosterController.addRoster)
router.post('/addYearlyRoster',verify.validateToken, rosterController.addYearlyRoster)
router.post('/getYearlyRoster',verify.validateToken, rosterController.getYearlyRoster)
router.post('/getSingleYearlyRoster',verify.validateToken, rosterController.getSingleYearlyRoster)
router.post('/updateRoster',verify.validateToken, rosterController.updateRoster)
router.post('/updateOnCrewToRoster',verify.validateToken, rosterController.updateOnCrewToRoster)
router.post('/updateOffCrewToRoster',verify.validateToken, rosterController.updateOffCrewToRoster)
router.post('/removeOnCrewFromRoster',verify.validateToken, rosterController.removeOnCrewFromRoster)
router.post('/removeOffCrewFromRoster',verify.validateToken, rosterController.removeOffCrewFromRoster)
// router.post('/deleteRoster', rosterController.editRoster)
router.post('/getSingle',verify.validateToken, rosterController.getSingle)


module.exports = router

