const express = require('express')
const router = express.Router();
const controller = require('../Controllers/multimedias')
const apiPath = '/multimedias/'

router.route(apiPath)
	.get((req,res)=>res.send('je suis la page multimédia'))



const objExport = {
	name:'multimedia',
	router:router
}

module.exports = objExport