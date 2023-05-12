const mongoose = require('mongoose');


const FruitSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Must provide name'],
        trim: true,
        unique: true,
        maxlength: [25, 'Name cannot be more than 25 characters']
    },
    price: {
        type: Number,
        required: [true, 'Must provide price'],
        trim: true,
        default: 0
    },
    createdAt: {
        type: Date,
        trim: true,
        default: Date.now()
    },
    updatedAt: {
        type: Date,
        trim: true,
    },
})

module.exports = mongoose.model('Fruit', FruitSchema)