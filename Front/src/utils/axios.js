// Write all requests
const axios = require('axios')
const api_begining = 'http://localhost:3000/api/partagePhotos'

const headers = (token) => {
	if (token)
		return {headers:{'Authorization' : 'Bearer ' + token}}
	else return null
}

const GetRequest = async (api,token) =>{
	return axios.get(api_begining+api,headers(token))
	.then(response => {return response.data })
		.then(datas => {
			return datas
	})
	.catch(error => {return error})
}

export const GetEvents = async (token) => {
	const events = await GetRequest('/events',token)
	return events.result
}

export const GetMyEvents = async (token) => {
	const events = await GetRequest('/auth/subscribed',token)
	return events.result
}

export const GetEventPhotos = async (token,idevent) => {
	const events = await GetRequest('/events/' + idevent + '/multimedias',token)
	return events.result
}

export const getUsers = async (token,idevent) => {
	const members = await GetRequest('/auth',token)
	return members.message	
}

export const getEventMembers = async (token,idevent) => {
	const members = await GetRequest('/events/'+idevent+'/subscribers',token)
	return members.result	
}

export const GetAPhoto = async (url,token) => {
	return axios.get(url,{responseType:'blob',headers:{'Authorization' : 'Bearer ' + token}})
	.then(response=>{return response})
	.catch(error=>{return 'No photo'})
}

const PostRequest = async (api,body,token) =>{
	return axios.post(api_begining+api,body,headers(token))
	.then(response => {return response.data })
	.catch(error => {return error.response.data})
}

export const AddEventMember = async (body,token,idevent) => {
	const adder = await PostRequest('/events/' + idevent + '/subscribers',
		body,token
	)
	return adder
}
export const Login = async (body) => {
	const loger = await PostRequest('/auth/login',
		body,
	)
	return loger
}

export const Signup = async (body,token) => {
	const signer = await PostRequest('/auth/signup',
		body,
	)
	return signer
}

export const addEvent = async (body,token) => {
	const adder = await PostRequest('/events',
		body,token
	)
	return adder
}

export const postPhoto = async (body,token) => {
	return axios({
		method:'post',
		url:api_begining+'/multimedias',
		data:body,
		headers: {
			"Content-Type": "multipart/form-data",
			'Authorization' : 'Bearer ' + token 
		},
	})
	.then(response=> {return response})
	.catch(error => {return error})
}