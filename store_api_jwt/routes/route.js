const express = require('express')
const router = express.Router()

const {signUpAUTH, loginAuth} = require('../controllers/auth')
const verifyToken = require('../controllers/verify_jwt')

const {
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
} = require('../controllers/store')


router.route('/auth/signup').post(signUpAUTH)
router.route('/auth/login').post(loginAuth)
router.route('/stores').get(verifyToken, getStores)
router.route('/stores').post(verifyToken, createStore)
router.route('/items').get(verifyToken, getAllItems)
router.route('/items/:itemID').get(verifyToken, getItemByID).patch(verifyToken, updateItem).delete(verifyToken, deleteItem)
router.route('/stores/:id').get(verifyToken, getStoreByID).patch(verifyToken, updateStore).delete(verifyToken, deleteStore)
router.route('/stores/:id/items').get(verifyToken, getItems).post(verifyToken, createItem)
// router.route('/stores/:id/items/:itemID').get(verifyToken, getItemByID).patch(verifyToken, updateItem).delete(verifyToken, deleteItem)

module.exports = router;