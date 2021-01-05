const storeSchema = require('../schemas/store-schema')
const mongoose = require('mongoose')

// instance method
storeSchema.methods.getOwner =  function(req, res) {
  console.log(this)
}

// post save method
storeSchema.post('save', async function (next) {
  const user = await mongoose.model('user').findById({_id : this.owner})
  if(typeof user.store != undefined){
    return
  }
  else{
    user.store = this._id
    user.save() 
  }
  next()
})

let Store = mongoose.model('store', storeSchema)

module.exports = Store

// 5ff36b82df308a13d4d3b0f5