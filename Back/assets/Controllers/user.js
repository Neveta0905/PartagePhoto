const models = require('../Models')
const bcrypt = require('bcrypt')
const Regex_rules = require('../Utils/regex')
const jwt = require('jsonwebtoken')

exports.login = async (req,res) =>{
	const mail = req.body.mail
	const password = req.body.password
	const user = await models.User.findOne({
		where:{mail:mail}
	})
	if(!user)
		res.status(400).json({error:'Wrong mail or password'})
	else{
		bcrypt.compare(password,user.password)
		.then(valid=>{
			if(!valid)
				res.status(400).json({error:'Wrong mail or password'})
			else{
				res.status(200).json({
					token:jwt.sign(
						{userId:'userId'},
						process.env.TOKEN_CRYPTER,
						{expiresIn:'24h'}
					)
				})
			}
		})
		.catch(error=>{res.send({error:error})})
	}
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