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
        password: hashedPassword,
    })

    if(newUser) {
        res.status(201).json({
            _id: newUser.id,
            name: newUser.name,
            email: newUser.email,
            token: generateToken(newUser.id)
        })
    } else
    res.status(400)
    throw new Error('Invalid credentials')
    

})

const loginUser = asyncHandler(async(req, res) => {
    const {email, password} = req.body
    if(!email || !password) {
        res.status(400)
        throw new Error('Please add your credentials')
    }
    // Finding a user from the database in order to compare him to the user that has been passed into the fields and checking if those match
    const user = await User.findOne({email})
    if(user && (await bcrypt.compare(password, user.password))) {
        res.status(200).json({
            _id: user.id,
            name: user.name,
            email: user.email,
           token: generateToken(user.id)

        })
    } else {
        res.status(400)
        throw new Error('Invalid credentials')
    }

})

const getMe = asyncHandler(async(req, res) => {
    const {_id, name, email} = await User.findById(req.user.id)
    res.status(200).json({
        id: _id,
        name,
        email
    })
})

// Generating json web token
const generateToken = (id) => {
return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: '30d'})
}


module.exports = {
    registerUser,
    loginUser,
    getMe
}