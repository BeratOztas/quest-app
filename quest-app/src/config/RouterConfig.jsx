import React, { useEffect } from 'react'
import { Routes,Route, useNavigate, Navigate } from 'react-router-dom'
import Home from '../pages/Home'
import User from '../pages/User'
import Auth from '../pages/Auth'
import { useSelector } from 'react-redux'

function RouterConfig() {

  const {response} =useSelector((store)=>store.auth);

  useEffect(()=>{
    
  },[response]);
  return (
    <div>
       <Routes>
         <Route path="/" element={<Home/>}/>
         <Route path="/users/:userId" element={<User/>} />
          <Route path='/auth' element={
            localStorage.getItem("currentUser")!=null ?<Navigate to="/"/>:
            <Auth/>
          } />
       </Routes>
    </div>
  )
}

export default RouterConfig
