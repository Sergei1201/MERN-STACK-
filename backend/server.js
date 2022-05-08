const express = require('express')
const dotenv = require('dotenv').config()
const colors = require('color')
const port = process.env.PORT || 5000
const {errorHandler} = require('../backend/middleware/errorMiddleware')
const connectDB = require('./config/db')

const app = express()

connectDB()

// Setting up a middleware for parsing body when setting a new goal
app.use(express.json())
app.use(express.urlencoded({extended: false}))


app.use('/api/goals', require('../backend/routes/goalRoutes'))

app.use(errorHandler)

app.listen(port, () => console.log(`Server is running on port ${port}`)) 
