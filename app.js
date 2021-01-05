const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose');
const router = require('./router/my-router')
const cookieParser = require('cookie-parser')
const { validateUser } = require('./controllers/validate-user')
const { getUser } = require('./controllers/validate-user')

const app = express()

// middleware
app.use(cors({
  origin: 'http://localhost:8080',
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
app.use(router)
