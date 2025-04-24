import React from 'react'
import { assets } from '../../assets/frontend_assets/assets'

const AppDownload = () => {
  return (
    <div className="my-auto mx-auto mt-[100px] text-2xl text-center  font-bold" id='app-download'>
      <p className="">For Better Experience download <br/><span className="font-joseph text-2xl">Polarise Food</span></p>
    <div className="flex justify-center items-center gap-3 mt-10">
        <img src={assets.play_store} alt=""  className='w-[max(30vw,120px)] max-w-44 transition delay-75 cursor-pointer hover:scale-105'/>
        <img src={assets.app_store} alt="" className='w-[max(30vw,120px)] max-w-44 transition delay-75 cursor-pointer hover:scale-105' />
    </div>
    </div>
  )
}

export default AppDownload
