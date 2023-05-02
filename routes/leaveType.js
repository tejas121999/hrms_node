const express = require("express")
const router = express.Router()
const leaveType = require('../controllers/leaveType')
const verify = require("../middleware/JWT")

router.post('/get',verify.validateToken, leaveType.get)
router.post('/add',verify.validateToken, leaveType.add)
router.post('/edit',verify.validateToken, leaveType.edit)
router.post('/getById',verify.validateToken, leaveType.getById)
router.post('/delete',verify.validateToken, leaveType.deleteByID)

module.exports = router

