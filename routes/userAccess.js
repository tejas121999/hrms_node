const express = require("express")
const router = express.Router()
const userAccessControler = require("../controllers/userAccess")
const accessMasterControler = require("../controllers/access_master")
const { route } = require("./roleMaster")
const verify = require("../middleware/JWT")

router.post('/getUserAccess',verify.validateToken, userAccessControler.getUserAccess)
router.post('/addAccess',verify.validateToken, userAccessControler.addAccess)
router.post('/getdefaultAccess',verify.validateToken, userAccessControler.getdefaultAccess)
router.post('/getUserAccessById',verify.validateToken, userAccessControler.getUserAccessById)
router.post('/updateAccess',verify.validateToken, userAccessControler.updateUserAccessById)


// new Access Master API route

router.post('/addAccessToUser', accessMasterControler.add)

module.exports = router