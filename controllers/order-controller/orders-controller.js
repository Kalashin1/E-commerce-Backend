const ordersModel = require('../../data/models/orders-model')
const helper = require('../helper/error-handler.js')

// create an order
module.exports.makeOrder = async (req, res) => {
  const { items, customer, deliveryAddress } = req.body
  console.log(items, customer, deliveryAddress)
  try {
    const Order = await ordersModel.create({ items, customer, deliveryAddress })
    res.json(Order)
  }
  catch (err) {
    console.log(err)
    let errors = helper.errorHandler(err)
    res.json(errors)
  }
}

// retrieve all the orders
module.exports.fetchAllOrders = async (req, res) => {
  try{
    const orders = await ordersModel.find({})
    res.json(orders)
  }
  catch (err) {
    console.log(err)
    let errors = helper.errorHandler(err)
    res.json(errors)
  }
}

// retrieve orders based on status of the order
module.exports.fetchOrderByStatus  = async (req, res) => {
  const { status } = req.params
  try {
    const orders = await ordersModel.fetchOrderByStatus(status)
    res.json(orders)
  }
  catch (err) {
    console.log(err)
    let errors = helper.errorHandler(err)
    res.json(errors)
  }
}

// find orders that belong to a customer 
module.exports.fetchOrderByCustomer = async (req, res) => {
  const  customer = req.body
  try {
    const orders = await ordersModel.findOrderByCustomer(customer)
    res.json(orders)
  } catch (err) {
    console.log(err)
    let errors = helper.errorHandler(err)
    res.json(errors)
  }
}