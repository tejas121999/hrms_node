const express = require("express")
const router = express.Router()
const roleMasterControler = require('../controllers/roleMaster')

const roleMasterNewcontroller = require('../controllers/roleMasterNew')
const verify = require("../middleware/JWT")

router.post("/getRole",verify.validateToken, roleMasterControler.getRole)
router.post('/addRole',verify.validateToken, roleMasterControler.addRole)
router.post('/editRole',verify.validateToken, roleMasterControler.editRole)
router.post('/deleteRole',verify.validateToken, roleMasterControler.deleteRole)
router.post('/clone',verify.validateToken, roleMasterControler.cloneRole)
router.post('/editAccess',verify.validateToken, roleMasterControler.editAccess)
router.post('/getAccessByroleId',verify.validateToken, roleMasterControler.getAccessByroleId)

// new ROleMaster Api 

router.post('/getRoleNew',verify.validateToken,roleMasterNewcontroller.getRoleNew)
router.post('/addRoleNew',verify.validateToken, roleMasterNewcontroller.addRole)
router.post('/newclone',verify.validateToken,roleMasterNewcontroller.cloneRole)

module.exports = router