const express = require("express")
const router = express.Router()
const leaveTypeConfiguration = require('../controllers/leaveTypeConfiguration')
const verify = require("../middleware/JWT")

router.post('/get',verify.validateToken, leaveTypeConfiguration.get)
router.post('/add',verify.validateToken, leaveTypeConfiguration.add)
router.post('/edit',verify.validateToken, leaveTypeConfiguration.edit)
router.post('/getById',verify.validateToken, leaveTypeConfiguration.getById)


module.exports = router

