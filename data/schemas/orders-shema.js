const { Schema } = require('mongoose')
const productSchema = require('./product-schema')
//  ORDERS SCHEMA
const orderSchema = new Schema({
  items: [productSchema],
  length: {
    type: Number
  },
  totalCharge: {
    type: Number
  },
  customer: {
    type: Number
  },
  DeliveryAddress: {
    street: {
      type: String,
       required: true,
       minlength: 10
    },
    zip: {
      type: Number,
       required: true,
       minlength: 6
    },
    city: {
      type: String,
       required: true
      , minlength: 3
    },
    state: {
      type: String,
       required: true,
       minlength: 3
    },
    country: {
      type: String,
       required: true,
       minlength: 3
    }
  },
  status: {type: String}
})


const mySchemas = {productSchema, orderSchema}

module.exports = mySchemas
