const express = require("express")
const router = express.Router()
const candidateController = require('../controllers/candidate')
const verify = require("../middleware/JWT")

router.post('/getCandiate',verify.validateToken, candidateController.getCandidate)
router.post('/addCandiate',verify.validateToken, candidateController.addCandidate)
router.post('/editCandiate',verify.validateToken, candidateController.editCandidate)
router.post('/deleteCandiate',verify.validateToken, candidateController.deleteCandidate)
router.post('/getCandiateById',verify.validateToken, candidateController.getCandidateById)
router.post('/addCandidateAsEmployee',verify.validateToken, candidateController.addCandidateAsEmployee)

module.exports = router

