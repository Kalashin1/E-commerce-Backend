const mongoose = require('mongoose');
const invoiceSchema = require('../schemas/invoice-schema');



const invoiceModel = mongoose.model('invoice', invoiceSchema)

module.exports = invoiceModel