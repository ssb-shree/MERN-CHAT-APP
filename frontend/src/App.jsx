import React from 'react'

import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Register from './pages/Register'
import Login from './pages/Login'
import Homepage from './pages/Homepage'

import UserProfile from './pages/UserProfile'
import Settings from './pages/Settings'
const App = () => {
  return (
    <div>
      <Navbar/>

      <Routes>
        <Route path={"/"} element={<Homepage/>} />
        <Route path={"/register"} element={<Register/>} />
        <Route path={"/login"} element={<Login/>} />
        <Route path={"/profile"} element={<UserProfile/>} />
        <Route path={"/settings"} element={<Settings/>} />
      </Routes>
    </div>
  )
}

export default App