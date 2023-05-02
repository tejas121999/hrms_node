const express = require("express")
const router = express.Router()
const employeeControler = require('../controllers/employee')
const verify = require("../middleware/JWT")


router.post('/getEmployee',verify.validateToken, employeeControler.getEmployee)
router.post('/addEmployee',verify.validateToken, employeeControler.addUser)
router.post('/editEployee',verify.validateToken, employeeControler.editEmployee)
router.post('/deleteEmployee',verify.validateToken, employeeControler.deleteEmployee)
router.post('/getEmployeeById',verify.validateToken, employeeControler.getEmployeeById)
router.post('/assignPackage',verify.validateToken, employeeControler.assignPackage)
router.post('/assignShift',verify.validateToken, employeeControler.assignShift)
router.post('/assignLeave',verify.validateToken, employeeControler.assignLeave)
router.post('/getEmployeePackages',verify.validateToken, employeeControler.getEmployeePackages)
router.post('/getLeaveofEmployee',verify.validateToken, employeeControler.getLeaveofEmployee)
router.post('/getShiftOfEmployee',verify.validateToken, employeeControler.getShiftOfEmployee)
router.post('/deletePackage',verify.validateToken, employeeControler.deletePackage)
router.post('/deleteShift',verify.validateToken, employeeControler.deleteShift)
router.post('/deleteLeve',verify.validateToken, employeeControler.deleteLeve)
router.post('/getEmployeebyDepartment',verify.validateToken, employeeControler.getEmployeebyDepartment)

router.post('/getEmpID',verify.validateToken, employeeControler.getEmpID)

module.exports = router

