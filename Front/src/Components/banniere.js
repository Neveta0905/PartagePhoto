import React from 'react'
import {Link} from 'react-router-dom'
const Banniere = (props) =>{
	const {action,connected} = props
	const handleMenuLay = (menuToLay) => {
		const menu = document.getElementById(menuToLay)
		menu.classList.toggle('invisible')
	}

	const NavMenu = () => {
		return(
			( connected && document.location.pathname !== '/') ?
			<nav>
				<Link to='../' onClick={(e)=>{action(e)}}>Disconnect</Link>
				{
					document.location.pathname === '/main'
					?<p onClick={(e)=>{handleMenuLay('Add_event_menu')}}>Ajouter un evenement</p>
					:null
				}
			</nav>
			: null
		)
	}

	return(
		<header>
			{document.location.pathname !== '/' && document.location.pathname !== '/main' ? <h1><Link to='main'>Partage Photos</Link></h1> : <h1>Partage Photos</h1> }
			{<NavMenu/>}
		</header>
	)
}

export default Banniere