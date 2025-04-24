import orderModel from '../models/orderModel.js';
import userModel from '../models/userModel.js';
import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
export const placeOrder = async (req, res) => {
   // orderController.js
const frontend_url = process.env.NODE_ENV === 'production'
? process.env.FRONTEND_URL  // ← You define this
: 'http://localhost:5173';             // ← Default dev URL
try {
    const newOrder = new orderModel({
        userId: req.userId,
        items: req.body.items,
        amount: req.body.amount,
        address: req.body.address,
        status: 'Food Processing',
    });
     await newOrder.save();
     await userModel.findByIdAndUpdate(req.userId, {cartData:{}})
     const line_items = req.body.items.map((item) => ({
        price_data:{
            currency: 'usd',
            product_data:{
                name: item.name,
            },
            unit_amount: item.price * 100
        },
        quantity: item.quantity,
     }))
     line_items.push({
        price_data:{
            currency: 'usd',
            product_data:{
                name: 'Delivery Charges',
            },
            unit_amount:200,
        },
        quantity: 1,
     })
     const session = await stripe.checkout.sessions.create({
        line_items:line_items,
        mode:'payment',
        success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
        cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
     })
        res.status(200).json({session_url: session.url})
} catch (error) {
    console.log(error)
    res.status(500).json({message: 'Error placing order'});
}
}
export const userOrder = async (req,res)=>{
try{
 const orders = await orderModel.find({userId:req.userId})
    res.status(200).json({data:orders})
}catch(error){
    console.log(error)
    res.status(500).json({message: 'Error placing userOrder'});
}
}
export const listOrders = async (req, res) => {
    try{
        const orders = await orderModel.find({})
        res.status(200).json({data:orders})
    }catch{
        console.log(error)
        res.status(500).json({message: 'Error in list Order'});
    }
}
export const updateOrderStatus = async (req, res) => {
    try {
        const { orderId, status } = req.body;
        await orderModel.findByIdAndUpdate(orderId, { status: status });
        res.status(200).json({ message: 'Order status updated successfully' });
    } catch (error) {
        console.log(error,'Error in update Order Status')
        res.status(500).json({message: 'internal server error' });
    }
}
