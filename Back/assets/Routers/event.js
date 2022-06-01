const express = require('express')
const router = express.Router();
const controller = require('../Controllers/event')
const apiPath = '/events/'
const auth = require('../Utils/auth')

router.route(apiPath)
	.get(auth.admin,controller.getAll)
	.post(controller.postOne)
	
router.route(apiPath+':id')
	.get(auth.admin,controller.getOne)
	.put(auth.all,controller.modifyOne)
	.delete(auth.all,controller.deleteOne)

router.route(apiPath+':id/subscribers')
	.get(auth.all,controller.getSubscribers)
	.post(auth.all,controller.addSubscribers)

router.route(apiPath+':id/multimedias')
	.get(auth.all,controller.getMultimedias)


const objExport = {
	name:'event',
	router:router
}

module.exports = objExport