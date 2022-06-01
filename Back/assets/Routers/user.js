const express = require('express')
const router = express.Router();
const controller = require('../Controllers/user')
const auth = require('../Utils/auth')
const rateLimit = require('../Utils/limiter')(1,5)
const apiPath = '/auth/'

	
	// Actions
	router.route(apiPath)
		.get(auth.all,controller.getAll)

	router.route(apiPath+'subscribed')
		.get(auth.all,controller.getEventsSubscribed)
	
	router.route(apiPath+':id')
		.get(auth.all,controller.getOne)


	router.route(apiPath+'login')
		.post(rateLimit,controller.login)

	router.route(apiPath+'signup')
		.post(rateLimit,controller.signup)



const objExport = {
	name:'user',
	router:router
}

module.exports = objExport