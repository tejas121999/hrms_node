const express = require("express")
const router = express.Router()
const authControler = require('../controllers/auth/auth')

router.post('/createUSer', authControler.createUser)
router.post('/updateFirstSetup', authControler.updateFirstSetup)
router.post('/login', authControler.login)
router.post('/updateSetup', authControler.updateSetup)
router.post('/getSetup', authControler.getSetup)
router.post('/logout', authControler.logout)
router.post('/deleteuser', authControler.deleteUser)
router.post('/updateRole', authControler.updateRole)

router.post('/logoutNew', authControler.logOutNew)

module.exports = router