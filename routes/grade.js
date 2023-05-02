const express = require("express")
const router = express.Router()
const gradeControler = require('../controllers/grade')
const verify = require("../middleware/JWT")

router.post('/getGrade',verify.validateToken, gradeControler.getGrade)
router.post('/addGrade',verify.validateToken, gradeControler.addGrade)
router.post('/updateGrade',verify.validateToken, gradeControler.updateGrade)
router.post('/getGradeById',verify.validateToken, gradeControler.getGradeById)
router.post('/deleteGrade',verify.validateToken, gradeControler.deleteGrade)

module.exports = router