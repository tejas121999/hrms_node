const express = require("express")
const router = express.Router()
const salaryComponent = require('../controllers/salaryComponent')
const verify = require("../middleware/JWT")

router.post('/getSalaryComponent',verify.validateToken, salaryComponent.getSalaryComponent)
router.post('/addSalaryComponent',verify.validateToken, salaryComponent.addSalaryComponent)
router.post('/updateSalaryComponent',verify.validateToken, salaryComponent.updateSalaryComponent)
router.post('/getSalaryComponentById',verify.validateToken, salaryComponent.getSalaryComponentById)
router.post('/deleteSalaryComponent',verify.validateToken, salaryComponent.deleteSalaryComponent)

module.exports = router