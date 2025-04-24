import React from 'react'
import './Footer.css'
import {assets} from '../../assets/frontend_assets/assets'
const Footer = () => {
  
  return (
    <div className='text-[#d9d9d9] bg-gray-700 flex flex-col items-center gap-5 pb-5 px-[8vw] pt-20 mt-28' id='footer'>
      <div className="footer-content w-full grid md:grid-cols-[2fr_1fr_1fr] gap-20">
        <div className="footer-content-left">
            <h1 className='text-3xl font-bold font-joseph'>Polarise Foods</h1>
            <p className='text-[#747474] text-[max(1.4vw,16px)]'>Thank you for dining with us! ,we look forward to serving you again soon</p>
            <div className="flex">
              <img src={assets.facebook_icon} alt="" className="w-[40px] mr-4 " />
              <img src={assets.twitter_icon} alt="" className="w-[40px] mr-4 " />
              <img src={assets.linkedin_icon} alt="" className="w-[40px] mr-4 " />
            </div>
        </div>
        <div className="footer-content-center">
          <h2 className="text-white font-bold text-3xl">Company</h2>
          <ul className="">
            <li className="">Home</li>
            <li className="">About us</li>
            <li className="">Delivery</li>
            <li className="">Privacy Policy</li>
          </ul>
        </div>
        <div className="footer-content-right">
          <h2 className="text-white font-bold text-3xl">Get In Touch</h2>
          <ul>
            <li>+234-811-657-0523</li>
            <li>idowujo042@gmail.com</li>
          </ul>
        </div>
      </div>
      <hr className="w-full h-[2px] my-5 mx-0 bg-gray-300 border-none" />
      <p className="">Copyright 2025 &copy; <span className="font-joseph">Polarise.com</span>All right Reserved.</p>
    </div>
  )
}

export default Footer
