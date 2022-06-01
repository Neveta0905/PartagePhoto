import React,{useState, useEffect} from 'react'
import './App.css';
import Form from './Components/form'
import Banniere from './Components/banniere'
import Main from './Components/main'
import Album from './Components/album'
import { Routes,Route,useNavigate } from 'react-router-dom'
import { UserContext } from './utils/context.js'
const axios = require('./utils/axios')
const session_vars = require('./utils/utils.js')

function App() {
  useEffect(() => {
      if(!userConnected && document.location.pathname !== '/')
        window.location.href=('../')
    ;
  }, [])

  let navigate = useNavigate()
  const [datas,setDatas] = useState()
  const [userId,setUserId] = useState(sessionStorage.getItem('userId'))
  const [userToken,setUserToken] = useState(sessionStorage.getItem('userToken'))
  const [userConnected,setUserConnected] = useState(sessionStorage.getItem('userConnected'))
  const [userDatas,setUserDatas] = useState({userId,userToken,userConnected}) // regroup for context with only one var

  const [events,setEvents] = useState()

  
  const connexion_body = (form) =>{
    const mail = form.get('mail')
    const password = form.get('password')
    return {mail:mail,password:password}
  }

  const signup_body = (form) =>{
    const mail = form.get('mail')
    const password = form.get('password')
    const nickname = form.get('nickname')
    return {mail:mail,password:password,nickname:nickname}
  }

  const login = async (form) => {
    let log_info = await axios.Login(connexion_body(form))
    if(log_info.error)
      alert(log_info.error)

    else{
      const user_infos = {
        userId:log_info.userId,
        userToken:log_info.token,
        userConnected:true
      }

      session_vars.setSessionVars(user_infos) // mise en session
      setUserId(log_info.userId) // State
      setUserToken(log_info.userToken) // State
      setUserConnected(true) // State
      setUserDatas(user_infos); // State
      navigate('/main')
    }

  }

  const signup = async (form) => {
    let sign_info = await axios.Signup(signup_body(form))
    if(sign_info.error)
      alert(sign_info.error)
    else{
      navigate('../')
    }
  }

  const disconnect = () => {
    const user_infos = ['userId','userToken','userConnected']
    session_vars.remSessionVars(user_infos) // retrait des sessions
    setUserId('') // State
    setUserToken('') // State
    setUserConnected(false)
    setUserDatas()
    navigate('../')
  }

  return (
    <div className="App">
      <Banniere action={disconnect} connected={userConnected} />
      <UserContext.Provider value={userDatas}>
        <Routes>
          <Route path='' element={<Form action={login}/>}></Route>
          <Route path='/signup' element={<Form action={signup}/>}></Route>
          <Route path='/main' element={<Main/>}></Route>
          <Route path='/main/:eventId' element={<Album/>}></Route>
          <Route path='*' element={<h1>404 Error not found</h1>}></Route>
        </Routes>
      </UserContext.Provider>
    </div>
  );
}

export default App;
