import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Verify = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const query = new URLSearchParams(location.search);
  const success = query.get("success");
  const orderId = query.get("orderId");

  useEffect(() => {
    // You can add backend logic here if needed (e.g., verify order status)
    console.log(success === "true" ? "Payment Success" : "Payment Failed");
  }, [success]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-md w-full text-center">
        {success === "true" ? (
          <>
            <div className="text-green-500 text-5xl mb-4">✅</div>
            <h2 className="text-2xl font-semibold mb-2">Payment Successful!</h2>
            <p className="text-gray-700 mb-4">
              Thank you for your purchase. Your order has been placed successfully.
            </p>
            <div className="text-sm text-gray-500 mb-6">
              Order ID: <span className="font-mono">{orderId}</span>
            </div>
            <button
              onClick={() => navigate("/myorders")}
              className="bg-green-500 text-white px-6 py-2 rounded-full hover:bg-green-600 transition"
            >
              Go to Orders
            </button>
          </>
        ) : (
          <>
            <div className="text-red-500 text-5xl mb-4">❌</div>
            <h2 className="text-2xl font-semibold mb-2">Payment Failed</h2>
            <p className="text-gray-700 mb-4">
              Oops! Your payment was not successful or was canceled.
            </p>
            <button
              onClick={() => navigate("/")}
              className="bg-red-500 text-white px-6 py-2 rounded-full hover:bg-red-600 transition"
            >
              Try Again
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Verify;
