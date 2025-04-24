import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";
dotenv.config();
const app = express()
const port = process.env.PORT || 3000
app.use(cors())
app.use(express.json())
connectDB();
app.use('/api/food',foodRouter)
app.use('/api/user',userRouter)
app.use('/api/cart',cartRouter)
app.use('/api/order',orderRouter)
app.use('/images', express.static('uploads')) 
app.get("/", (req, res) => {
    res.send("Hello World!")

})
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
})