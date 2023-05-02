const express = require("express")
const router = express.Router()
const rigManifest = require('../controllers/rigManifest')
const verify = require("../middleware/JWT")

router.post('/getRigManifest',verify.validateToken, rigManifest.getRigManifest)
router.post('/addRigManifest',verify.validateToken, rigManifest.addRigManifest)
router.post('/updateRigManifest',verify.validateToken, rigManifest.updateRigManifest)
router.post('/getRigManifestById',verify.validateToken, rigManifest.getRigManifestById)
router.post('/deleteRigManifest',verify.validateToken, rigManifest.deleteRigManifest)
module.exports = router
