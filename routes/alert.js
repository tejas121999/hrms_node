const express = require("express")
const router = express.Router()
const alertControler = require('../controllers/alert')
const verify = require("../middleware/JWT")

router.post('/alert',verify.validateToken, alertControler.postAlert)

module.exports = router