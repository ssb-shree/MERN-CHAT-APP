import React, { useEffect } from 'react'

import { Loader } from "lucide-react"

import {Toaster} from "react-hot-toast"
import { Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Register from './pages/Register'
import Login from './pages/Login'
import Homepage from './pages/Homepage'

import UserProfile from './pages/UserProfile'
import Settings from './pages/Settings'
import { useAuthStore } from './store/useAuthStore'
const App = () => {

  const {authUser, checkAuth, isCheckingAuth} = useAuthStore()

  useEffect( ()=>{checkAuth()}, [] );
  console.log(authUser)


  if(isCheckingAuth && !authUser) return (
    <div className='flex h-screen justify-center items-center'>
      <Loader className="size-10 animate-spin" />
    </div>
  );
  
  return (

    <div>
      <Navbar/>

      <Routes>
        <Route path={"/"} element={ authUser ? <Homepage/> : <Navigate to={"/login"} />}/>
        <Route path={"/register"} element={ !authUser ? <Register/> : <Navigate to={"/"} />} />
        <Route path={"/login"} element={ !authUser ? <Login/> : <Navigate to={"/"} />} />
        <Route path={"/profile"} element={authUser ? <UserProfile/> : <Navigate to={"/login"} />} />
        <Route path={"/settings"} element={authUser ? <Settings/> : <Navigate to={"/login"} />} />
      </Routes>

      <Toaster/>
    </div>

  )
}

export default App