const express = require("express")
const router = express.Router()
const configurationController = require('../controllers/attendance_configuration')
const verify = require("../middleware/JWT")

router.post('/getConfiguration',verify.validateToken, configurationController.getConfiguration)
router.post('/addConfiguration',verify.validateToken, configurationController.addConfiguration)
router.post('/editConfiguration',verify.validateToken, configurationController.editConfiguration)
// router.post('/deleteConfiguration',verify.validateToken, configurationController.deleteConfiguration)
router.post('/getConfigurationById',verify.validateToken, configurationController.getConfigurationById)


module.exports = router

