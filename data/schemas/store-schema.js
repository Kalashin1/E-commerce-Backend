const { ObjectID } = require('mongodb')
const {productSchema} = require('./product-schema')
const { Schema } = require('mongoose')
const {isEmail, isPassowrd} = require('../validators/validator')

const storeSchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: [true, 'Please provide a name for your store'],
    minlength: [3, 'name of your store must be at least 3 characters long']
  },
  owner: {
    type: ObjectID,
    required: [true, 'please provide a user id for the store']
  },
  email: {
    type: String,
    required: [true, 'You have to provide an email for your store'],
    validate: [isEmail, 'Please enter a valid email address']
  },
  transactions: {
    payments: {
      type: []
    },
    orders: {
      type: []
    },
    invoice: {
    type: []
    }
  },
  withdrawal: {
    method: {
      type: String
    },
    address: {
      type: Number
    }
  }
})

module.exports = storeSchema
