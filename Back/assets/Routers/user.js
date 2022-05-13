const express = require('express')
const router = express.Router();
const controller = require('../Controllers/user')
const auth = require('../Utils/auth')
const apiPath = '/auth/'
	
	// Actions
	router.route(apiPath)
		.get(auth.all,controller.getOne)

	router.route(apiPath+'subscribed')
		.get(auth.all,controller.getEventsSubscribed)

	router.route(apiPath+'login')
		.post(controller.login)

	router.route(apiPath+'signup')
		.post(controller.signup)



const objExport = {
	name:'user',
	router:router
}

module.exports = objExport