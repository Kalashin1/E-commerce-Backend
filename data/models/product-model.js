const mongoose = require('mongoose');
const { productSchema } = require('../schemas/product-schema');

// our instance methods

// get a particular document
productSchema.methods.findFood = function(cb){
  return mongoose.model('product').findById(id, cb)
}

// static methods
// find all products that belong to a particular store
productSchema.statics.getStoreProducts = (store) => {
  return mongoose.model('product').find({store})
}

// delete a particular document
productSchema.statics.removeProduct = (_id) => {
  return mongoose.model('product').findByIdAndDelete({_id})
}



// Our product model
const Product = mongoose.model('product', productSchema)


module.exports = Product


// {
//   "name": "my awesome shoe",
//   "price":30,
//   "description": "Cillum labore labore esse magna. Aute deserunt nostrud non amet consectetur ea elit do. Eiusmod sit nostrud ullamco sit incididunt magna sit ullamco ullamco. Ad in aliqua anim esse id labore qui non ex non in ut. Magna exercitation nulla consectetur officia cillum consectetur nisi cillum anim cillum. Enim amet consequat deserunt nisi quis ad incididunt eiusmod velit anim consequat laboris.",
//   "category": "apparel",
//   "type": "shoe",
//   "store": "5ff36b82df308a13d4d3b0f5",
//   "promo": true
// }
