const { Router } = require('express')


const { signUserUp } = require('../controllers/auth-controller/signup-controller.js')
const { loginUser } = require('../controllers/auth-controller/login-controller.js')
const { logout } = require('../controllers/auth-controller/logout')
const { validateUser } = require('../controllers/validate-user')


const { addToCart, fetchCart,  clearCart } = require('../controllers/cart-controller')
const { removeProductFromCart, modifyCart } = require('../controllers/cart-controller')


const { createStore, fetchStore } = require('../controllers/store-controller/store')


const { createProduct, getStoreProducts} = require('../controllers/store-controller/product-controller')
const { removeProduct } = require('../controllers/store-controller/product-controller')


const { makeOrder, fetchAllOrders } = require( '../controllers/order-controller/orders-controller')
const { fetchOrderByStatus, fetchOrderByCustomer } = require( '../controllers/order-controller/orders-controller')


const { createInvoice } = require('../controllers/invoice-controller/invoice-controller')

const router = Router()

// auth routes
router.post('/login', loginUser)
router.get('/logout', logout)
router.post('/signup', signUserUp)


// CART ROUTES
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


// STORE ROUTES
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


// ORDERS ROUTES
// create an order
router.post('/order', validateUser, makeOrder)
// retrieve all orders
router.get('/orders', validateUser, fetchAllOrders)
// retrieve orders based on status
router.get('/orders/:status', validateUser, fetchOrderByStatus)
// retrieve orders based on the customer
router.get('/orders/by/customer', validateUser, fetchOrderByCustomer)

// INVOICE ROUTES
router.post('/invoice', validateUser, createInvoice)

module.exports = router