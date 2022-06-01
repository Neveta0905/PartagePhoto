import React, {useState,useEffect, useContext, Fragment } from 'react'
import { useParams } from 'react-router-dom'
import MemberMenu from './MemberMenu'
const axios = require('../utils/axios')
const contexts = require('../utils/context')

const Album = (props) => {
	const userDatas = useContext(contexts.UserContext)
	const token = userDatas.userToken
	const userId = userDatas.userId
	const { eventId } = useParams()
	const [eventPhotos, setEventPhotos] = useState()
	
	// Members management
	const [members, setMembers] = useState()
	const [membersAdd, setMembersAdd] = useState()
	const [memberUtility, setmemberUtility] = useState()

	// Url d'image requete each one and blob and add the blob to object
	const havePhoto = async (url)=> {
		const blob = await axios.GetAPhoto(url,token)
		if(blob !=='No photo'){
			const blobUrl = URL.createObjectURL(blob.data)
			return blobUrl
		} else return false
	}

	const postPhotos = async (event) => {
		event.preventDefault()
		const fd = new FormData(event.target)
		const images = fd.get('images')
		if(images.size === 0){
			alert('No photos')
		} else {
			fd.append('idevent',eventId)
			fd.append('userId',userId)
			axios.postPhoto(fd,token)
		}
	}
	const imgSize = {
		maxHeight:'500px',
		maxWidth:'500px'
	}

	const layimage = (event) => {
		const cadre = document.getElementById('photo_layer')
		const img_layer = document.getElementById('photo_layer_img')
		const new_src = event.target.src

		if(cadre.innerHTML === new_src)
			cadre.classList.add('hide')
		else if(cadre.classList.contains('hide')){
			cadre.classList.remove('hide')
			img_layer.setAttribute('src', new_src)
		}
		else 
			img_layer.setAttribute('src', new_src)
	}

	useEffect(() => { // Get photos
		(async()=>{
			const photosOfEvent = await axios.GetEventPhotos(token,eventId)
			console.log(photosOfEvent)
			/*for(let photo of photosOfEvent){ // add image to obj
				photo['LinkImg'] = await havePhoto(photo.url)
			}
			let count = 0
			const mapped_photos = photosOfEvent.map(photo => {
				count += 1;
				{
					return (
						photo.LinkImg ?
						<div key={count + photo.name} className="photo">
							<p>{count}</p>
							<p>{photo.name}</p>
							<img onClick={(e) =>layimage(e)} style={imgSize} src={photo.LinkImg} alt="No photo available"/>
						</div>
						: null
					)
				}
			})
			setEventPhotos(mapped_photos)*/
		})()
	}, [])

	const Lay_Add_Members = async () => {
		const members_menu = document.getElementById('members_layer')
		members_menu.classList.toggle('hidden_menu')

		// Requests
		const users = await axios.getUsers(token,eventId)
		const eventMembers = await axios.getEventMembers(token,eventId)
		
		// Ids filter
		const members_ids = eventMembers.map(member => {return member.users_id})
		const filterNoMember = users.filter(obj => {return !members_ids.includes(obj.iduser)})
		const filterMember = users.filter(obj => {return members_ids.includes(obj.iduser)})
		setMembers(filterMember)
		setMembersAdd(filterNoMember)
		setmemberUtility('add')
	}

	const Lay_delete_Members = async () => {
		const members_menu = document.getElementById('members_layer')
		members_menu.classList.toggle('hidden_menu')

		// Requests
		const users = await axios.getUsers(token,eventId)
		const eventMembers = await axios.getEventMembers(token,eventId)
		
		// Ids filter
		const members_ids = eventMembers.map(member => {return member.users_id})
		const filterNoMember = users.filter(obj => {return !members_ids.includes(obj.iduser)})
		const filterMember = users.filter(obj => {return members_ids.includes(obj.iduser)})
		setMembers(filterMember)
		setMembersAdd(filterNoMember)
		setmemberUtility('del')
	}

	return (
		<Fragment>
		<div id="photo_layer" className='hide'>
			<img id='photo_layer_img' src="" alt="No photo zoomed" />
			<p id='photo_layer_cross'>&#x2717;</p>
		</div>
		<div className='photo_layer'>
			<h2>Liste des photos :</h2>
			<div className="button_event">
				<button onClick={Lay_Add_Members}>Ajouter des membres</button>
				<button onClick={Lay_delete_Members}>Supprimer des membres</button>
				<form encType="multipart/form-data" onSubmit={(e)=>{postPhotos(e)}}>
					<input name='images' type="file" multiple accept=".jpg, .jpeg, .png" />
					<input type="submit" value='Envoyer les photos' />
				</form>
				<button>Supprimer des photos</button>
			</div>
			{
				eventPhotos ?
				eventPhotos
				: null
			}
		</div>
		<MemberMenu group={members} noGroup={membersAdd} functionality={memberUtility}/>
		</Fragment>
	)
}

export default Album