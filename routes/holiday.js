const express = require("express")
const router = express.Router()
const holidayController = require('../controllers/holiday')
const verify = require("../middleware/JWT")

router.post('/getHoliday',verify.validateToken, holidayController.getHoliday)
router.post('/addHoliday',verify.validateToken, holidayController.addHoliday)
router.post('/updateHoliday',verify.validateToken, holidayController.updateHoliday)
router.post('/getHolidayById',verify.validateToken, holidayController.getHolidayById)
router.post('/deleteHoliday',verify.validateToken, holidayController.deleteHoliday)

module.exports = router