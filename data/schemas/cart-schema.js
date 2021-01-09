const { ObjectID } = require('mongodb')
const { Schema } = require('mongoose')
const { productSchema } = require('./product-schema')

const cartSchema = new Schema({
  products: [productSchema]
})

cartSchema.virtual('total').get(function(){
  let total
  this.products.forEach( product => {
    total += product.total
  })
})

cartSchema.virtual('length').get(function(){
  return this.products.length
})

module.exports.cartSchema = cartSchema
