import React from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'
const Navbar = () => {
  return (
    <div className='navbar flex justify-between items-center py-2 px-[4%]'>
  <h1 className="font-joseph font-bold text-3xl">Polarise Food</h1>
    <img src={assets.profile} alt="" className="w-10" />      
    </div>
  )
}

export default Navbar
