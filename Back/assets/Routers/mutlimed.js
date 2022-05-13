const express = require('express')
const router = express.Router();
const controller = require('../Controllers/multimedias')
const apiPath = '/multimedias/'

router.route(apiPath)
	.get((req,res)=>res.send('je suis la page multimédia'))
	.post((req,res)=>res.send('Multimédia reçu'))
	.put((req,res)=>res.send('je modifie'))
	.delete((req,res)=>res.send('Je supprime'))
	
router.route(apiPath+':id')
	.get((req,res)=>res.send(`Je veux le multiméd ${req.params.id}`))


const objExport = {
	name:'multimedia',
	router:router
}

module.exports = objExport