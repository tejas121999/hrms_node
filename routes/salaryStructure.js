const express = require("express")
const router = express.Router()
const salaryStructure = require("../controllers/salaryStructure")
const verify = require("../middleware/JWT")

router.post('/getSalaryStructure',verify.validateToken, salaryStructure.getSalaryStructure)
router.post('/addSalaryStructure',verify.validateToken, salaryStructure.addSalaryStructure)
router.post('/updateSalaryStructure',verify.validateToken, salaryStructure.updateSalaryStructure)
router.post('/deleteSalaryStructure',verify.validateToken, salaryStructure.deleteSalaryStructure)
router.post('/getSalaryStructureById',verify.validateToken, salaryStructure.getSalaryStructureById)


module.exports = router