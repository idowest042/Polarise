import userModel from "../models/userModel.js";
export const addToCart = async (req, res) => {
    try {
      const userId = req.userId; // ✅ safer than req.body.userId
      const itemId = req.body.itemId;
  
      const userData = await userModel.findById(userId);
  
      if (!userData) {
        return res.status(404).json({ message: "User not found" });
      }
  
      const cartData = userData.cartData || {};
  
      if (!cartData[itemId]) {
        cartData[itemId] = 1;
      } else {
        cartData[itemId] += 1;
      }
  
      await userModel.findByIdAndUpdate(userId, { cartData });
      res.status(200).json({ message: "Item added to cart" });
    } catch (error) {
      console.log(error, "error in addToCart");
      res.status(500).json({ message: "Internal server error" });
    }
  };
  
  export const removeFromCart = async (req, res) => {
    try {
      const userId = req.userId; // ✅ use from middleware
      const itemId = req.body.itemId;
  
      const userData = await userModel.findById(userId);
  
      if (!userData) {
        return res.status(404).json({ message: "User not found" });
      }
  
      const cartData = userData.cartData || {};
  
      if (cartData[itemId] > 0) {
        cartData[itemId] -= 1;
      }
  
      await userModel.findByIdAndUpdate(userId, { cartData });
      res.status(200).json({ message: "Item removed from cart" });
    } catch (error) {
      console.log(error, "error in removeFromCart");
      res.status(500).json({ message: "Internal server error" });
    }
  };
  
export const getCart = async (req, res) => {
    try {
      const userData = await userModel.findById(req.userId);
      const cartData = userData.cartData;
      res.status(200).json({ cartData });
    } catch (error) {
      console.log(error, "error in getCart");
      res.status(500).json({ message: "Internal server error" });
    }
  };
  