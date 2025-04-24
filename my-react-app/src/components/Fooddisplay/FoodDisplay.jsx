import React,{useContext} from 'react'
import './FoodDisplay.css'
import { StoreContext } from '../../context/StoreContext'
import FoodItem from '../fooditem/FoodItem'
const FoodDisplay = ({category}) => {
    const {food_list} = useContext(StoreContext)
  return (<>
    <h2 className="text-3xl font-bold">Top dishes near you</h2>
    <div className='food-display flex mt-8 ' id='food-display'>
     
      <div className="food-display-list mt-5 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6 animate-fadein">
        {
            food_list.map((item, index) => {
                if(category === 'All' || category === item.category){
                    return <FoodItem key={index} id={item._id} name={item.name} price={item.price} description={item.description} image={item.image}/>
}})
        }
      </div>
    </div>
 </> )
}

export default FoodDisplay
