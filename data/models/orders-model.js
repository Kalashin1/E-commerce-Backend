const mongoose = require('mongoose')
const orderSchema = require('../schemas/orders-shema.js')

// fetch all the orders that belong to a user
orderSchema.statics.findCustomerOrders = function(customerId) {
  return mongoose.model('order').find({customer: { name, email, id}})
}

// fetch all the orders that relates to a particular product
orderSchema.statics.findOdersMadeOnProduct = async function(product) {
  const orders = await mongoose.model('order').find()
  let foundOrders;
  orders.forEach(order => {
    order.items.forEach(item => {
      item.id = product.id
      foundOrders.push(order)
    })
  })
  return foundOrders
}

// fetch all pending orders 
orderSchema.statics.fetcOrdersFromStatus = function (status) {
  return this.find({status})
}

// find orders by date
orderSchema.statics.findOrderByDate = function (date) {
  return this.find(date)
}

// find by address 
orderSchema.statics.findOrderByAddress = function (locator) {
  // locator can be strret, zip, city, state, country
  return this.find(Object.values(address), locator)
}

const ordersModel = mongoose.model('order', orderSchema)

module.exports = ordersModel