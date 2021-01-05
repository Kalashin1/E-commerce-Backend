const storeSchema = require('../schemas/store-schema')
const mongoose = require('mongoose')

// instance method
storeSchema.methods.getOwner = async function(req, res) {
  console.log(this)
}

// post save method
storeSchema.post('save', async function (next) {
  const user = await mongoose.model('user').findById({_id : this.owner})
  user.store = this._id
  user.save()
})

let Store = mongoose.model('store', storeSchema)

module.exports = Store

