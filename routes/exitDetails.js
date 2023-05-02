const express = require("express")
const router = express.Router()
const exitDetailsController = require('../controllers/exitDetails')
const verify = require("../middleware/JWT")

router.post('/getExitDetails', exitDetailsController.getExitDetails)
router.post('/addExitDetails', exitDetailsController.addExitDetails)
router.post('/editExitDetails', exitDetailsController.editExitDetails)
router.post('/deleteExitdetails', exitDetailsController.deleteExitdetails)
router.post('/getExitDetailInterviewer', exitDetailsController.getExitDetailInterviewer)

module.exports = router

