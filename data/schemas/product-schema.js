const { Schema } = require('mongoose')


// PRODUCT SHCEMA
const productSchema = new Schema({
  name: {
    type: String,
    required: true,
     minlength: 3
  },
  price: {
    type: Number,
    required: true,
    minlength: 1
},
  descripttion: {
    type: String,
    required: true,
    minlength: 20,
    maxlength: 200
  },
  imgUrl: {
    type: String
  },
  orders: {
    type: Number
  },
  category: {
    type: String
  },
  type: {
    type: String
  },
  promo: {
    type: Boolean
  }
})
