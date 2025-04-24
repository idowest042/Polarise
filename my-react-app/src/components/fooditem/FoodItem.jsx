import React, { useContext } from 'react'
import './FoodItem.css'
import { assets } from '../../assets/frontend_assets/assets'
import { StoreContext } from '../../context/StoreContext'

const FoodItem = ({id, name, price, description, image}) => {
  const { cartItems, addToCart, removeFromCart } = useContext(StoreContext);
  
  return (
    <div className='food-item w-full h-full flex flex-col justify-between m-auto rounded-[15px] shadow-lg transition duration-300'>
  <div className="food-item-img-container relative h-[200px] overflow-hidden">
    <img 
      src={image} 
      className='food-item-image w-full h-full object-cover rounded-t-[15px] hover:scale-105 transition duration-300' 
      alt="" 
    />
        {
          !cartItems[id] > 0 
            ? <img 
                src={assets.add_icon_white} 
                alt="" 
                className="w-[35px] absolute bottom-[15px] right-4 cursor-pointer rounded-[50%]" 
                onClick={() => addToCart(id)} 
              />
            : <div className="absolute bottom-[15px] right-[15px] flex items-center gap-3 p-[6px] rounded-[50px] bg-white">
                <img src={assets.remove_icon_red} alt="" className="w-[30px]" onClick={() => removeFromCart(id)}/>
                <p>{cartItems[id]}</p>
                <img src={assets.add_icon_green} alt="" className="w-[30px]" onClick={() => addToCart(id)}/>
              </div>
        }
      </div>
      <div className="food-item-info p-5">
        <div className="food-item-name-rating flex justify-between items-center mb-3">
          <p className="text-xl font-bold font-cute">{name}</p>
          <img src={assets.rating_starts} alt="" className="w-[70px]"/>
        </div>
        <p className="food-item-desc text-gray-800 text-xs">{description}</p>
        <p className="food-item-price text-red-500 text-2xl font-bold my-3 mx-0">${price}</p>
      </div>
    </div>
  )
}

export default FoodItem