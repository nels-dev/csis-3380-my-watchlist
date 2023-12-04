import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.js"
const router = express.Router();

router.post("/login", async(req, res)=>{
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !bcrypt.compareSync(password, user.password)) {
        return res.status(400).json({ success: false, message: 'Please check your credentials'});
    }
    return res.status(200).json({
        token: jwt.sign({"sub":email, "id":user._id}, process.env.JWT_SECRET, {expiresIn: '1d'})
    })
})

router.post("/", async(req, res)=>{
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if(user) return res.status(409).json({success: false, message: 'User already exist'});
    await User.create({email, password: bcrypt.hashSync(password)})
    return res.status(201).json({success: true, message: 'User created'})
})
export default router;