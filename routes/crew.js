const express = require("express")
const router = express.Router()
const crewController = require('../controllers/crew')
const verify = require("../middleware/JWT")

router.post('/get', crewController.getCrew)
router.post('/getSingle',verify.validateToken, crewController.getSingleCrew)
router.post('/add', crewController.addCrew)
router.post('/editCrewEmployee', crewController.editCrewEmployee)
router.post('/deleteCrewEmployees', crewController.deleteCrewEmployees)





module.exports = router