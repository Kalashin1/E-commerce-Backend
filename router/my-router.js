const { Router } = require('express')
const { signUserUp } = require('../controllers/auth-controller/signup-controller.js')
const { loginUser } = require('../controllers/auth-controller/login-controller.js')
const { logout } = require('../controllers/auth-controller/logout')
const { validateUser } = require('../controllers/validate-user')
const { addToCart, fetchCart, removeProductFromCart, clearCart } = require('../controllers/cart-controller')
const { createStore, fetchStore } = require('../controllers/store-controller/store')
const { createProduct, getStoreProducts } = require('../controllers/store-controller/product-controller')
const router = Router()

router.post('/login', loginUser)
router.get('/logout', logout)
router.post('/signup', signUserUp)
router.post('/cart', validateUser, addToCart)
router.get('/cart-clear/:id', validateUser, clearCart)
router.get('/cart-remove', validateUser, removeProductFromCart)
router.get('/cart/:id', validateUser, fetchCart)
router.post('/create-store', validateUser, createStore)
router.get('/store/:id', validateUser, fetchStore)
router.post('/product', validateUser, createProduct)
router.get('/products/:id', validateUser, getStoreProducts)
module.exports = router

// 5ff2f4c03a02780c0cb914ca -- user

// 5ff361ffded5ed14545bf07b -- store 
