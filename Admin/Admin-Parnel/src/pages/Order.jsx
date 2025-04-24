import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { assets } from '../assets/assets';

const Order = ({url}) => {
  const [data,setData] = useState([])
  const fetchAllOrders = async () => {
    const response = await axios.get(`${url}/api/order/list`)
    if(response.data){
      setData(response.data.data)
      console.log(response.data.data)
    }else{
      toast.error("Something went wrong, please try again later")
    }
    
  }
  const statusHandler = async (e, orderId) => {
    const status = e.target.value;
    try {
      const response = await axios.post(`${url}/api/order/status`, { orderId, status });
      if (response.data) {
        await fetchAllOrders();
        toast.success("Status updated successfully");
      }
    } catch (error) {
      console.error("Status update failed:", error);
      toast.error("Failed to update status");
    }
  };
  
useEffect(()=>{
fetchAllOrders()
},[])
  return (
    <div className='order add'>
      <h2 className="">Order Page</h2>
      <div className="order-list">
        {
          data.map((dat,index)=>(
           <div className="order-item grid grid-cols-[0.5fr_2fr_1fr_1fr_1fr] items-start gap-7 border border-red-500 p-5 m-[30px_0px] text-lg text-gray-700" key={index}>
            <img src={assets.parcel_icon} alt="" className="" />
            <div className=" font-bold">
              <p className=''>{dat.items.map((item,index)=>{
                   if(index=== dat.items.length-1){
                    return item.name+" x"+item.quantity
                   }else{
                    return item.name+" x"+item.quantity+", "
                   }
                  
              })}</p>
              <p className="order-item-name font-bold mt-7 mb-1 ">
                {dat.address.firstName + " " + dat.address.lastName}
              </p>
              <div className="order-item-address mb-2 ">
                <p>{dat.address.street+ ", "}</p>
                <p>{dat.address.city+", " + dat.address.state+ ", " + dat.address.country + ', ' + dat.address.zipCode} </p>
              </div>
              <p className="">{dat.address.phone}</p>
            </div>
            <p>Items : {dat.items.length}</p>
            <p>${dat.amount}</p>
            <select onChange={(e)=>statusHandler(e, dat._id)} value={dat.status} className="bg-yellow-50 border border-red-500 w-[max(20vw,130px)] p-3 outline-none cursor-pointer">
              <option value="Food Processing" className="">Food Processing</option>
              <option value="Out for delivery" className="">Out for deliverey</option>
              <option value="Delivered" className="">Delivered</option>
            </select>
           </div>
          ))
        }
      </div>
      
    </div>
  )
}

export default Order
