const mongoose = require('mongoose');



const ItemSchema = new mongoose.Schema({
    name: {
        "type": "String",
        "required": [true, 'Must provide name'],
        "trim": true,
        "unique": true,
        "maxlength": [25, 'Name cannot be more than 25 characters']
    },
    price: {
        "type": "Number",
        "required": [true, 'Must provide price'],
        "trim": true,
        "default": 0
    },
    quantity: {
        "type": "Number",
        "required": [true, 'Must provide quantity'],
        "trim": true,
        "default": 0
    },
    storeID: {
        "type": mongoose.Schema.Types.ObjectId,
        "ref": "Store",
        "required": [true, 'Must provide store ID'],
    },
    createdAt: {
        "type": "Date",
        "trim": true,
        "default": Date.now()
    },
    updatedAt: {
        "type": "Date",
        "trim": true,
    },
})


const StoreSchema = new mongoose.Schema({
    name: {
        "type": "String",
        "required": [true, 'Must provide name'],
        "trim": true,
        "unique": true,
        "maxlength": [25, 'Name cannot be more than 25 characters']
    },
    address: {
        "type": "String",
        "required": [true, 'Must provide address'],
        "trim": true,
        "unique": true,
        "maxlength": [25, 'Address cannot be more than 25 characters']
    },
    items: [{
        "type": ItemSchema,
        "ref": "Item",
    }],
    createdAt: {
        "type": "Date",
        "trim": true,
        "default": Date.now()
    },
})

const Store = mongoose.model('Store', StoreSchema);
const Item = mongoose.model('Item', ItemSchema);

module.exports = {
    Store,
    Item
}
