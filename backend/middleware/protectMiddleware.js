// Creating a middleware for protecting routes so that not every user is able to view somebody's goals
// Using jsonwebtoken to protect the routes
const jwt = require('jsonwebtoken')
const User = require('../model/userModel')
const asyncHandler = require('express-async-handler')

const protect = asyncHandler(async(req, res, next) => {
    let token
    try {
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        // Getting token from the headers by splitting an array with 'Bearer' choosing index 1
        token = req.headers.authorization.split(' ')[1]
        // Verifying the token by using it with a secret
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        // Getting a user from the token
        req.user = await User.findById(decoded.id).select('-password')
        next()
    }
        
    } catch (error) {
        console.log(error)
        res.status(401)
        throw new Error('Not Authorized') 
    }
     if(!token) {
         res.status(401)
         throw new Error('Not Authorized, no token')
     }
})

module.exports = {protect}