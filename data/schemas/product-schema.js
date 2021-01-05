const { Schema } = require('mongoose')
const { ObjectId } = require('mongodb')

// PRODUCT SHCEMA
const productSchema = new Schema({
  name: {
    type: String,
    required: [true, 'please provide a name for your product'],
     minlength: [3, 'name of product cannot be less than 3 characters']
  },
  price: {
    type: Number,
    required: [true, 'please provide a price for your product']
  },
  description: {
    type: String,
    required: [true, 'please provide a little discription of your product'],
    minlength: [20, 'Your description cannot be less than 500 characters'],
    maxlength: [800, 'your description cannot be more than 800 characters']
  },
  imgUrl: {
    type: String
  },
  orders: {
    type: Number
  },
  category: {
    type: String,
    required: [true, 'please chose the category of your product']
  },
  type: {
    type: String,
    required: [true, 'please chose the type of your product']
  },
  store: {
    type: ObjectId,
    required: [true, 'Please enter your store id']
  },
  promo: {
    type: Boolean,
    required: [true, 'please specify if this product is on promo or not']
  }
})

module.exports.productSchema = productSchema

