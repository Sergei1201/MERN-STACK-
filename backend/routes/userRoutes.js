// Bringing the express router to create routes
const express = require('express')
const router = express.Router()
const {registerUser, loginUser, getMe} = require('../controllers/userController')


// Creating user routes
router.post('/', registerUser)
router.post('/login', loginUser)
router.get('/me', getMe)

module.exports = router 