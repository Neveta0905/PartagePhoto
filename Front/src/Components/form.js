import React from 'react'
import Inputs from './inputs'
import './css/form.css'
import { Link } from 'react-router-dom'

const Form = (props) => {
	const {action} = props

	function setLink(){
		const link = window.location.href.includes('signup') ? 
			<Link to='/'>Connexion</Link>
			: <Link to='/signup'>Inscription</Link>
		return link
	}
	const sub_value = window.location.href.includes('signup') ? 'S\'inscrire' : 'Se connecter'

	return(
		<div className='connexion_form'>
			<form onSubmit={(e)=>{
				e.preventDefault();
				const fd = new FormData(e.target)
				action(fd)
			}}>
				<Inputs name='mail' type='email' label='Email'/>
				<Inputs name='password' type='password' label='Mot de passe' />
				{
					window.location.href.includes('signup') ?
					<Inputs name='nickname' type='text' label='Nom utilisateur' />
					:null
				}
				<input type="submit" value={sub_value}/>
			</form>
			{setLink()}
		</div>
	)
}

export default Form