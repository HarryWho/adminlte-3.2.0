require('dotenv').config({ path: './config/config.env' })
const express = require('express')
const http = require('http')
const app = express()
const server = http.createServer(app)
const expressLayouts = require('express-ejs-layouts')
const { ConnectMongoDB } = require('./config/DB')

// setup express-ejs-layouts view engine
app.set('view engine', 'ejs')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)



// connect to mongo database
ConnectMongoDB()

// start server
server.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`)
})