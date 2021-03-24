const invoiceModel = require('../../data/models/invoice-model')
const helper = require('../helper/error-handler.js')

module.exports.createInvoice = async (req, res) => {
  const { orderId, transactionId } = req.body
  try {
    const invoice = await invoiceModel.create({ orderId, transactionId})
    res.json(invoice)
  } catch (err) {
    console.log(err)
    let errors = helper.errorHandler(err)
    res.json(errors)
  }
}