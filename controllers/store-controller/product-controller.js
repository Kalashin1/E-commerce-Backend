const  Product  = require('../../data/models/product-model')
const { errorHandler } = require('../helper/error-handler')
const mongoose = require('mongoose')

// CREATE PRODUCT METHOD
module.exports.createProduct = async (req, res) => {
  const {name, price, description, category, type, store, promo} = req.body
  try {
    const product = await Product.create({name, price, description, category, type, store, promo})
    console.log(product)
    res.json(product)
  } catch (err) {
    console.log(err.message)
    const error = errorHandler(err)
    console.log(error)
    res.json(error)
  }
}

// GET ALL PRODUCTS THAT BELONGS TO A PARTICULAR STORE
module.exports.getStoreProducts = async (req, res) => {
  const _id = req.params.id
  const products = await Product.getStoreProducts({_id})
  console.log(products)
  res.json(products)
}

// REMOVE A PRODUCT FROM A STORE
module.exports.removeProduct = async (req, res) => {
  const {id} = req.body
  const removedProduct = await Product.removeProduct(id)
  res.json({removedProduct})
}

// FIND PRODUCTS BASED ON A SEARCH TERM
module.exports.findProductByParams = async (req, res) => {
  const { param } = req.body
  console.log(param)
  try {
    const products = await Product.findProduct(param)
    res.json(products)
  } catch (err) {
    console.log(err)
  }
}