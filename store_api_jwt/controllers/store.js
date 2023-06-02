const {Store, Item} = require('../models/products');
const {StatusCodes} = require('http-status-codes');
const {storesValidation, productsValidation} = require('../controllers/validation');



const getStores = async(req, res) => {
    const stores = await Store.find({});
    res.status(StatusCodes.OK).json({stores});
}

const createStore = async(req, res) => {
    // validate the data before we create a store
    const {error} = storesValidation(req.body);
    if(error){
        return res.status(StatusCodes.BAD_REQUEST).json({msg: error.details[0].message});
    }

    const store = await Store.create(req.body);
    res.status(StatusCodes.CREATED).json({store});
}

const getStoreByID = async(req, res) => {
    const {id:storeID} = req.params;
    const store = await Store.findOne({_id: storeID});

    if(!store){
        return res.status(StatusCodes.NOT_FOUND).json({msg: `No store with id: ${storeID}`});
    }

    res.status(StatusCodes.OK).json({store});
}

const updateStore = async(req, res) => {
    const {id:storeID} = req.params;
    const store = await Store.findByIdAndUpdate({_id:storeID}, req.body, {
        new: true,
        runValidators: true
    });

    if(!store){
        return res.status(StatusCodes.NOT_FOUND).json({msg: `No store with id: ${storeID}`});
    }

    res.status(StatusCodes.OK).json({store});
}

const deleteStore = async(req, res) => {
    const {id:storeID} = req.params;
    const store = await Store.findByIdAndDelete({_id:storeID});

    if(!store){
        return res.status(StatusCodes.NOT_FOUND).json({msg: `No store with id: ${storeID}`});
    }

    res.status(StatusCodes.OK).json({store:null, msg: `Store with id: ${storeID} deleted`});
}

const getItems = async(req, res) => {
    const {id:storeID} = req.params;
    const store = await Store.findOne({_id: storeID});

    if(!store){
        return res.status(StatusCodes.NOT_FOUND).json({msg: `No store with id: ${storeID}`});
    }

    const items = await Item.find({});
    res.status(StatusCodes.OK).json({items});
}

const getAllItems = async(req, res) => {
    const items = await Item.find({});
    res.status(StatusCodes.OK).json({items});
}

const createItem = async(req, res) => {
    // validate the data before we create an item
    const {error} = productsValidation(req.body);
    if(error){
        return res.status(StatusCodes.BAD_REQUEST).json({msg: error.details[0].message});
    }

    const {id:storeID} = req.params;
    const store = await Store.findOne({_id: storeID});

    if(!store){
        return res.status(StatusCodes.NOT_FOUND).json({msg: `No store with id: ${storeID}`});
    }

    const item = await Item.create({...req.body, store: storeID});

    // add item to store
    store.items.push(item);
    await store.save();

    res.status(StatusCodes.CREATED).json({item});
}

const getItemByID = async(req, res) => {
    const {itemID:itemID} = req.params;
    const item = await Item.findOne({_id: itemID});

    if(!item){
        return res.status(StatusCodes.NOT_FOUND).json({msg: `No item with id: ${itemID}`});
    }

    res.status(StatusCodes.OK).json({item});
}

const updateItem = async(req, res) => {
    const {itemID:itemID} = req.params;
    const item = await Item.findOneAndUpdate({_id:itemID}, req.body, {
        new: true,
        runValidators: true
    });

    if(!item){
        return res.status(StatusCodes.NOT_FOUND).json({msg: `No item with id: ${itemID}`});
    }

    res.status(StatusCodes.OK).json({item});
}

const deleteItem = async(req, res) => {
    const {itemID:itemID} = req.params;
    const item = await Item.findOneAndDelete({_id:itemID});

    if(!item){
        return res.status(StatusCodes.NOT_FOUND).json({msg: `No item with id: ${itemID}`});
    }

    res.status(StatusCodes.OK).json({item:null, msg: `Item with id: ${itemID} deleted`});
}

module.exports = {
    getStores,
    createStore,
    getStoreByID,
    updateStore,
    deleteStore,
    getAllItems,
    getItems,
    createItem,
    getItemByID,
    updateItem,
    deleteItem
}