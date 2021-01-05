const jwt = require('jsonwebtoken')
const User = require('../data/models/user-model')

// check if token exists and is valid
const validateUser = (req, res, next) => {
  const token = req.cookies.jwt
  if(token){
    jwt.verify(token, 'my secrete key', (err, decodedToken) => {
      if(err){
        // console.log(err.message)
        res.send(err.message)
      }
      else{
        // console.log(decodedToken)
        next()
      }
    })
  }
  else{
    // console.log('no cookie')
    res.json('no cookie')
  }
}
// check current user
const getUser = (req, res) => {
  const token = req.cookies.jwt

  if (token) {
    jwt.verify(token, 'my secrete key', async (err, decodedToken) => {
      if(err){
        console.log(err);
      }
      else{
        // console.log(decodedToken)
        let user = await User.findById(decodedToken.id)
        res.json({name: user.name, email: user.email, id: user._id, cart: user.cart, store: user.store})

      }
    })
  }
  else{
    // console.log('no cookie')
    res.json('no cookie')
  }
}

module.exports = { validateUser, getUser }
