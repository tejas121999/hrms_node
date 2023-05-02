const express = require("express")
const router = express.Router()
const tdsControler = require('../controllers/tds')
const verify = require("../middleware/JWT")

router.post('/getTds',verify.validateToken, tdsControler.getTds)
router.post('/addTds',verify.validateToken, tdsControler.addTds)
router.post('/updateTds',verify.validateToken, tdsControler.updateTds)

module.exports = router