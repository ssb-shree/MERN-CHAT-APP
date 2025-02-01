import User from "../models/user.model.js";
import Message from "../models/message.model.js";


const getSidebarUsers = async(req,res)=>{
    try {
        const loggedInUserID = req.user._id;

        const findAllUsers = await User.find({_id: {$ne:loggedInUserID}}).select("-password")

        res.status(200).json({success:true, sidebarUsers:findAllUsers})
    } catch (error){
        console.error("unexpected error during check auth ", error.message || error);
        res.status(500).json({success:false, message:"unexpected error occcured pls try later"});
    }
};

const getAllMessages = async(req,res)=>{
    try {

        const senderID = req.user._id;
        const {receiverID} = req.params;

        const messages = await Message.find({
            $or : [{senderID, receiverID}, {senderID:receiverID, receiverID:senderID}]
        })

        res.status(200).json({success:true, data:messages})
    } catch (error) {
        console.error("unexpected error during check auth ", error.message || error);
        res.status(500).json({success:false, message:"unexpected error occcured pls try later"});
    }
}

const sendMessage = async(req,res)=>{
    try {
        const {text,image} = req.body;

        const {receiverID} = req.params;
        const senderID = req.user._id;
        
        let imageUrl;
        if(image){
            const uploadImage = await cloudinary.uploader.upload(image);
            imageUrl = uploadImage.secure_url;
        }

        const newMessage = new Message({
            senderID,
            receiverID,
            text,
            image:imageUrl
        })

        await newMessage.save()

        res.status(201).json(newMessage)

    } catch (error) {
        console.error("unexpected error during sending a message ", error.message || error);
        res.status(500).json({success:false, message:"unexpected error occcured pls try later"});
    }
}

export {
    getSidebarUsers,
    getAllMessages,
    sendMessage
}