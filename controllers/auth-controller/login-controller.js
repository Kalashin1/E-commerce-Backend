const User = require('../../data/models/user-model.js')
const errorHelper = require('../helper/error-handler.js')
const jwtHelper = require('../helper/jwt-handler.js')


module.exports.loginUser = async function (req, res) {
  const {email, password} = req.body
  // console.log(req.body)

  try {
    const user = await User.login(email, password)
    const token = jwtHelper.createToken(user._id)
    res.cookie('jwt', token, {httpOnly: true, maxAge: jwtHelper.maxAge * 1000})
    res.json({name: user.name, id: user._id, email: user.email})
  } catch (err) {
    const errors = errorHelper.errorHandler(err)
    res.status(400).json(errors)
  }

}
