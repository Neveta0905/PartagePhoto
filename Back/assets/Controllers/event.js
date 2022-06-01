const models = require('../Models')
const auth = require('../Utils/auth')
const fs = require('fs');

exports.getAll = (req,res) => {
	models.Event.findAll({})
	.then(result => res.status(200).json({result}))
	.catch(error => res.status(400).json({error:error}))
}

exports.getOne = (req,res) => {
	models.Event.findOne({
		where:{
			idevent:req.params.id
		},
		include:{
			model:models.User,
			attributes:{exclude:['iduser','password','role','mail','biographie']}
		}
	})
	.then(result => res.status(200).json({result}))
	.catch(error => res.status(400).json({error:error}))
}

exports.postOne = (req,res) => {
	req.body.creator = auth.GetMyId(req.headers.authorization)
	models.Event.create({...req.body})
	.then(result => {
		models.Events_subscribers.create({
			events_id:result.idevent,
			users_id:result.creator
		})
		.then(result => res.status(200).json({message:'Event Created'}))
		.catch(error => res.status(400).json({error:error}))
	})
	.catch(error => res.status(400).json({error:error}))
}

exports.modifyOne = (req,res) => {
	const my_id = auth.GetMyId(req.headers.authorization)

	models.Event.findOne({
		where:{
			idevent: req.params.id
		}
	})
	.then(event =>{
		event.creator != my_id ?
		res.status(400).json({error:'You are not the owner of the event'})
		: models.Event.update({
			name: req.body.name,
			begin_date: req.body.begin_date,
			end_date: req.body.end_date,
			country : req.body.country,
			city : req.body.city,
		},{
			where:{
				idevent:req.params.id
			}
		})
		.then(result => res.status(200).json({message:'Event modified'}))
		.catch(error => res.status(400).json({error:error}))
	})
	.catch(error => res.status(400).json({error:error}))
}

exports.deleteOne = (req,res) => {
	const my_id = auth.GetMyId(req.headers.authorization)
	models.Event.findOne({
		where: {
			idevent:req.params.id,
		}
	})
	.then(event => {
		event.creator != my_id ?
		res.status(400).json({error:'You are not the owner of the event'})
		: models.Event.destroy({
			where:{idevent:req.params.id}
		})
		.then(result=>res.status(200).json({message:'Event deleted'}))
		.catch(error => res.status(400).json({error:error}))
	})
	.catch(error => res.status(400).json({error:error}))
}

exports.getSubscribers = (req,res) => {
	models.Events_subscribers.findAll({
		where:{events_id:req.params.id},
		include:[
			{
				model:models.User,
				require:true
			},
		]
	})
	.then(result => res.status(200).json({result}))
	.catch(error => res.status(400).json({error:error}))
}

exports.addSubscribers = (req,res) => {
	const my_id = auth.GetMyId(req.headers.authorization)
	models.Event.findOne({ // Is he the creator ?
		where:{
			creator:my_id,
			idevent:req.params.id
		}
	})
	.then(result=>{
		if (result === null)
			res.status(400).json({error:'You\'re not the creator of the event'})
		else { // Array of users id
			const new_subs = req.body.newsub
			const data_subs = new_subs.map(user => {
				return {
					users_id:user,
					events_id:req.params.id
				}
			})
			
			models.Events_subscribers.bulkCreate(
				data_subs
			)
			.then(result => res.status(200).json({message:'Users added to the event'}))
			.catch(error=>res.status(400).json({error:error}))
		}
	})
	.catch(error=>res.status(400).json({error:error}))
	
}

exports.getMultimedias = (req,res) => {
	const my_id = auth.GetMyId(req.headers.authorization)
	models.Events_subscribers.findOne({
		where:{
			events_id:req.params.id,
			users_id:my_id
		},
	})
	.then(result => {
		if(result === null)
			res.send('You\'re not allowed') 
		else {
				models.Multimedias.findAll({
				where:{idevent:req.params.id},
			})
			.then(result => {
				const new_res = result.map(photo =>{
					const file = fs.readFileSync('./images/1654076961166_dragon.jpg','utf8')
					return {photo,file}
				})
				return new_res
			})
			.then(result => res.status(200).json({result}))
			.catch(error => res.status(400).json({error:error}))
		}
	})
	.catch(error => res.status(400).json({error:error}))

	
}