const mongoose = require('mongoose');
const { productSchema } = require('../schemas/shemas.js');

const mySchema = require('../schemas/shemas.js')

// getting our product schema
productSchema = mySchema.productSchema;

// our instance methods

// get a particular document
productSchema.methods.findFood = function(cb){
  return mongoose.model('product').findById(id, cb)
}

// static methods
// find all foods on promo
