const models = require('../Models')
const auth = require('../Utils/auth')
const fs = require('fs');

exports.getOne = (req,res) => {
	
}

exports.getAll = (req,res) => {
	res.status(200).json({result:'photos'})
}

exports.sendPhotos = (req,res) => {
	if(!req.files) // y'a t'il un fichier ?
		req.fileError ?
		res.status(400).json({error:req.fileError})
		: res.status(400).json({error:'No file found'})
	else{
		const datas = req.files.map(image =>{ // Create obj with body for each image
			const modified_imgName = image.filename.slice(0,image.filename.indexOf('.'))
			const datas_img = {
				creator: auth.GetMyId(req.headers.authorization),
				idevent: req.body.idevent,
				name: modified_imgName,
				type: image.fieldname,
				url: `${req.protocol}://${req.get('host')}/images/${image.filename}`
			}
			return {
				...datas_img,
				...image,
			}		
		}) // Sanitize photos infos to send in bdd

		models.Multimedias.bulkCreate(
			datas
		)
		.then(result => res.status(200).json({message:'Files uploaded'}))
		.catch(error=>res.status(400).json({error:'Upload fail'}))
	}
}

exports.deleteSome = (req,res) => {
	const my_id = auth.GetMyId(req.headers.authorization)
	let photos_id
	Array.isArray(req.body.photoId) ? // Pour n'avoir que du tableau
	photos_id = req.body.photoId
	: photos_id = Array(req.body.photoId)

	models.Multimedias.findAll({
		where:{ 
			idMultimedia : photos_id,
			creator:my_id
		}
	})
	.then(result => {
		const url_begin = `${req.protocol}://${req.get('host')}/` // To get photos adress
		const photos_url = [] // /images/nomphoto
		result.forEach(photo => photos_url.push(photo.url.replace(url_begin,'')))

		const delete_files = (files,callback) =>{
			if(files.length==0) callback()
			else{
				let f = files.pop() // Suppress last and take as value
				fs.unlink(f,function(err){
					if(err) callback(err);
					else delete_files(files,callback)
				})
			}
		}
		
		delete_files(photos_url,(err)=>{
			models.Multimedias.destroy({
				where:{ 
					idMultimedia : photos_id,
					creator:my_id
				}
			})
			.then(result => res.status(200).json({message:`${(photos_id.length)} photos are deleted`}))
			.catch(error => res.status(400).json({message:'No photo have been deleted'}))
		})
		
	})
	.catch(error => res.status(400).json({error:'You\'re not the creator of a photo'}))
}

exports.modifyOne = (req,res) => {
	
}