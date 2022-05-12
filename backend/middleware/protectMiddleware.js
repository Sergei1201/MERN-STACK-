// Creating protect middleware with jsonwebtoken
const jwt = require('jsonwebtoken')
const User = require('../model/userModel')
const asyncHandler = require('express-async-handler')

// Creating protect function
const protect = asyncHandler(async(req, res, next) => {
    // Making sure that in the headers there is a bearer token 
    let token
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Getting the token from an array with the index 1 
        token = req.headers.authorization.split(' ')[1]
            // Decoding the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
            // Getting the user from the token
        req.user = await User.findById(decoded.id).select('-password')
        next()
        } catch (error) {
            res.status(401)
            throw new Error('Not authorized') 
        }
    }
    if(!token) {
        res.status(401)
        throw new Error('Not authorized, no token')
    }
})

module.exports = {protect}