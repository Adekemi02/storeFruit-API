const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    name: {
        "type": "String",
        "required": [true, 'Must provide name'],
        "trim": true,
        "maxlength": [45, 'Name cannot be more than 45 characters']
    },
    email: {
        "type": "String",
        "required": [true, 'Must provide email'],
        "trim": true,
        "unique": true,
        "maxlength": [25, 'Email cannot be more than 25 characters']
    },
    password_hash: {
        "type": "String",
        "required": [true, 'Must provide password'],
        "trim": true,
        "min": [6, 'Password must be at least 6 characters'],
        "max": 1024,
    },
    createdAt: {
        "type": "Date",
        "trim": true,
        "default": Date.now()
    },
})

module.exports = mongoose.model('User', userSchema)