//  validating email
module.exports.isEmail = function(val){
  return new RegExp(/^[\w]+(\.[\w]+)*@([\w]+\.)+[a-z]{2,7}$/).test(val)
}

// // validating passwords
module.exports.isPassowrd = function(val){
  return new RegExp(/([a-z]?[A-Z]+[a-z]+[0-9]+)/).test(val)
}
