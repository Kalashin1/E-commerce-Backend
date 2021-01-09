const User = require('../data/models/user-model.js');

// add to a users cart
module.exports.addToCart =  async function (req, res) {
  const {email, product} = req.body
  const user = await User.addToCart(email, product)
  res.json({id: user._id, email: user.email, name: user.name, cart : user.cart})
  // console.log(User)
}

// get a users cart
module.exports.fetchCart = async (req, res) => {
  const id = req.params.id
  const user = await User.findById({_id: id})
  if(user){
    res.json(user.cart)
  }
  else{
    throw Error('no user with that id')
  }
}

// remove an item from a users cart
module.exports.removeProductFromCart = async (req, res) => {
  const {userId, productId} = req.body
  console.log(userId, productId)
  const cart = await User.removeFromCart(userId, productId)
  res.json(cart)
}

// clear their cart
module.exports.clearCart = async (req, res) => {
  const id = req.params.id
  const cart = await User.clearCart(id)
  res.json(cart)
}

module.exports.modifyCart = async(req, res) => {
  const {userId, productId, modifier} = req.body
  const cart = await User.modifyCart(userId, productId, modifier)
  res.json(cart)
}
