const express = require('express')
const router = express.Router();
const controller = require('../Controllers/user')
const apiPath = '/auth/'
	
	// Actions
	router.route(apiPath)
		.get((req,res)=>res.send('je suis un user'))

	router.route(apiPath+'login')
		.post(controller.login)

	router.route(apiPath+'signup')
		.post(controller.signup)



const objExport = {
	name:'user',
	router:router
}

module.exports = objExport