import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"

import User from "../models/user.model.js"
import generateTokens from "../utils/token.js";
import cloudinary from "../utils/cloudinary.js"

const emailRegex = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/

const registerUser = async(req,res)=>{
    try {
        const {fullName, email, password} = req.body;
        
        // validate
        if(!fullName || !email || !password ) return res.status(400).json({success:false, message:"empty fields"});
        if(password.length < 6) return res.status(400).json({success:false, message:"password must be atleast 6 characters"});
        if(!emailRegex.test(email)) return res.status(400).json({success:false, message:"invalid email format"});

        // check if user with this email already exist
        const isTaken = await User.findOne({email});
        if(isTaken) return res.status(400).json({success:false, message:"email is already taken"});

        // hash the pass
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // create new user
        const newUser = await User.create({fullName, email, password:hashedPassword})

        if(!newUser) return res.status(400).json({sucess:false, message:"failed to create user"});

        generateTokens(newUser._id, res)

        res.status(201).json({success:true, message:"created new user successfully", userData:{...newUser._doc, password:null}})

    } catch (error) {
        console.error("unexpected error during register user ", error.message || error);
        res.status(500).json({success:false, message:"unexpected error occcured pls try later"});
    }

}

const loginUser = async(req,res)=>{
    try {
        const {email, password} = req.body;

        if(!emailRegex.test(email)) return res.status(400).json({success:false, message:"invalid email format"});

        const userExist = await User.findOne({email}).select("+password");
        if(!userExist) return res.status(400).json({success:false, message:"invalid email or password"});
        
        const isPassCorrect = await bcrypt.compare(password, userExist.password);
        if(!isPassCorrect) return res.status(400).json({success:false, message:"invalid email or password"});

        generateTokens(userExist._id, res);

        res.status(200).json({sucess:true, message:"user logged in", userData:{...userExist._doc, password:null}})        
    } catch (error) {
        console.error("unexpected error during login user ", error.message || error);
        res.status(500).json({success:false, message:"unexpected error occcured pls try later"});
    }
}

const logoutUser = async(req,res)=>{
    try {
        res.cookie("jwt", "", {maxAge:0, });
        res.status(200).json({success:true, message:"user logged out successfully"})
    } catch (error) {
        console.error("unexpected error during logout user ", error.message || error);
        res.status(500).json({success:false, message:"unexpected error occcured pls try later"});
    }
}

const createMagicLink = async(req,res)=>{
    try {

        // get the email from user input
        const {email} = req.body;
        // find if such user exist
        const userExist = await User.findOne({email});
        if(!userExist) return res.status(400).json({success:false, message:"invalid info"}) ;
        // is the user exist create a token with user details
        const magic = jwt.sign({email}, process.env.JWT_SECRET, {
            expiresIn:"1d"
        })
        res.cookie("verify", magic, {maxAge: 2 * (60 * 60 * 1000), httpOnly:true, sameSite: "strict", secure: process.env.STATUS !== "DEV"})

        res.status(201).json({success:true, message:"Magic Token Created"});

    } catch (error) {
        console.error("unexpected error during creating a magic link ", error.message || error);
        res.status(500).json({success:false, message:"unexpected error occcured pls try later"});
    }
}

const verifyMagicLink = async(req,res)=>{
    try {
        const magic = req.cookies.verify;
        if(!magic) return res.status(400).json({success:false, message:unauthorized})

        const decodeMagic = jwt.verify(magic, process.env.JWT_SECRET);

        const findUser = await User.findOne({email:decodeMagic.email});
        if(!findUser) return res.status(400).json({success:false, message:unauthorized});

        generateTokens(findUser._id, res);

        res.status(200).json({success:true, message:`user logged in has ${findUser.fullName}`})

    } catch (error) {
        console.error("unexpected error during verifying magic link ", error.message || error);
        res.status(500).json({success:false, message:"unexpected error occcured pls try later"});
    }
}

const updateUserProfile = async(req,res)=>{
    try {
    } catch (error) {
        console.error("unexpected error during updating user profile ", error.message || error);
        res.status(500).json({success:false, message:"unexpected error occcured pls try later"});
    }
}

const checkAuth = async(req,res)=>{
    try {
        res.status(200).json({success:true, userData:{...req.user._doc, password:null} })
    } catch (error) {
        console.error("unexpected error during check auth ", error.message || error);
        res.status(500).json({success:false, message:"unexpected error occcured pls try later"});
    }
}

export {
    registerUser,
    loginUser,
    logoutUser,
    createMagicLink,
    verifyMagicLink,
    updateUserProfile,
    checkAuth
}