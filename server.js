require('dotenv').config({ path: './config/config.env' })
const express = require('express')
const http = require('http')
const app = express()
const server = http.createServer(app)
const expressLayouts = require('express-ejs-layouts')
const path = require('path')
const session = require('express-session')
const { ConnectMongoDB } = require('./config/DB')
const passport = require('passport')

// setup express-ejs-layouts view engine
app.set('view engine', 'ejs')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)

// static folder
app.use(express.static(path.join(__dirname, 'public')))
  // url encoding
app.use(express.urlencoded({ extended: false }))

// sessions
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
  }))
  // passport initialization
app.use(passport.initialize());
app.use(passport.session());


app.use('/', require('./controllers/home'))

// connect to mongo database
ConnectMongoDB()

// start server
server.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`)
})