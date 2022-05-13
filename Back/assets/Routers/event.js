const express = require('express')
const router = express.Router();
const controller = require('../Controllers/event')
const apiPath = '/events/'
const auth = require('../Utils/auth')

router.route(apiPath)
	.get(auth.admin,controller.getAll)
	.post(auth.all,controller.postOne)
	
router.route(apiPath+':id')
	.get(auth.admin,controller.getOne)
	.put(auth.all,controller.modifyOne)
	.delete(auth.all,controller.deleteOne)

router.route(apiPath+':id/subscribers')
	.get(auth.all,controller.getSubscribers)


const objExport = {
	name:'event',
	router:router
}

module.exports = objExport