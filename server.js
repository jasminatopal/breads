// CONFIGURATION//Dependencies
require('dotenv').config()
const express = require('express')
const methodOverride = require('method-override')
const app = express()
const mongoose = require('mongoose')
const PORT = process.env.PORT

mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true}) .then(() => { console.log('connected to mongo: ', process.env.MONGO_URI) })


// MIDDLEWARE
app.use(methodOverride('_method'))
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))
app.set('views', __dirname + '/views')
app.set('view engine', 'jsx')
app.engine('jsx', require('express-react-views').createEngine())

// Breads
const breadsController = require('./controllers/breads_controller.js')
app.use('/breads', breadsController)


// ROUTES
app.get('/', (req, res) => {
  res.send('Welcome to an Awesome App about Breads')
})


// 404 Page - always make this last
app.get('*', (req, res) => {
  res.send('404')
})

// LISTEN
app.listen(PORT, () => {
  console.log('listening on port', PORT);
})


