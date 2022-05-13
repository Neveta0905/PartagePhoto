const models = require('../Models')
const auth = require('../Utils/auth')

exports.getAll = (req,res) => {
	models.Event.findAll({})
	.then(result => res.status(200).json({result}))
	.catch(error => res.status(400).json({error:error}))
}

exports.getSubscribers = (req,res) => {
	models.Events_subscribers.findAll({
		where:{events_id:req.params.id},
		include:[
			{
				model:models.User,
				require:true,
				attributes:{exclude:['password','role']}
			},
		]
	})
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
	.then(result => res.status(200).json({message:'Event created'}))
	.catch(error => res.status(400).json({error:error}))
}

exports.modifyOne = (req,res) => {
	models.Event.update({...req.body},{
		where:{
			idevent:req.params.id
		}
	})
	.then(result => res.status(200).json({message:'Event modified'}))
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