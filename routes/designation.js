const express = require("express")
const router = express.Router()
const designationControler = require("../controllers/designation")
const verify = require("../middleware/JWT")

router.post('/getDesignation',verify.validateToken, designationControler.getDesignation)
router.post('/addDesignation',verify.validateToken, designationControler.addDesignation)
router.post('/editDesignation',verify.validateToken, designationControler.editDesignation)
router.post('/getDesignationById',verify.validateToken, designationControler.getDesignationById)
router.post('/deleteDesigbation',verify.validateToken, designationControler.deleteDesignation)

module.exports = router