import React from 'react'

const Inputs = (props) => {
	const {name,type,label} = props
	return(
		<div>
			<label htmlFor={name}>{label}</label>
			<input type={type} id={name} name={name}/>
		</div>
	)
}

export default Inputs