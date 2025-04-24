import React from 'react'
import './Header.css'
import { Link } from 'react-router-dom'
const Header = () => {
  return (
    <div className='header'>
      <div className="header-contents">
        <h2 className="font-bold text-white text-[max(4.5vw,22px)]">Order your Favourite food</h2>
        <p className="text-red-700 font-bold text-xl font-cute">Choose from a diverse menu featuring a delectable array of dishes crafetd with the finest ingredients and culinary expertise
          expertise. Our mission is to satisfy <span className='text-white'>Your</span> cravings and elevate your dining experience, one bite at a time. 
        </p>
        <button className=" hover:bg-red-300 transition ease-out delay-200 text-bold text-[#747474] py-[1vw] px-[2.3vw] bg-white text-[max(1vw,13px)] rounded-full"><a href="#explore-menu"> View Menu</a></button>
      </div>
    </div>
  )
}

export default Header
