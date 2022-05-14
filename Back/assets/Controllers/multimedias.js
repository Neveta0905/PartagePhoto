const models = require('../Models')
const auth = require('../Utils/auth')

exports.getOne = (req,res) => {

}

exports.getAll = (req,res) => {

}

exports.sendOne = (req,res) => {
	const creator = auth.GetMyId(req.headers.authorization)
	const imgName = req.file.filename
	const modified_imgName = imgName.slice(0,imgName.indexOf('.'))
	models.Multimedias.create({
		creator:creator,
		idevent:req.body.idevent,
		name:modified_imgName,
		type: req.file.fieldname,
		url: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
	})
	.then(result => res.send(result))
	.catch(error=>res.send(error))
}

exports.deleteOne = (req,res) => {
	
}

exports.deleteMany = (req,res) => {
	
}

exports.modifyOne = (req,res) => {
	
}