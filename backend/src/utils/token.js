import jwt from "jsonwebtoken"

const generateTokens = async(userID, res)=>{

    const token = jwt.sign({userID}, process.env.JWT_SECRET, {
        expiresIn:"2d"
    });

    res.cookie("jwt", token, {
        maxAge: 2 * (24 * 60 * 60 * 1000),
        httpOnly:true,
        sameSite: "strict",
        secure: process.env.STATUS !== "DEV"
    })

    return token
}

export default generateTokens