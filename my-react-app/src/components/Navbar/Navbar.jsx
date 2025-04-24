import { Search, ShoppingBasket } from 'lucide-react'
import React, { useContext, useState } from 'react'
import { assets } from '../../assets/frontend_assets/assets'
import './Navbar.css'
import {Link, useNavigate} from "react-router-dom"
import { toast } from'react-toastify'
import { StoreContext } from '../../context/StoreContext'

const Navbar = ({setShowLogin}) => {
    const [menu, setMenu] = useState('menu');
    const {getTotalCartAmount,token,setToken} = useContext(StoreContext)
    const navigate = useNavigate()
    const logout = () => {
        localStorage.removeItem('token')
        setToken('')
        toast.success('Logout successfully')
        navigate('/')
    }
  return (
    <div className='navbar'>
      <Link to="/">
      <h1 className="font-joseph font-bold text-4xl logo">Polarise Foods</h1>
      </Link>
      <ul className="navbar-menu capitalize flex list-none gap-5 color-[#49557e] text-lg font-sans cursor-pointer">
        <Link onClick={()=>setMenu('home')} className={menu==='home'?'active':''} to='/'>home</Link>
        <a href='#explore-menu' to="#food-display" onClick={()=>setMenu('menu')} className={menu==='menu'?'active':''}>menu</a>
        <a href='#app-download' onClick={()=>setMenu('mobile-app')} className={menu==='mobile-app'?'active':''}>mobile app</a>
        <a href='#footer' onClick={()=>setMenu('contact-us')} className={menu==='contact-us'?'active':''}>contact us</a>
      </ul>
      <div className="navbar-rightt flex items-center gap-10">
       <Search className='i'/>
       <div className="search-icon flex gap-6 relative">
        <Link to="/cart" className="cart-icon flex items-center relative cursor-pointer">
      <ShoppingBasket className='size-10'/>
      </Link>
        <div className={`dot   ${getTotalCartAmount()? "absolute min-w-3 min-h-3 bg-red-500 rounded-full top-[1px] right-[75%]":"" }`}>
            
        </div>
        {
          !token? <button className='transition ease-in-out delay-100 bg-transparent text-base text-[#49557e] border border-red-500 py-2 px-6 md:py-3 md:px-8 rounded-[50px] cursor-pointer hover:bg-[#fff4f2]' onClick={()=>setShowLogin(true)}>Sign in</button>
          :<div className='relative navbar-profile'>
            <img src={assets.profile} alt="" className='w-12' />
            <ul className="nav-profile-dropdown absolute hidden right-0 z-[1] cursor-pointer  ">
              <Link to='/myorders'><img src={assets.bag_icon} alt="" className="" /><p>Orders</p></Link>
              <hr/>
              <li onClick={logout}><img src={assets.logout_icon} alt="" className="" /><p>Logout</p></li>
            </ul>
            </div>
        }
            
        
       </div>
      </div>
    </div>
  )
}

export default Navbar
