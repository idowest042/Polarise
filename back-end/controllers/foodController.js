import { foodModel } from "../models/foodModel.js";
import cloudinary from "../config/cloudinary.js";
import fs from "fs";
export const addFood = async (req, res) => {
    try {
        // 1. First check if there's an image file
        if (!req.file) {
            return res.status(400).json({ message: "No image file provided" });
        }

        // 2. Convert buffer to base64 string for Cloudinary
        const b64 = Buffer.from(req.file.buffer).toString("base64");
        let dataURI = "data:" + req.file.mimetype + ";base64," + b64;

        // 3. Upload to Cloudinary using the base64 string
        const uploadResponse = await cloudinary.uploader.upload(dataURI, {
            folder: "food-items" // optional folder organization
        });
        
        // 4. Create the food item with the Cloudinary URL
        const food = new foodModel({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            image: uploadResponse.secure_url,
            category: req.body.category
        });

        // 5. Save to database
        await food.save();
        
        res.status(201).json({ 
            message: "Food added successfully",
            data: food 
        });
        
    } catch (error) {
        console.error('Error in addFood controller:', error);
        res.status(500).json({ 
            message: "Internal server error",
            error: error.message 
        });
    }
};
export const listFood = async(req, res) => {
    try {
        const foods = await foodModel.find({});
        res.status(200).json({
            message: "Food list fetched successfully",
            data: foods
        });
    } catch (error) {
        console.error('Error in listFood controller:', error.message);
        res.status(500).json({ 
            message: "Internal server error",
            error: error.message 
        });
    }
}
export const removeFood = async (req, res) => {
    try {
        const food = await foodModel.findById(req.body.id)
        await foodModel.findByIdAndDelete(req.body.id)
        // Delete image from Cloudinary
        const publicId = food.image.match(/\/upload(?:\/[^/]+)*\/([^/.]+)(?:\.[^/.]+)?$/)[1];
        await cloudinary.uploader.destroy(publicId);
        res.status(200).json({
            message: "Food removed successfully",
        });
    } catch (error) {
        console.log('Error in removeFood controller:', error.message);
        res.status(500).json({ 
            message: "Internal server error",
            error: error.message 
        });
    }
}