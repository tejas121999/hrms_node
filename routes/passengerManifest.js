const express = require("express")
const router = express.Router()
const passengerManifestControler = require('../controllers/passengerManifest')
const verify = require("../middleware/JWT")

router.post('/getPassengerManifest',verify.validateToken, passengerManifestControler.getPassengerManifest)
router.post('/addPassengerManifest',verify.validateToken, passengerManifestControler.addPassengerManifest)
router.post('/update',verify.validateToken, passengerManifestControler.updatePassengerManifest)
router.post('/deletePassengerManifest',verify.validateToken, passengerManifestControler.deletePassengerManifest)
router.post('/getPassengerManifestById',verify.validateToken, passengerManifestControler.getPassengerManifestById)

module.exports = router
