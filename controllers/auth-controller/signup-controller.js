const user = require('../../data/models/user-model.js')
const helper = require('../helper/error-handler.js')
const jwtHelper = require('../helper/jwt-handler.js')


module.exports.signUserUp = async function(req, res) {
  const {email, name, password} = req.body

  try {
    const newUser = await user.create({email, name, password})
    const token = jwtHelper.createToken(user._id)
    res.cookie('jwt', token, {httpOnly: true, maxAge: jwtHelper.maxAge * 1000})
    res.json({
      name: newUser.name, 
      id: newUser._id,
      email: newUser.email,
      cart: newUser.cart,
      store: newUser.store
    })
    // console.log(newUser)
  } catch (err) {
    // console.log(err.message)
    let errors = helper.errorHandler(err)
    res.json(errors)
  }
  res.send('user signed up')
}

