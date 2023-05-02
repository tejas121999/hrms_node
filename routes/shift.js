const express = require("express")
const router = express.Router()
const shiftControler = require('../controllers/shift')
const verify = require("../middleware/JWT")

router.post('/getShift',verify.validateToken, shiftControler.getShift)
router.post('/addShift',verify.validateToken, shiftControler.addShift)
router.post('/updateShift',verify.validateToken, shiftControler.updateShift)
router.post('/deleteShift',verify.validateToken, shiftControler.deleteShift)
router.post('/getShiftById',verify.validateToken, shiftControler.getShiftById)
router.post('/fd',verify.validateToken, shiftControler.fullDayData)
router.post('/hd',verify.validateToken, shiftControler.halfDayData)
// shift general 
router.post('/addShiftMetaData',verify.validateToken, shiftControler.addShiftMetaData)
router.post('/updateShiftAndShiftMetaData',verify.validateToken, shiftControler.updateShiftAndShiftMetaData)

module.exports = router