const express = require('express');
const app = express();
const tasks = require('./store_api/routes/tasks');
const connectDB = require('./store_api/db/connect');
require('dotenv').config()
const notFound = require('./store_api/middleware/not_found')
const errorHandlerMiddleware = require('./store_api/middleware/error_handler')
require('express-async-errors')


// middleware
app.use(express.json())

// routes
app.use('/api/v1/tasks', tasks)

app.use(notFound)

app.use(errorHandlerMiddleware)


// connect to db
const port = process.env.PORT || 5000;
const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, console.log(`Server is running on port ${port}`));
    
    } catch (error) {
    console.log(error)
    }
}

start()

