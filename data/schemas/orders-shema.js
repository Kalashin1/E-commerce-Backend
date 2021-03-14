const { Schema } = require('mongoose')
const { ObjectId } = require('mongodb')
const { isEmail } = require('../validators/validator')
//  ORDERS SCHEMA
const orderSchema = new Schema({
  items: {
    require: [true, 'please provide the items you want to make order on'],
    type: []
  },
  totalCharge: {
    type: Number
  },
  customer: {
    name: {
      type: String,
      required: [true, 'please provide a name for the customer']
    },
    email: {
      type: String,
      validate: [isEmail, 'please enter a valid email address']
      // required: [true, 'please provide a email for the customer']
    },
    id: {
      type: ObjectId,
      required: [true, 'please provide a id for the customer']
    }
  },
  deliveryAddress: {
    street: {
      type: String,
       required: [true, 'enter the street you are making the order to.'],
       minlength: 10
    },
    zip: {
      type: Number,
       required: [true, 'enter the zip of the place you are making the order to.'],
       minlength: 6
    },
    city: {
      type: String,
       required: [true, 'please enter the city you are making the order to.'],
       minlength: 3
    },
    state: {
      type: String,
       required: [true, 'please enter the state you are making the order to.'],
       minlength: 3
    },
    country: {
      type: String,
       required: [true, 'your address should carry a country.'],
       minlength: 3
    }
  },
  status: {
    type: String,
    default: 'pending'
  },
  createdAt: {
    type: String,
    default: (() => {
      const date = new Date();
      const year = date.getFullYear()
      const month = date.getMonth()
      const day = date.getDate()
      const hour = date.getHours()
      const min = date.getMinutes()
      const secs = date.getSeconds()
      
      return `${day}/${month}/${year} ${hour}:${min}:${secs}`
    })()
  }
})


module.exports = orderSchema
