import React, { useState } from 'react'
import {User} from "lucide-react"
import Navbar from './components/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import Cart from './pages/cart/Cart'
import Home from './pages/home/Home'
import PlaceOrder from './pages/placeorder/PlaceOrder'
import Verify  from "./pages/placeorder/Verify"
import Footer from './components/footer/Footer'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import LoginPopUp from './components/loginpopup/LoginPopUp'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MyOrders from './MyOrders/MyOrders'
const App = () => {
  const [showLogin, setShowLogin] = useState(false)
  return (
    <>
    {
      showLogin ? <LoginPopUp setShowLogin={setShowLogin}/> : <></>
    }
    <div className='app'>
      <ToastContainer/>
      <Navbar setShowLogin={setShowLogin}/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/order' element={<PlaceOrder/>}/>
        <Route path="/verify" element={<Verify />} />
        <Route path='/myorders' element={<MyOrders/>}/>
      </Routes>
  
    </div>
    <Footer/>
    </>
  )
}

export default App
