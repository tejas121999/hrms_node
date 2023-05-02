const express = require("express")
const router = express.Router()
const creditLeaveController = require("../controllers/creditLeave")
const verify = require("../middleware/JWT")

router.post('/addCreditLeave', creditLeaveController.addCreditLeave);
router.post('/getAllCreditLeave', creditLeaveController.getAllCreditLeave);
router.post('/approveCreditLeave', creditLeaveController.approveCreditLeave);


module.exports = router