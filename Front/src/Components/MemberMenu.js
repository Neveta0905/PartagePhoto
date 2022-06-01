import React,{useState,useEffect, useContext} from 'react'
import { useParams } from 'react-router-dom'
const axios = require('../utils/axios')
const contexts = require('../utils/context')

const MemberMenu = (props) => {
	const userDatas = useContext(contexts.UserContext)
	const token = userDatas.userToken
	const userId = userDatas.userId
	const {eventId} = useParams() 

	const {group,noGroup,functionality} = props
	const [members, setMembers] = useState()

	useEffect(() => {
		if(functionality === 'add'){
			const layer = noGroup.map(user => {return <div key={user.nickname+user.iduser} className="member_add">
				<label htmlFor={'user' + user.iduser}>{user.nickname}</label>
				<input type="checkbox" name='user' id={'user' + user.iduser} value={user.iduser} />
			</div>
			})
			setMembers(layer)
		} else if (functionality === 'del'){
			const layer = group.map(user => {return <div key={user.nickname+user.iduser} className="member_del">
				<label htmlFor={'user' + user.iduser}>{user.nickname}</label>
				<input type="checkbox" name='user' id={'user' + user.iduser} value={user.iduser} />
			</div>
			})
			setMembers(layer)
		}
	}, [functionality])

	const addMembers = async (event) => {
		const fd = new FormData(event.target)
		const body = {newsub:fd.getAll('user')}
		console.log(body)
		const adder = await axios.AddEventMember(body,token,eventId)
	}

	return (

		<form id='members_layer' onSubmit={(event)=>{
			event.preventDefault();
			addMembers(event)
		}}>
			{
				members ?
				members 
				:null
			}
			{
				members?
				<input type="submit" value={
					functionality === 'add' ? 
						'Ajouter' 
					: functionality==='del' ? 
						'Supprimer' 
					: null} />
				:null
			}
		</form>
	)
}

export default MemberMenu