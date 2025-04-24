import React from 'react'
import './Sidebar.css'
import { assets } from '../../assets/assets'
import { NavLink } from 'react-router-dom'
const Sidebar = () => {
  return (
    <div className='sidebar w-[18%] min-h-[100vh] border-[#a9a9a9] border-t-0 border-r-2 text-[max(1vw,10px)]'>
      <div className="sidebar-options pt-12 pl-[20%] flex flex-col gap-5">
        <NavLink to='/add' className="sidebar-option flex items-center md:gap-3 border-2 border-[#a9a9a9] py-2 px-3 rounded-[3px_0px_0px_3px] cursor-pointer ">
            <img src={assets.add_icon} alt="" className='' />
            <p className="hidden lg:block">Add Items</p>
        </NavLink>
        <NavLink to='/list' className="sidebar-option flex items-center md:gap-3 border-2 border-[#a9a9a9] py-2 px-3 rounded-[3px_0px_0px_3px] cursor-pointer">
            <img src={assets.order_icon} alt="" className='' />
            <p className="hidden lg:block">List Items</p>
        </NavLink>
        <NavLink to='/orders' className="sidebar-option flex items-center md:gap-3 border-2 border-[#a9a9a9] py-2 px-3 rounded-[3px_0px_0px_3px] cursor-pointer">
            <img src={assets.order_icon} alt="" className='' />
            <p className="hidden lg:block">Orders</p>
        </NavLink>
      </div>
    </div>
  )
}

export default Sidebar
