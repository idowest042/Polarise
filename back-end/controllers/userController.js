import userModel from "../models/userModel.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import validator from 'validator'
export const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try{
    const user = await userModel.findOne({email})
    if(!user){
        return res.status(400).json({message:"Invalid credentials"})
    }
    const isMatch = await bcrypt.compare(password,user.password)
    if(!isMatch){
        return res.status(400).json({message:"Invalid credentials"})
    }
    const token = createToken(user._id)
    res.status(200).json({
        token,
        message:"Login successful"
    })
    }catch(error){
        console.log(error,"error in login User")
        res.status(500).json({message:"Internal server error"})
    }
    
}

export const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
}
export const registerUser = async (req, res) => {
   const {email,name,password} = req.body
   try{
    const exist = await userModel.findOne({email})
    if(exist){
        return res.status(400).json({message:"User already exists"})
    }
    if(!validator.isEmail(email)){
        return res.status(400).json({message:"Invalid email"})
    }
    if(password.length<8){
        return res.status(400).json({message:"please enter a strong password"})
    }
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password,salt)
    const newUser =new userModel({
                name,
                email,
                password: hashedPassword
             })
   const user = await newUser.save()
    const token = createToken(user._id)
    res.status(201).json({
        token,
        message:"user created"
    })

   }catch(error){
       console.log(error,"error in registerUser")
         res.status(500).json({message:"Internal server error"})
   }
}