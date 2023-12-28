import React from 'react'
import './App.css'
import { Routes,Route } from 'react-router-dom'
import Signin from './pages/signin/signin.jsx'
import Signup from './pages/signup/signup.jsx'
import Home from './pages/home/home.jsx'
import Tasks from './pages/tasks/tasks'
import Navbar from './components/navbar'
import { ToastContainer } from 'react-toastify'
import ForgetPass from './pages/signin/forgetPass/forgetPass'
function App() {
  
  return (
    <div className='App'>
      <Navbar/>
      <ToastContainer/>
    <Routes>
        <Route path='/' element={<Home/>}/>
        <Route exact path='/signin' element={<Signin/>}/>
        <Route exact path='/signup' element={<Signup/>}/>
        <Route exact path='/:userId' element={<Tasks/>}/>
        <Route exact path="/signin/forgetpass" element={<ForgetPass/>}/>
    </Routes>
    </div>
  )
}

export default App;
// 90deg, rgb(209, 204, 201), rgb(73, 189, 160) , rgb(233, 227, 227)