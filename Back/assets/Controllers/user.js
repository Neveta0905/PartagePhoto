const models = require('../Models')
const bcrypt = require('bcrypt')
const Regex_rules = require('../Utils/regex')
const jwt = require('jsonwebtoken')
const auth = require('../Utils/auth')

exports.getOne = (req,res) =>{
	models.User.findOne({
		where:{iduser:req.params.id}
	})
	.then(result => res.status(200).json({message:result}))
	.catch(error => res.status(400).json({error:error}))
}

exports.getAll = (req,res) =>{
	models.User.findAll({
		attributes:['iduser','nickname']
	})
	.then(result => res.status(200).json({message:result}))
	.catch(error => res.status(400).json({error:error}))
}

exports.login = (req,res) =>{
	const mail = req.body.mail
	const password = req.body.password

	models.User.findOne({
		where:{mail:mail}
	})
	.then(user =>{
		if(!user)
			res.status(400).json({error:'Wrong mail or password'})
		else{
			bcrypt.compare(password,user.password)
			.then(valid=>{
				if(!valid)
					res.status(400).json({error:'Wrong mail or password'})
				else{
					res.status(200).json({
						userId:user.iduser,
						token:jwt.sign(
							{userId:user.iduser},
							process.env.TOKEN_CRYPTER,
							{expiresIn:'24h'}
						)
					})
				}
			})
			.catch(error=>{res.status(400).json({error:'Wrong mail or password'})})
		}
	})
	.catch(error => {res.status(400).json({error:'No authentification'})})

}

exports.signup = async (req,res) =>{
	const mail = req.body.mail,
	password = req.body.password,
	nickname = req.body.nickname

	const reg_password = await Regex_rules.check_regex(password,'password',res),
	reg_mail = await Regex_rules.check_regex(mail,'mail',res),
	reg_nickname = await Regex_rules.check_regex(nickname,'nickname',res)
	const arr_reg = [reg_password,reg_mail,reg_nickname]

	if(arr_reg.every(reg=>reg===true)){ // Check all regex are valid
		bcrypt.hash(req.body.password,10)
		.then(hashed=>{
			req.body.password = hashed
			models.User.create({...req.body})
			.then(result=>res.status(200).json({message:'User Created'}))
			.catch(error=>res.status(400).json({error:error}))
		})
		.catch(error=>res.status(400).json({error:error}))
	} 
}

exports.getEventsSubscribed = (req,res) => {
	const my_id = auth.GetMyId(req.headers.authorization)
	models.Events_subscribers.findAll({
		where:{users_id:my_id},
		include:[{model:models.Event},{model:models.User,attributes:['nickname']}]
	})
	.then(result => res.status(200).json({result:result}))
	.catch(error=>res.status(400).json({error:error}))
}