const { ObjectId } = require('bson')
const { Schema } = require('mongoose')

const invoiceSchema = new Schema({
  orderId: ObjectId,
  transactionId: {
    type: String,
    required: [true, 'please provide the transaction Id']
  },
  status: {
    type: String,
    default: 'filled'
  },
  updatedAt: {
    type: Date
  }
})

module.exports = invoiceSchema