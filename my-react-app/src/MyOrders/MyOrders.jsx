import React, { useContext, useEffect, useState } from 'react'
import { StoreContext } from '../context/StoreContext'
import axios from 'axios'
import { assets } from '../assets/frontend_assets/assets'

const MyOrders = () => {
    const [data,setData] = useState([])
    const{token,url} = useContext(StoreContext)
    const fetchOrders = async () => {
        const response = await axios.post(`${url}/api/order/userorders`,{},{headers:{token}})
        setData(response.data.data)
    }
    useEffect(()=>{
        if(token){
            fetchOrders()
        }
    },[token])
  return (
    <div className='myorders my-12 mx-0'>
      <h2 className="text-3xl font-cute">My Orders</h2>
      <div className="container flex flex-col gap-5 mt-7">
        {
            data.map((order,index)=>{
                return(
                   <div className="myorderss items-center gap-7 text-lg p-[10px_20px] text-gray-700 border border-red-500" key={index}>
                   <img src={assets.parcel_icon} alt="" className="w-12" />
                   <p className="">{order.items.map((item,index)=>{
                   if(index=== order.items.length-1){
                    return item.name+" x"+item.quantity
                   }else{
                    return item.name+" x"+item.quantity+", "
                   }
                   })}</p>
                   <p>${order.amount}.00</p>
                   <p>Items : {order.items.length}</p>
                   <p className=""><span className="text-red-500">&#x25cf;</span><b className='font-bold text-gray-900 '>{order.status}</b></p>
                   <button className="border-none p-[12px_0px] bg-red-200 rounded cursor-pointer text-gray-600" onClick={fetchOrders}>Track Order</button>
                   </div>
                )
            })
        }
      </div>
    </div>
  )
}

export default MyOrders
