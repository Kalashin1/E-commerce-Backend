const { ObjectId } = require('mongodb')
const { Schema } = require('mongoose')
const { productSchema } = require('./product-schema')
const {isEmail, isPassowrd} = require('../validators/validator')

// USER SCHEMA
const userSchema = new Schema({
  name : {
    type: String,
    required: [true, 'please enter your name'],
    minlength: 3
  },
  email:
  {
    type: String,
    unique: true,
    required: [true, 'please enter an email'],
    validate: [isEmail, 'please enter a valid email']
  },
  password: {
    type: String,
     required: [true, 'please enter a password'],
     minlength: [8, 'passowrd must be at least 8 characters long'],
     validate: [isPassowrd, 'password should contain an uppercase, lowercase letter and a number']
  },
  isAmdin: {
    type: Boolean,
    default: false
  },
  // address: {
  //   street: {
  //     type: String,
  //     required: false,
  //     minlength: 10
  //   },
  //   zip: {
  //     type: Number,
  //     required: false,
  //     minlength: 6
  //   },
  //   city: {
  //     type: String,
  //     required: false,
  //     minlength: 3
  //   },
  //   state: {
  //     type: String,
  //     required: false,
  //     minlength: 3
  //   },
  //   country: {
  //     type: String,
  //     required: false,
  //     minlength: 3
  //   }
  // },
  cart: {
   products: [],
   
  },
  store: {
    type: ObjectId
  },
  // orders: {
  //   type: Array
  // },
  // invoice: {
  //    type: Array 
 // }
})


module.exports = userSchema
