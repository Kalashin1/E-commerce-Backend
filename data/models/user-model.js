const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const UserSchema = require('../schemas/user-schema.js')

// salt rounds
const saltRounds = 10

// getting user schema
const userSchema = UserSchema

// instance methods of userSchema

// make a new order
userSchema.methods.makeOrder = function (cb) {
  return mongoose.model('user').findById(id, cb)
}
// update Info
userSchema.methods.updateInfo = function(cb){
  return mongoose.model('user').findById(id, cb)
}



// STATIC METHODS
// loin user
userSchema.statics.login = async function (email, password){
  // ensure the email exists inside the database
  const user = await this.findOne({email})
  // if user with the email exists then compare passowrds
  if(user){
    const result = await bcrypt.compare(password, user.password)
    if(result){
      return user
    }
    else{
      throw Error('incorrect password')
    }
  }
  throw Error('incorrect email, no user exists for this email')
}

// add to cart
userSchema.statics.addToCart = async function (email, product) {
  const user = await mongoose.model('user').findOne({email})
  if(user){
    user.cart.items = [...user.cart.items, product]
    user.cart.length +=1
    user.cart.total = parseInt(user.cart.total) + product.price
    console.log(user.cart.items, user.cart.length, product)
    user.save()
    return user
  }
  else{
    throw Error('no user with that email')
  }
}

// remove from cart
userSchema.statics.removeFromCart = async (_id, productId) => {
  const user = await mongoose.model('user').findById({_id})
  if(user){
    let removedProduct = user.cart.items.find(product => product.id === productId)
    user.cart.items = user.cart.items.filter(product => product.id !== productId)
    user.cart.total -= removedProduct.price
    user.cart.length -= 1
    user.save()
    console.log(user.cart)
    return user.cart
  }
  else{
    throw Error('no user with that id')
  }
}

// clear cart
userSchema.statics.clearCart = async (_id) => {
  const user = await mongoose.model('user').findById({_id})
  if(user){
    user.cart.items = []
    user.cart.length = 0;
    user.cart.total = 0
    user.save()
    return user.cart
  }
  else{
    throw Error('no user with that id')
  }
}

userSchema.pre('save', async function(next){
  if(this.password.length < 15){
    this.password = await bcrypt.hash(this.password, saltRounds)
    next()
  }
  console.log('already hashed')
  next()

})

// user model
const user = mongoose.model('user', userSchema)



module.exports = user
