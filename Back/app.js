// Config
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')('dev') // See requests
const dotenv = require('dotenv').config()
const Sequelize = require('sequelize')
const path = require('path');
const helmet = require('helmet') // Protect against XSS
app.use(helmet())

const cors = require('cors') // Enable different IP requests
app.use(cors())


// App
app.use(express.json()) // Parsing in JSON
app.use(morgan)
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


// Routes
const routers = require('./assets/Routers') // import all routers at once
const api_path = '/api/partagePhotos'

app.use(api_path,routers.user.router) // Users
app.use(api_path,routers.multimedia.router) // Multimédias
app.use(api_path,routers.event.router) // Events
app.use('*',(req,res)=>res.status(400).json({error:'not found'})) // Others

module.exports = app