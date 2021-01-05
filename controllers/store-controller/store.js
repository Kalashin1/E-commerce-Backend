const Store = require('../../data/models/store-model')
const { errorHandler } = require('../helper/error-handler')
const mongoose = require('mongoose')

module.exports.createStore = async (req, res) => {
  const {email, name, owner} = req.body
  try{
    const store = await Store.create({email, name, owner})
    res.json(store)
  }
  catch (err){
    const error = errorHandler(err)
    res.json(error)
  }
}


module.exports.fetchStore = async (req, res) => {
  const _id = req.params.id
  const store = await mongoose.model('store').findById({_id})
  res.json(store)
}