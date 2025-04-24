import React, { useContext } from "react";
import "./Cart.css";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";
const Cart = () => {
  const { cartItems, setCartItems, food_list, removeFromCart,getTotalCartAmount } =
    useContext(StoreContext);
    const navigate = useNavigate();
  return (
    <div className="cart mt-24 ">
      <div className="cart-items">
        <div className="cart-items-title">
          <p className="">items</p>
          <p className="">title</p>
          <p className="">price</p>
          <p className="">quantity</p>
          <p className="">total</p>
          <p className="">remove</p>
        </div>
        <br className="" />
        <hr className="" />
        {food_list.map((item, index) => {
          if (cartItems[item._id] > 0) {
            return (
              <>
                <div
                  className="cart-items-title c my-3 mx-0 text-black"
                  key={index}
                >
                  <img src={item.image} alt="" className="w-16" />
                  <p className="">{item.name}</p>
                  <p>${item.price}</p>
                  <p className="">{cartItems[item._id]}</p>
                  <p className="">${item.price * cartItems[item._id]}</p>
                  <p
                    className="cursor-pointer"
                    onClick={() => removeFromCart(item._id)}
                  >
                    X
                  </p>
                </div>
                <hr className="h-[1px] bg-[#e2e2e2] border-none" />
              </>
            );
          }
        })}
      </div>
      <div className="cart-bottom mt-20 flex justify-between gap-[max(12vw,20px)]">
        <div className="cart-total flex-1 flex flex-col gap-5">
          <h2 className="">Cart Totals</h2>
          <div className="">
            <div className="cart-total-details flex justify-between text-[#555]">
              <p className="">Subtotal</p>
              <p className="">${getTotalCartAmount()}</p>
            </div>
            <hr className="" />
            <div className="cart-total-details flex justify-between text-[#555]">
              <p className="">Delivery fee</p>
              <p className="">${getTotalCartAmount()===0?0:2}</p>
            </div>
            <hr className="" />
            <div className="cart-total-details flex justify-between text-[#555]">
              <b className="">Total</b>
              <b className="">${getTotalCartAmount()+2}</b>
            </div>
          </div>
          <button onClick={()=>navigate("/order")} className="border-none text-white bg-red-500 w-[max(15vw,200px)] py-3 px-0 rounded-md cursor-pointer">
            Proceed to Checkout
          </button>
        </div>
        <div className="cart-promocode flex-1">
          <div className="">
            <p className="text-[#555]">
              If you have a promo code, Enter it here
            </p>
            <div className="cart-promocode-input mt-3 flex justify-between items-center bg-[#eaeaea] rounded-md">
              <input
                type="text"
                placeholder="Promo Code"
                className="bg-transparent border-none outline-none pl-3"
              />
              <button className="w-[max(10vw,150px)] py-3 px-1 bg-black border-none text-white rounded" >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
