const mongoose = require('mongoose')
const mySchemas = require('./shemas.js')



const product = mongoose.Model('product', mySchemas.productSchema)
// order model
const order = mongoose.Model('order', mySchemas.orderSchema)

console.log(mySchemas)
