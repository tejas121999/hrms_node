const express = require("express")
const router = express.Router()
const branchControler = require("../controllers/branch")
const verify = require("../middleware/JWT")

router.post('/getBranch',verify.validateToken,branchControler.getBranch)
router.post('/addBranch',verify.validateToken, branchControler.addBranch)
router.post('/updateBranch',verify.validateToken, branchControler.updateBranch)
router.post('/deleteBranch',verify.validateToken, branchControler.deleteBranch)
router.post('/branchGetById',verify.validateToken, branchControler.branchGetById)

module.exports = router