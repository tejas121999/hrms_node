const express = require("express")
const router = express.Router()
const bookingControler = require('../controllers/booking')
const verify = require("../middleware/JWT")

router.post('/getBooking',verify.validateToken, bookingControler.getBooking)
router.post('/addBooking',verify.validateToken, bookingControler.addBooking)
router.post('/updatBooking',verify.validateToken, bookingControler.updatBooking)
router.post('/deleteBooking',verify.validateToken, bookingControler.deleteBooking)
router.post('/getBookingById',verify.validateToken, bookingControler.getBookingById)

module.exports = router
