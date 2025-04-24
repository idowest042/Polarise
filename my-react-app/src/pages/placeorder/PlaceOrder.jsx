import { useContext, useEffect, useState } from "react";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const PlaceOrder = () => {
  const {
    cartItems,
    food_list,
    removeFromCart,
    getTotalCartAmount,
    token,
    url,
  } = useContext(StoreContext);

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    phone: "",
  });

  const onChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData({ ...data, [name]: value });
  };

  const placeOrder = async (e) => {
    e.preventDefault();
    let orderItems = [];
    food_list.forEach((item) => {
      if (cartItems[item._id] > 0) {
        orderItems.push({ ...item, quantity: cartItems[item._id] });
      }
    });

    const orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 2,
    };

    try {
      const response = await axios.post(`${url}/api/order/place`, orderData, {
        headers: { token },
      });
      const { session_url } = response.data;
      if (session_url) {
        window.location.replace(session_url);
      } else {
        alert("Something went wrong. Please try again later.");
      }
    } catch (err) {
      alert("Something went wrong. Please try again later.");
    }
  };

  useEffect(() => {
    if (!token) {
      alert("Please login to place an order");
      window.location.replace("/");
    } else if (getTotalCartAmount() === 0) {
      alert("Please add items to cart");
      window.location.replace("/cart");
    }
  }, [token]);

  return (
    <div className="mt-24 p-4">
      <form
        onSubmit={placeOrder}
        className="flex flex-col lg:flex-row gap-12"
      >
        {/* Left: Delivery Information */}
        <div className="w-full lg:w-1/2">
          <p className="text-2xl font-bold mb-8">Delivery Information</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              required
              type="text"
              placeholder="First Name"
              name="firstName"
              onChange={onChange}
              value={data.firstName}
              className="p-3 border rounded"
            />
            <input
              required
              type="text"
              placeholder="Last Name"
              name="lastName"
              onChange={onChange}
              value={data.lastName}
              className="p-3 border rounded"
            />
          </div>

          <input
            required
            type="email"
            placeholder="Email Address"
            name="email"
            onChange={onChange}
            value={data.email}
            className="p-3 border rounded w-full my-4"
          />

          <input
            required
            type="text"
            placeholder="Street"
            name="street"
            onChange={onChange}
            value={data.street}
            className="p-3 border rounded w-full mb-4"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              required
              type="text"
              placeholder="City"
              name="city"
              onChange={onChange}
              value={data.city}
              className="p-3 border rounded"
            />
            <input
              required
              type="text"
              placeholder="State"
              name="state"
              onChange={onChange}
              value={data.state}
              className="p-3 border rounded"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
            <input
              required
              type="text"
              placeholder="Zip Code"
              name="zipCode"
              onChange={onChange}
              value={data.zipCode}
              className="p-3 border rounded"
            />
            <input
              required
              type="text"
              placeholder="Country"
              name="country"
              onChange={onChange}
              value={data.country}
              className="p-3 border rounded"
            />
          </div>

          <input
            required
            type="text"
            placeholder="Phone"
            name="phone"
            onChange={onChange}
            value={data.phone}
            className="p-3 border rounded w-full mt-4"
          />
        </div>

        {/* Right: Cart Total */}
        <div className="w-full lg:w-1/2">
          <div className="bg-white shadow-md rounded p-6">
            <h2 className="text-xl font-semibold mb-6">Cart Totals</h2>
            <div className="flex justify-between text-gray-700 mb-2">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <div className="flex justify-between text-gray-700 mb-2">
              <p>Delivery Fee</p>
              <p>${getTotalCartAmount() === 0 ? 0 : 2}</p>
            </div>
            <div className="flex justify-between font-bold text-gray-800 border-t pt-4 mt-4">
              <p>Total</p>
              <p>
                $
                {getTotalCartAmount() === 0
                  ? 0
                  : getTotalCartAmount() + 2}
              </p>
            </div>
            <button
              type="submit"
              className="w-full bg-red-500 text-white py-3 rounded mt-6 hover:bg-red-600 transition"
            >
              Proceed to Payment
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PlaceOrder;
