// Config
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')('dev') // See requests
const dotenv = require('dotenv').config()
const Sequelize = require('sequelize')
const path = require('path');
const helmet = require('helmet') // Protect against XSS
const multer = require('multer')
const auth = require('./assets/Utils/auth')

app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({ policy: "same-site" }));

const cors = require('cors') // Enable different IP requests
app.use(cors())

// App
app.use(express.json()) // Parsing in JSON
app.use(morgan)
app.use('/images',auth.all, express.static(path.join(__dirname, 'images')));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))


// Routes
const routers = require('./assets/Routers') // import all routers at once
const api_path = '/api/partagePhotos'

app.use(api_path,routers.user.router) // Users
app.use(api_path,routers.multimedia.router) // Multimédias
app.use(api_path,routers.event.router) // Events
app.use('*',(req,res)=>res.status(400).json({error:'not found'})) // Others


// Gestion d'erreur
app.use((err, req, res, next) => {
	console.log(err)
  if(err instanceof multer.MulterError)
  	res.status(400).json({error:'Your file is too large'})
  else
  	res.status(500).send({error:'Something doesn\'t work'});
});

module.exports = app