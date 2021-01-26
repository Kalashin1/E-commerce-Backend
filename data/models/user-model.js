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
    let products = user.cart.products

    let foundProduct = products.find(item => item._id == product._id)
    if(!foundProduct){
      products.push(product)
      user.cart.products = products
      user.save()
    }
    if(foundProduct){
      products = products.filter(item => item._id !== foundProduct._id)
      foundProduct.amount+=1;
      products = [...products, foundProduct];
      user.cart = { products }
      user.save()
    }

    console.log(user.cart.products);
    // console.log(u)
    return user
    // /cart-clear/5ff8711177d1821198744e38

  }
  else{
    throw Error('no user with that email')
  }
}

// remove from cart
userSchema.statics.removeFromCart = async (_id, productId) => {
  const user = await mongoose.model('user').findById({_id})
  if(user){
    let products = user.cart.products
    products = products.filter( product => product._id !== productId)
    user.cart = { products }
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
    user.cart.products = []
    user.save()
    return user.cart
  }
  else{
    throw Error('no user with that id')
  }
}

userSchema.statics.modifyCart = async (userId, productId, modifier) => {
  const user = await mongoose.model('user').findById({"_id": userId})
  if(user){
    let products = user.cart.products
    let foundProduct = products.find(product => product._id == productId)
    if(foundProduct.amount >= 1){
      foundProduct.amount = foundProduct.amount + modifier
      products = products.filter(product => product._id !== productId)
      products = [...products, foundProduct]
      user.cart = { products }
      user.save()
      return user.cart
    }
    else{
      return user.cart
    }
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
  next()

})

// user model
const user = mongoose.model('user', userSchema)



module.exports = user
