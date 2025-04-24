import React from 'react'
import Navbar from './components/Navbar/Navbar'
import Sidebar from './components/sidebar/Sidebar'
import {Route, Routes} from 'react-router-dom'
import Add from './pages/Add'
import List from './pages/List'
import Order from './pages/Order'
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const App = () => {
  const url = 'https://polarise-back-end.vercel.app'
  return (
    <div>
      <ToastContainer/>
      <Navbar/>
      <hr/>
      <div className="app-content flex">
        <Sidebar/>
        <Routes>
          <Route path='/add' element={<Add url={url}/>}/>
          <Route path='/list' element={<List url={url}/>}/>
          <Route path='/orders' element={<Order url={url}/>}/>
        </Routes>
      </div>
    </div>
  )
}

export default App
