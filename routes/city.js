const express = require("express")
const router = express.Router()
const cityController = require('../controllers/city')
const verify = require("../middleware/JWT")

router.post('/getCountries',verify.validateToken, cityController.getCountries)
router.post('/getStates',verify.validateToken, cityController.getStates)
router.post('/getCities',verify.validateToken, cityController.getCities)


module.exports = router

