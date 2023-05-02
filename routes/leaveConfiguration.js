const express = require("express")
const router = express.Router()
const leaveConfigurationController = require('../controllers/leaveConfiguration')
const verify = require("../middleware/JWT")

router.post('/get',verify.validateToken, leaveConfigurationController.get)
router.post('/add',verify.validateToken, leaveConfigurationController.add)
router.post('/edit',verify.validateToken, leaveConfigurationController.edit)
router.post('/delete',verify.validateToken, leaveConfigurationController.delete)
router.post('/getById',verify.validateToken, leaveConfigurationController.getById)


module.exports = router

