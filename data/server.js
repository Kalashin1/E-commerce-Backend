const MongoClient = require('mongodb').MongoClient
let express = require('express')
const cookieParser = require('cookie-parser')
const bcrypt = require('bcrypt')
const cors = require('cors');
const bodyParser = require('body-parser')

// setting our cors option
var corsOption = {
  origin: 'http://localhost:8080',
  optionsSuccessStatus: 200
}

var jsonParser = bodyParser.json()

// our database variables
const url = 'mongodb://localhost:27017'
const dbName = 'test';

const saltRounds = 10

const app = express()

app.use(cors({
  origin: 'http://localhost:8080',
  credentials: true,
  exposedHeaders: ['set-cookie']
}))

// setting our session
app.use(cookieParser())



app.get('/catalogue', (req, res)=> {
  // THIS FUNCTION HELPS US TO FETCH OUR FOODS LIST
  const findFoods = function(db){
    const collection = db.collection('foods');
    collection.find({}).toArray((err, docs)=>{
      if(!err){
        var foodArray = docs
        res.json(foodArray)
      }
    })
  }

  MongoClient.connect(url, function (err, client){
    if(! err){
      console.log('Connected')
      const db = client.db(dbName)
      findFoods(db)
      client.close()
    }
    else{
      console.log(err)
    }
  })
})

// fetch a particular food
// app.get('/food:id', (req, res)=>{

//   const foodId = req.params.id

//   findFood = (db, id)=>{
//     const collection = db.collection('foods')
//     collection.find({"_id": id}, (err, doc)=>{
//       if(!err){
//         res.json(doc)
//       }
//       else{
//         console.error(err)
//       }
//     })
//   }

//   MongoClient.connect(url, (err, client)=> {
//     if(!err){
//       const db = client.db(dbName)
//       findFood(db, foodId)
//       client.close()
//     }
//     else{
//       console.error(err)
//     }
//   })

// })

// getting our promo food
app.get('/promos', (req, res)=> {
  const findFoods = function(db){
    const collection = db.collection('foods');
    collection.find({"promo": true}).toArray((err, docs)=>{
      if(!err){
        res.json(docs)
      }
    })
  }

  MongoClient.connect(url, function (err, client){
    if(! err){
      console.log('Connected')
      const db = client.db(dbName)
      findFoods(db)
      client.close()
    }
    else{
      console.error(err)
    }
  })
})

//  get our top orders
app.get('/top-orders', (req, res)=>{
  findOrders = function(db){
    const collection = db.collection('foods')
    collection.find({orders: {$gt: 1}}).toArray((err, docs)=>{
      if(!err){
        var foodArray = docs
        res.json(foodArray)
      }
    })
  }

  MongoClient.connect(url, (err, client)=>{
    if(!err){
      console.log('connected')
      const db = client.db(dbName)
      findOrders(db)
      client.close()
    }
    else{
      console.error(err)
    }
  })
})

// GETTING OUR BREAKFASTS
app.get('/breakfast', (req, res)=>{

  findBreakfast = function(db){
    const collection = db.collection('foods')
    collection.find({meal: 'breakfast'}).toArray((err, docs)=>{
      if(!err){
        var foodArray = docs
        res.json(foodArray)
      }
      else{
        console.error(err)
      }
    })
  }

  MongoClient.connect(url, (err, client)=>{
    if(!err){
      console.log('connected')
      const db = client.db(dbName)
      findBreakfast(db)
      client.close()
    }
    else{
      console.error(err)
    }
  })
})

// AUNTHENTICATION

// signing up a user
app.post('/signup', jsonParser, (req, res)=> {
  let user = req.body
  console.log(user)
  bcrypt.hash(user.password, saltRounds, function(err, hash){
    user.password = hash
    console.log(user.password)
    MongoClient.connect(url, function (err, client){
      if(! err){
        console.log('Connected')
        const db = client.db(dbName)
        createUser(db, user)

        client.close()
      }
      else{
        console.error(err)
      }
    })
  })

  // console.log(user)
  createUser = function(db, user){
    // creating our user
    const collection = db.collection('users')
    collection.insertOne(user,(err, result)=>{
     if(err){
       console.error(err)
     }
     else{
       console.log('inserted')
     }
    })
    // fetching our user

    collection.findOne({email: user.email}, (err, result) => {
      // if there are no errors then find that user from the database
      if(!err){
       //  if there are no errors set a session for the user
       user = result
      //  send the session object to the client
      console.log(user.password)
      res.cookie('user', JSON.stringify(user)).json(user)
     }
     else{
       console.error(err)
     }
     })
  }
})


// // getting our current user
app.get('/user',(req, res)=> {
  const user = req.cookies.user
  if(user){
    console.log(user)
    res.json(user)
  }
  else{
    res.json({message: 'no user'})
  }
})

// // logging in a user
app.post('/login', jsonParser, (req, res) => {
  const user = req.body;
  console.log(user)

  MongoClient.connect(url, function(err, client){
    if(!err){
      console.log('connected')
      const db = client.db(dbName)
      findUser(db)
      client.close()
    }
    else{
      console.error(err)
    }
  })

  findUser = function(db){
    const collection = db.collection('users')
    // check the users email and password to find a document that matches it
    collection.findOne({email: user.email}, (err, doc)=> {
      // if there are no errors proceed
      if(!err){
        console.log(doc)
        if(bcrypt.compareSync(user.password, doc.password)){
          res.cookie('user', JSON.stringify(doc)).json(doc)
        }
        else{
          res.json({messsage: "wrong password"})
        }
      }
      else{
        console.log(err)
        res.json({messsage: "wrong email"})
      }

    })

  }


})



// // loggging out a user
app.get('/logout', (req, res)=>{
  console.log(req.cookies)
  if(req.cookies.user){
    res.clearCookie('user')
    res.json({message: 'logout successfull'})
  }
  else{
    res.json({message: 'you are not logged in'})
  }
})


app.listen(3000, ()=> console.log(`app running on port 3000`))

