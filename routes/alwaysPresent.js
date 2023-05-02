const express = require("express")
const router = express.Router()
const AlwaysPresentEmp = require('../controllers/alwaysPresent')
const verify = require("../middleware/JWT")

router.post('/get',verify.validateToken, AlwaysPresentEmp.getAlwaysPresent)
router.post('/add',verify.validateToken, AlwaysPresentEmp.addAlwaysPresentEmp)
router.post('/edit',verify.validateToken, AlwaysPresentEmp.editAlwaysPresentEmp)
router.post('/delete',verify.validateToken, AlwaysPresentEmp.deleteAlwaysPresent)

module.exports = router