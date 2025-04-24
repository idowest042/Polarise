import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

const List = ({url}) => {
  const[list,setList] = useState([])
  const fetchList = async () => {
    const response = await axios.get(`${url}/api/food/list`)
    if(response.status === 200) {
      setList(response.data.data)
    }
    else{
      toast.error('Error fetching list')
    }
  }
  const removeFood = async (id) => {
    console.log(id)
    const response = await axios.post(`${url}/api/food/remove`,{id})
    if(response.status === 200) {
      toast.success('Food removed successfully')
      fetchList()
    }
    else{
      toast.error('Error removing food')
    }
  }
  useEffect(()=>{
    fetchList()
  },[])
  return (
    <div className='list add flex-cos'>
      <p className="">All foods List</p>
      <div className="list-table">
        <div className="list-table-format title grid grid-cols-[0.5fr_2fr_1fr_1fr_0.5fr] items-center gap-3 py-3 px-4 border border-gray-400 text-lg bg-gray-300"> 
          <b className="">Image</b>
          <b className="">Name</b>
          <b className="">Category</b>
          <b className="">Price</b>
          <b className="">Action</b>
        </div>
        {list.map((item,index) =>{
          return(
            <div className="list-table-format grid grid-cols-[0.5fr_2fr_1fr_1fr_0.5fr] items-center gap-3 py-3 px-4 border border-gray-400 text-lg" key={index}>
              <img src={item.image} alt="w-[50px]" className=""/>
              <p className="">{item.name}</p>
              <p className="">{item.category}</p>
              <p className="">${item.price}</p>
              <p className="cursor-pointer" onClick={()=>removeFood(item._id)}>X</p>
              </div>
        )}) }
      </div>
      
    </div>
  )
}

export default List
