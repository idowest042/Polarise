import React, { useState } from 'react'
import './LoginPopUp.css'
import { assets } from '../../assets/frontend_assets/assets'
import { useContext } from 'react'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'
import { toast } from 'react-toastify'
const LoginPopUp = ({setShowLogin}) => {
  const {url,setToken,token} = useContext(StoreContext)
    const[currentState, setCurrentState] = useState('Sign Up')
    const [data,setData] = useState({
      name:"",
      email:"",
      password:"",
    })
    const onChangeHandler = (e)=>{
      const name = e.target.name;
      const value = e.target.value;
      setData(data=>({...data,[name]:value}))
    }
    const onLogin = async (e)=>{
      e.preventDefault();
      let newUrl = url;
      if(currentState==='Login'){
        newUrl+='/api/user/login'

      }else{
         newUrl+='/api/user/register'
      }
     const response = await axios.post(newUrl,data)
     if(response.data){
        setToken(response.data.token)
        localStorage.setItem('token',response.data.token)
        setShowLogin(false)
        toast.success('Login Successful') 
    }
    else{
      alert(response.data.message)
     
    }
    }
    
  return (
    <div className='login-popup absolute z-[1] w-full h-full bg-[#00000090] grid'>
      <form onSubmit={onLogin} className="login-popup-container place-self-center w-[max(23vw,330px)] text-[#808080] bg-white flex flex-col gap-6 py-[25px] px-8 rounded-lg text-[8px]">
        <div className="login-popup-title flex justify-between items-center text-3xl text-black">
            <h2 className="">{currentState}</h2>
            <img src={assets.cross_icon} alt="" className="cursor-pointer w-4" onClick={()=>setShowLogin(false)} />
        </div>
        <div className="login-popup-input flex flex-col gap-5">
            {
                currentState === 'Sign Up'?<><input type="text" name="name" onChange={onChangeHandler} value={data.name} id=""placeholder='Your Name' required className='border border-[#c9c9c9] p-[10px] rounded-[4px] text-[18px] outline-none'/><br/></>:<></>
            }
            
            <input name="email" onChange={onChangeHandler} value={data.email} type="email" id=""placeholder='Your Email' required className='border border-[#c9c9c9] p-[10px] rounded-[4px] text-[18px] outline-none '/><br/>
            <input type="password" name="password" onChange={onChangeHandler} value={data.password} id=""placeholder='Password' required className='border border-[#c9c9c9] p-[10px] rounded-[4px] text-[18px] outline-none '/>
        </div>
        <button type='submit' className="border-none p-3 rounded-[4px] text-white bg-red-500 text-lg cursor-pointer">{currentState ==='Sign Up'? 'Create Account':'Login'}</button>
        <div className="login-popup-condition flex items-start gap-2 mt-[-15px] text-sm">
            <input type="checkbox" name="" id=""required className="mt-1 " />
            <p className="">By continuing, i agree to the terms of use & Privacy Policy</p>
        </div>
        {
            currentState === 'Sign Up'?<p className="text-sm">Create a new account? <span className="text-red-500 font-bold cursor-pointer text-sm" onClick={()=>setCurrentState('Login')}>Click here</span></p>:<p className="text-sm">already have an account? <span onClick={()=>setCurrentState('Sign Up')} className="text-red-500 font-bold cursor-pointer text-sm">Click here</span></p>
        }

      </form>
    </div>
  )
}

export default LoginPopUp
