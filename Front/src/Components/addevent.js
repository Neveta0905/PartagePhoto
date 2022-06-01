import React,{useContext}from 'react'
import Inputs from './inputs'
import Pays from '../utils/pays'
const axios = require('../utils/axios')
const contexts = require('../utils/context')

const AddEvent = (props) => {
	const userDatas = useContext(contexts.UserContext)
	const userId = userDatas.userId
	const token = userDatas.userToken
	const connected = userDatas.userConnected

	const addEvent = (event) => {
		event.preventDefault()
		const fd = new FormData(event.target)
		let event_obj = {}
		for(let key of fd.keys()){
			event_obj[key] = fd.get(key)
		}
		axios.addEvent(event_obj,token)
		let te = event.target.getElementsByTagName('input')
		Object.values(te).forEach(elem=>elem.type !== 'submit' ? elem.value='' : null)
	}
	return(
		<form id='Add_event_menu' onSubmit={(e)=>addEvent(e)}>
			<Inputs name='name' type='text' label='Nom de l&#x27;événement'/>
			<Inputs name='begin_date' type='date' label='Date de début'/>
			<Inputs name='end_date' type='date' label='Date de fin'/>
			<Pays label='Pays' name='country' />
			<Inputs name='city' type='text' label='Ville'/>
			<input type="submit" value='Créer l&#x27;événement'/>
		</form>
	)
}

export default AddEvent