import { Search, ShoppingBasket } from 'lucide-react'
import React, { useContext, useState } from 'react'
import { assets } from '../../assets/frontend_assets/assets'
import './Navbar.css'
import { Link, useNavigate } from "react-router-dom"
import { toast } from 'react-toastify'
import { StoreContext } from '../../context/StoreContext'

const Navbar = ({ setShowLogin }) => {
    const [menu, setMenu] = useState('menu');
    const { getTotalCartAmount, token, setToken } = useContext(StoreContext)
    const navigate = useNavigate()
    const logout = () => {
        localStorage.removeItem('token')
        setToken('')
        toast.success('Logout successfully')
        navigate('/')
    }

    return (
        <div className='navbar px-4 md:px-8 py-4 flex flex-wrap justify-between items-center'>
            <Link to="/" className='w-full md:w-auto text-center md:text-left mb-4 md:mb-0'>
                <h1 className="font-joseph font-bold text-3xl sm:text-4xl logo">Polarise Foods</h1>
            </Link>
            
            <ul className="navbar-menu w-full md:w-auto flex justify-center flex-wrap gap-3 sm:gap-5 list-none color-[#49557e] text-base sm:text-lg font-sans cursor-pointer">
                <Link onClick={() => setMenu('home')} className={menu === 'home' ? 'active' : ''} to='/'>home</Link>
                <a href='#explore-menu' onClick={() => setMenu('menu')} className={menu === 'menu' ? 'active' : ''}>menu</a>
                <a href='#app-download' onClick={() => setMenu('mobile-app')} className={menu === 'mobile-app' ? 'active' : ''}>mobile app</a>
                <a href='#footer' onClick={() => setMenu('contact-us')} className={menu === 'contact-us' ? 'active' : ''}>contact us</a>
            </ul>
            
            <div className="navbar-rightt w-full md:w-auto flex justify-center items-center gap-5 sm:gap-10 mt-4 md:mt-0">
                <Search className='hidden sm:block' />
                <div className="search-icon flex gap-3 sm:gap-6 relative">
                    <Link to="/cart" className="cart-icon flex items-center relative cursor-pointer">
                        <ShoppingBasket className='size-8 sm:size-10' />
                        <div className={`dot ${getTotalCartAmount() ? "absolute min-w-3 min-h-3 bg-red-500 rounded-full top-[1px] right-[75%]" : ""}`}></div>
                    </Link>
                    
                    {!token ? (
                        <button className='transition ease-in-out delay-100 bg-transparent text-sm sm:text-base text-[#49557e] border border-red-500 py-1 px-4 sm:py-2 sm:px-6 md:py-3 md:px-8 rounded-[50px] cursor-pointer hover:bg-[#fff4f2]' 
                                onClick={() => setShowLogin(true)}>
                            Sign in
                        </button>
                    ) : (
                        <div className='relative navbar-profile'>
                            <img src={assets.profile} alt="" className='w-10 sm:w-12' />
                            <ul className="nav-profile-dropdown absolute hidden right-0 z-[1] cursor-pointer">
                                <Link to='/myorders'><img src={assets.bag_icon} alt="" /><p>Orders</p></Link>
                                <hr />
                                <li onClick={logout}><img src={assets.logout_icon} alt="" /><p>Logout</p></li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Navbar