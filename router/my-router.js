const { Router } = require('express')
const { signUserUp } = require('../controllers/auth-controller/signup-controller.js')
const { loginUser } = require('../controllers/auth-controller/login-controller.js')
const { logout } = require('../controllers/auth-controller/logout')
const { validateUser } = require('../controllers/validate-user')
const { addToCart, fetchCart, removeProductFromCart, clearCart, modifyCart } = require('../controllers/cart-controller')
const { createStore, fetchStore } = require('../controllers/store-controller/store')
const { createProduct, getStoreProducts, removeProduct } = require('../controllers/store-controller/product-controller')
const router = Router()

router.post('/login', loginUser)
router.get('/logout', logout)
router.post('/signup', signUserUp)
// add to their cart
router.post('/cart', validateUser, addToCart)
// clear the contents of their cart
router.get('/cart-clear/:id', validateUser, clearCart)
// remove an item from their cart
router.get('/cart-remove', validateUser, removeProductFromCart)
// get the contents of their cart
router.get('/cart/:id', validateUser, fetchCart)
// modify a product in a user's cart
router.patch('/cart', validateUser, modifyCart)
// create a store
router.post('/store', validateUser, createStore)
// get a particular store of a user
router.get('/store/:id', validateUser, fetchStore)
// create a product
router.post('/product', validateUser, createProduct)
// delete a product
router.delete('/product', validateUser, removeProduct)
// the products associated with a store based on the id of the store
router.get('/products/:id', validateUser, getStoreProducts)
module.exports = router

// 5ff2f4c03a02780c0cb914ca -- user

// 5ff361ffded5ed14545bf07b -- store
