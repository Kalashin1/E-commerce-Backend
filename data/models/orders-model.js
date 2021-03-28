const mongoose = require('mongoose')
const orderSchema = require('../schemas/orders-shema.js')

// fetch all the orders that belong to a user
orderSchema.statics.findCustomerOrders = function(customerId) {
  return mongoose.model('order').find({customer: { name, email, id}})
}

// fetch all the orders that relates to a particular product
orderSchema.statics.findOdersMadeOnProduct = async function(product) {
  const orders = await mongoose.model('order').find()
  let foundOrders = [];
  orders.forEach(order => {
    order.items.forEach(item => {
      item.id = product.id
      foundOrders.push(order)
    })
  })
  return foundOrders
}

// fetch all pending orders 
orderSchema.statics.fetchOrderByStatus = function (status) {
  return this.find({status})
}

// find orders by date
orderSchema.statics.findOrderByDate = function (date) {
  const orders = this.find({ createdAt: date })
}

// find by address 
orderSchema.statics.findOrderByLocation = async function (state) {
  // locator can be strret, zip, city, state, country
  const orders = await mongoose.model('order').find()
  let foundOrders = [];
  orders.forEach(order => {
    const FoundOrder = Object.values(order.deliveryAddress).find( location => location === state)
    FoundOrder ? foundOrders.push(order) : foundOrders.push()
  })
  return foundOrders
}

// find order by customer info
orderSchema.statics.findOrderByCustomer = function ({customer}) {
  return this.find(customer)
}

const ordersModel = mongoose.model('order', orderSchema)

module.exports = ordersModel