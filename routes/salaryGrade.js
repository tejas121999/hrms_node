const express = require("express")
const router = express.Router()
const salaryGradeControler = require('../controllers/salaryGrade')
const verify = require("../middleware/JWT")

router.post('/getSalaryGrade',verify.validateToken, salaryGradeControler.getSalaryGrade)
router.post('/addSalaryGrade',verify.validateToken, salaryGradeControler.addSalaryGrade)
router.post('/updateSalaryGrade',verify.validateToken, salaryGradeControler.updateSalaryGrade)
router.post('/deleteSalaryGrade',verify.validateToken, salaryGradeControler.deleteSalaryComponent)
router.post('/salaryGradeGetById',verify.validateToken, salaryGradeControler.getSalaryGradeById)

module.exports = router