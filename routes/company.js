const express = require("express")
const router = express.Router()
const companyControler = require('../controllers/company')
const verify = require("../middleware/JWT")


router.post('/addCompany',verify.validateToken, companyControler.addCompany)
router.post('/getCompany',verify.validateToken, companyControler.getCompany)
router.post('/updateCompany',verify.validateToken, companyControler.editCompany)
router.post('/deleteCompany',verify.validateToken, companyControler.deleteCompany)
router.post('/getCompanyById',verify.validateToken, companyControler.companyGetById)

module.exports = router