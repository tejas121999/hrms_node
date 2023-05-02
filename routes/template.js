const express = require("express")
const router = express.Router()
const templateController = require('../controllers/template')
const verify = require("../middleware/JWT")

router.post('/getTemplate', templateController.getTemplate)
router.post('/addTemplate', templateController.addTemplate)
router.post('/editTemplate', templateController.editTemplate)
router.post('/deleteTemplate', templateController.deleteTemplate)

router.post('/getTemplateField', templateController.getTemplateField)


module.exports = router

