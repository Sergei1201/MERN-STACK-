const express = require('express')
const dotenv = require('dotenv').config()
const port = process.env.PORT || 5000
const {errorHandler} = require('../backend/middleware/errorMiddleware')

const app = express()

// Setting up a middleware for parsing body when setting a new goal
app.use(express.json())
app.use(express.urlencoded({extended: false}))


app.use('/api/goals', require('../backend/routes/goalRoutes'))

app.use(errorHandler)

app.listen(port, () => console.log(`Server is running on port ${port}`)) 
