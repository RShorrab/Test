const { auth } = require('../middlewear/auth')
const { signup, signin  , profile} = require('../services/user.services')
const { signupValidation } = require('../validation/signup.validation')

const router = require('express').Router()

router.post('/signup', signupValidation, signup)
router.post('/signin', signin)
router.get('/profile',auth() ,profile)




module.exports = router