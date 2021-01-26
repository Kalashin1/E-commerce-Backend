const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose');
const router = require('./router/my-router')
const cookieParser = require('cookie-parser')
const { validateUser } = require('./controllers/validate-user')
const { getUser } = require('./controllers/validate-user')

const axios = require('axios')

const app = express()



// middleware
app.use(cors({
  origin: 'http://localhost:5500',
  credentials: true,
  exposedHeaders: ['set-cookie']
}))
app.use(express.json())
app.use(cookieParser())

const url = 'mongodb://localhost:27017/test'


// routes
mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})
.then(result => app.listen(3000, () => console.log('app running on port 3000')))
.catch(err => console.log(err))

app.get('/user', getUser)
app.get('/', validateUser, (req, res)=> res.json('welcome'))


app.get('/transaction/:id', (req, res) => {
  const { id } = req.params
  const https = require('https')
  const options = {
    hostname: 'api.paystack.co',
    port: 443,
    path: '/transaction/verify/'+id,
    method: 'GET',
    headers: {
      Authorization: 'Bearer sk_test_5f4cc01ff64a162124d4c386873a5dc995b1e088'
    }
  }
  
  https.request(options, resp => {
    let data = ''
    resp.on('data', (chunk) => {
      data += chunk
    });
    resp.on('end', () => {
    res.json(data)
    })
  }).on('error', error => {
    res.json(error)
  }).end()
  
})
app.use(router)
