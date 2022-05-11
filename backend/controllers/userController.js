const bcrypt = require('bcryptjs')
const User = require('../model/userModel')
const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')

const registerUser = asyncHandler(async(req, res) => {

    // Making sure that all fields are filled

    const {name, email, password} = req.body
    if(!name || !email || !password) {
        res.status(400)
        throw new Error('Please fill in all fields')
    }

    // Checking if the user exists

    const userExists = await User.findOne({email})
    if(userExists) {
        res.status(400)
        throw new Error('User already exists')
    }
    
    // Hashing the password
    
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // Creating a new user
    const newUser = await User.create({
        name,
        email,
        password: hashedPassword
    })

    if(newUser) {
        res.status(201).json({
            _id: newUser.id,
            name: newUser.name,
            email: newUser.email,
            password: newUser.password
        })
    } else
    res.status(400)
    throw new Error('Invalid credentials')
    

})

const loginUser = asyncHandler(async(req, res) => {
    res.json({message: 'Login'})
})

const getMe = asyncHandler(async(req, res) => {
    res.json({message: 'Get info'})
})

module.exports = {
    registerUser,
    loginUser,
    getMe
}