const logout = function(req, res) {
  // console.log(req.cookies)
  if(req.cookies.jwt){
    res.cookie('jwt', '', {maxAge: 1})
    res.json({message: 'logout successfull'})
  }
  else{
    res.json({message: 'you are not logged in'})
  }
}
module.exports = { logout }
