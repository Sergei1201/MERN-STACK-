// Bringing the express router to create routes
const express = require('express')
const router = express.Router()
const {registerUser, loginUser, getMe} = require('../controllers/userController')
const {protect} = require('../middleware/protectMiddleware')


// Creating user routes
router.post('/', registerUser)
router.post('/login', loginUser)
router.get('/me', protect, getMe)

module.exports = router 