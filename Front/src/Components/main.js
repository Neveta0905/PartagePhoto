import React, {useContext,useEffect,useState} from 'react'
import {Link} from 'react-router-dom'
import AddEvent from './addevent'
const contexts = require('../utils/context')
const axios = require('../utils/axios')

const Main = (props) => {
	
	const userDatas = useContext(contexts.UserContext)
	const userId = userDatas.userId
	const token = userDatas.userToken
	const connected = userDatas.userConnected
	const [events, setEvents] = useState()
	
	const create_card = (obj) => {
		return <div key={obj.Events[0].name + obj.Events[0].idevent} className='event'>
			<Link to={'./'+obj.Events[0].idevent}>
				<p className='event_name'>{obj.Events[0].name}</p>
				<p className='event_creator'>Creator : 
				{
					obj.Events[0].creator.toString() === userId ?
					' You'
					: /*event.Users[0].nickname*/ ' Someone Else'
				}</p>
				<p className='event_country'>{obj.Events[0].country}</p>
				<p className='event_city'>{obj.Events[0].city}</p>
				{
					obj.Events[0].begin_date !== obj.Events[0].end_date ?
					<p className='event_dates'>Du {change_date(obj.Events[0].begin_date)} au {change_date(obj.Events[0].end_date)}</p>
					: <p className='event_dates'>Le {change_date(obj.Events[0].begin_date)}</p>
				}
			</Link>
		</div>
	}

	const change_date = (date) => {
		const newDate = new Date(date)
		const format = new Intl.DateTimeFormat('fr-FR',
			{hour12:false,weekday:'long',year:'numeric',month:'long',weekday:'long',day:'numeric'}
		)
		const stringedDate = format.format(newDate)
		return stringedDate
	}
	const delete_event = (idEvent) => {

	}

	const modify_event = (idEvent) => {
		
	}

	useEffect(() => {
		(async ()=>{
			let events_req = await axios.GetMyEvents(token)
			const mapped_events = events_req.map(event=>{return create_card(event)})
			setEvents(mapped_events)
		})()
	}, [])
	
	return(
		<div>
			<AddEvent/>
			{
				events && connected ?
				events
				:null
			}
		</div>
	)
}

export default Main