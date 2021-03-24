const ordersModel = require('../../data/models/orders-model')
const helper = require('../helper/error-handler.js')

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