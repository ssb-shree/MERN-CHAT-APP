import jwt from "jsonwebtoken"

import User from "../models/user.model.js"

const protectRoute = async(req,res,next)=>{
    try {
        
        const token = req.cookies.jwt;
        if(!token) return res.status(401).json({success:false, message:"unauthorized user no token provided"});

        const {userID} = jwt.verify(token, process.env.JWT_SECRET);
        if(!userID) return res.status(400).json({success:false, message:"invalid token."});

        const findUser = await User.findById(userID);
        if(!findUser) return res.status(400).json({success:false, message:"invalid token!"});

        req.user = findUser
        next()
    } catch (error) {
        console.error("unexpected error during authorizing user ", error.message || error);
        res.status(500).json({success:false, message:"unexpected error occcured pls try later"});
    }
}

export {
    protectRoute
}