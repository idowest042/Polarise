import React from 'react'
import './Header.css'

const Header = () => {
  return (
    <div className='header'>
      <div className="header-contents">
        <h2>Order your Favourite food</h2>
        <p>
          Choose from our diverse menu crafted with the finest ingredients.
        </p>
        <button>
          <a href="#explore-menu">View Menu</a>
        </button>
      </div>
    </div>
  )
}

export default Header