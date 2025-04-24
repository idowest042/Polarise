import { Search, ShoppingBasket, Menu } from 'lucide-react'
import React, { useContext, useState } from 'react'
import { assets } from '../../assets/frontend_assets/assets'
import './Navbar.css'
import { Link, useNavigate } from "react-router-dom"
import { toast } from 'react-toastify'
import { StoreContext } from '../../context/StoreContext'

const Navbar = ({ setShowLogin }) => {
    const [menu, setMenu] = useState('menu');
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { getTotalCartAmount, token, setToken } = useContext(StoreContext)
    const navigate = useNavigate()
    
    const logout = () => {
        localStorage.removeItem('token')
        setToken('')
        toast.success('Logout successfully')
        navigate('/')
    }

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    }

    return (
        <div className='navbar px-4 md:px-8 py-4 flex justify-between items-center'>
            {/* Left side - Logo and Hamburger */}
            <div className='flex items-center gap-4'>
                <button 
                    className='md:hidden'
                    onClick={toggleMobileMenu}
                >
                    <Menu className='size-6' />
                </button>
                <Link to="/">
                    <h1 className="font-joseph font-bold text-2xl sm:text-3xl md:text-4xl logo">Polarise Foods</h1>
                </Link>
            </div>

            {/* Center - Navigation (desktop) */}
            <ul className="hidden md:flex gap-5 list-none color-[#49557e] text-lg font-sans cursor-pointer">
                <Link onClick={() => setMenu('home')} className={menu === 'home' ? 'active' : ''} to='/'>home</Link>
                <a href='#explore-menu' onClick={() => setMenu('menu')} className={menu === 'menu' ? 'active' : ''}>menu</a>
                <a href='#app-download' onClick={() => setMenu('mobile-app')} className={menu === 'mobile-app' ? 'active' : ''}>mobile app</a>
                <a href='#footer' onClick={() => setMenu('contact-us')} className={menu === 'contact-us' ? 'active' : ''}>contact us</a>
            </ul>

            {/* Right side - Actions */}
            <div className="flex items-center gap-4 sm:gap-6 md:gap-10">
                <Search className='hidden md:block' />
                <div className="flex gap-3 sm:gap-6 relative">
                    <Link to="/cart" className="cart-icon flex items-center relative cursor-pointer">
                        <ShoppingBasket className='size-6 sm:size-8 md:size-10' />
                        <div className={`dot ${getTotalCartAmount() ? "absolute min-w-3 min-h-3 bg-red-500 rounded-full top-[1px] right-[75%]" : ""}`}></div>
                    </Link>
                    
                    {!token ? (
                        <button 
                            className='transition ease-in-out delay-100 bg-transparent text-sm sm:text-base text-[#49557e] border border-red-500 py-1 px-3 sm:py-2 sm:px-6 rounded-[50px] cursor-pointer hover:bg-[#fff4f2]' 
                            onClick={() => setShowLogin(true)}
                        >
                            Sign in
                        </button>
                    ) : (
                        <div className='relative navbar-profile'>
                            <img src={assets.profile} alt="" className='w-8 sm:w-10 md:w-12' />
                            <ul className="nav-profile-dropdown absolute hidden right-0 z-[1] cursor-pointer">
                                <Link to='/myorders'><img src={assets.bag_icon} alt="" /><p>Orders</p></Link>
                                <hr />
                                <li onClick={logout}><img src={assets.logout_icon} alt="" /><p>Logout</p></li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>

            {/* Mobile Menu (shown when hamburger is clicked) */}
            {mobileMenuOpen && (
                <div className="md:hidden absolute top-20 left-0 right-0 bg-white z-50 py-4 px-6">
                    <ul className="flex flex-col gap-4 list-none color-[#49557e] text-lg font-sans cursor-pointer">
                        <Link 
                            onClick={() => { setMenu('home'); setMobileMenuOpen(false); }} 
                            className={menu === 'home' ? 'active' : ''} 
                            to='/'
                        >
                            home
                        </Link>
                        <a 
                            href='#explore-menu' 
                            onClick={() => { setMenu('menu'); setMobileMenuOpen(false); }} 
                            className={menu === 'menu' ? 'active' : ''}
                        >
                            menu
                        </a>
                        <a 
                            href='#app-download' 
                            onClick={() => { setMenu('mobile-app'); setMobileMenuOpen(false); }} 
                            className={menu === 'mobile-app' ? 'active' : ''}
                        >
                            mobile app
                        </a>
                        <a 
                            href='#footer' 
                            onClick={() => { setMenu('contact-us'); setMobileMenuOpen(false); }} 
                            className={menu === 'contact-us' ? 'active' : ''}
                        >
                            contact us
                        </a>
                    </ul>
                </div>
            )}
        </div>
    )
}

export default Navbar