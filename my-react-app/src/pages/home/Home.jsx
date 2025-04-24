import React, { useState } from 'react'
import './Home.css'
import Header from '../../components/Header/Header'
import ExploreMenu from '../../components/explore menu/ExploreMenu'
import FoodDisplay from '../../components/Fooddisplay/FoodDisplay'
import AppDownload from '../../components/appdownload/AppDownload'
const Home = () => {
  const [category, setCategory] = useState('All')
  return (
    <div>
      <Header/>
      <ExploreMenu category={category} setCategory={setCategory}/>
      <FoodDisplay category={category}/>
      <AppDownload/>
    </div>
  )
}

export default Home
