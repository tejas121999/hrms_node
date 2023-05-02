const express = require("express")
const router = express.Router()
const loanControler = require('../controllers/loan')
const verify = require("../middleware/JWT")

router.post('/getLoan',verify.validateToken, loanControler.getLoan)
router.post('/addLoan',verify.validateToken, loanControler.addLoan)
router.post('/editLoan',verify.validateToken, loanControler.editLoan)
router.post('/deleteLoan',verify.validateToken, loanControler.deleteLoan)

module.exports = router