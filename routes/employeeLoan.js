const express = require("express")
const router = express.Router()
const employeeLoanControler = require('../controllers/employeeLoan')
const verify = require("../middleware/JWT")

router.post('/getEmployeeLoan',verify.validateToken, employeeLoanControler.getEmployeeLoan)
router.post('/addEmpLoan',verify.validateToken, employeeLoanControler.addEmpLoan)
router.post("/editEmpLoan",verify.validateToken, employeeLoanControler.editEmpLoan)
router.post('/deleteEmpLoan',verify.validateToken, employeeLoanControler.deleteEmpLoan)
router.post('/getLoanByID',verify.validateToken, employeeLoanControler.getLoanByID)

module.exports = router