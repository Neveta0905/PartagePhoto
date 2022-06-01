const express = require('express')
const router = express.Router();
const controller = require('../Controllers/multimedias')
const multer = require('../Utils/multer')
const auth = require('../Utils/auth')

const apiPath = '/multimedias/'

router.route(apiPath)
	.get(auth.admin,controller.getAll)
	.post(auth.files,multer,controller.sendPhotos)
	.delete(auth.all,controller.deleteSome)

router.route(apiPath+':id')
	.get(auth.all,controller.getOne)
	.put(auth.all,controller.modifyOne)


const objExport = {
	name:'multimedia',
	router:router
}

module.exports = objExport