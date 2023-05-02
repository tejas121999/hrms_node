const express = require("express")
const router = express.Router()
const departmentControler = require("../controllers/department")
const verify = require("../middleware/JWT")

router.post('/getDepartment',verify.validateToken, departmentControler.getDepartment)
router.post("/addDepartment",verify.validateToken, departmentControler.addDepartment)
router.post('/eidtDepartment',verify.validateToken, departmentControler.eidtDepartment)
router.post('/deletedepartment',verify.validateToken, departmentControler.deletedepartment)
router.post('/departmentGetById',verify.validateToken, departmentControler.departmentGetById)
router.post('/getManagerName',verify.validateToken, departmentControler.getManagerName)
router.post('/getDepartmentCode',verify.validateToken,departmentControler.getDepartmentCode)

router.post('/getDepartmentManagerName',verify.validateToken,departmentControler.getDepartmentManagerName)

module.exports = router