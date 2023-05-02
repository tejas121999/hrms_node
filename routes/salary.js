const express = require("express")
const router = express.Router()
const salaryControler = require("../controllers/salary")
const verify = require("../middleware/JWT")

router.post('/getSalary',verify.validateToken, salaryControler.getSalary)
router.post('/addSalary',verify.validateToken, salaryControler.addSalary)
router.post('/updateSalary',verify.validateToken, salaryControler.updateSalary)
router.post('/deleteSalary',verify.validateToken, salaryControler.deleteSalary)


module.exports = router