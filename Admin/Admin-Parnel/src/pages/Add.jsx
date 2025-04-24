import React, {  useState } from 'react'
import { assets } from '../assets/assets'
import axios from 'axios'
import { toast } from 'react-toastify'

const Add = ({url}) => {
    const [image,setImage] = useState(false)
    const [loading,isLoading] =useState(false)
    const [data,setData] = useState({
        name:'',
        description:'',
        category:'Salad',
        price:'',
    })
    const onChangeHandler = (e)=>{
        const name = e.target.name;
        const value = e.target.value;
        setData(data=>({...data,[name]:value}))
    }
    const onSubmitHandler = async (e)=>{
    e.preventDefault()
    isLoading(true)
    try{
        const formData = new FormData();
        formData.append('name',data.name)
        formData.append('price',Number(data.price))
        formData.append('description',data.description)
        formData.append('category',data.category)
        formData.append('image',image)
        const response = await  axios.post(`${url}/api/food/addfood`,formData,)
        if(response.status === 201){
            setData({
                name:'',
                description:'',
                category:'Salad',
                price:'',
            })
            setImage(false)
            toast.success('Product added successfully')
        }
        else{
            toast.error('Something went wrong')
            console.log(error.response.data.message)
        }
    }
    catch(error){
        console.log(error.response.data.message)
        toast.error(error.response.data.message)
    }finally{
        isLoading(false)
    }
}
  return (
    <div className='add w-[70%] ml-[max(5vw,25px)] mt-12 text-gray-500 text-lg '>
        <form onSubmit={onSubmitHandler} className="flex-cos gap-7">
            <div className="add-img-upload flex-cos">
              <p className="">Upload Image</p>
              <label htmlFor="image" className="">
                <img src={image ?URL.createObjectURL(image):assets.upload_area} alt="" className="w-32 cursor-pointer" />
              </label>
              <input type="file" name="" id="image" className="hidden" required onChange={(e)=>setImage(e.target.files[0])} />
            </div>
            <div className="add-product-name w-[max(40%,20px)] flex-cos ">
                <p className="">Product name</p>
                <input type="text" onChange={onChangeHandler} value={data.name}  name='name' placeholder='Type here' className='p-3 border-gray-400 outline-none border' />
            </div>
            <div className="add-product-description w-[max(50%,30px)] flex-cos ">
                <p>Product Description</p>
                <textarea onChange={onChangeHandler} value={data.description} name="description" rows='6' placeholder='Write Content here' required className="p-3 border-gray-400 outline-none border"></textarea>
            </div>
            <div className="add-category-price flex gap-5 p-3 items-center">
                <div className="add-category flex-cos">
                    <p>Product category</p>
                    <select name="category" id="" className="cursor-pointer" onChange={onChangeHandler} value={data.category}>
                        <option value="Pastries">Pastries</option>
                        <option value="Soups">Soups</option>
                        <option value="Salad">Salad</option>
                        <option value="Rice">Rice</option>
                        <option value="Cakes">Cakes</option>
                        <option value="Pasta">Pasta</option>
                        <option value="Noodles">Noodles</option>
                        <option value="Soups">Soups</option>
                        <option value="Protein">Protein</option>
                        </select>
                </div>
                <div className="add-price flex-cos">
                    <p className="">Product price</p>
                    <input type="Number" name="price"  className='outline-none border-gray-400 border' onChange={onChangeHandler} value={data.price} />
                </div>
            </div>
            <button type='submit' className='max-w-[120px] border-none p-2 bg-black text-white cursor-pointer'>{loading ? 'loading...' : 'Add'}</button>
        </form>
     
    </div>
  )
}

export default Add
