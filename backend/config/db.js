// Bringing in mongoose to deal with MongoDB
const mongoose = require('mongoose')

// Connecting to MongoDB

const connectDB = async() => {
    try {

        // Trying to hook to the database
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log(`MongoDB connected ${conn.connection.host}`)

    } catch (error) {
        console.log(error)
        process.exit(1)
        
    }
}

module.exports = connectDB