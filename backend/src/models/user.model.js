import mongoose, {Schema} from "mongoose"

const pfpSchema = new Schema({
    url:String,
    publicID:String,
})

const userSchema = new Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    fullName:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
        select:false
    },
    pfp:{
        type:pfpSchema,
        default:{}
    }
},{timestamps:true});

const User = mongoose.model("User", userSchema);
export default User;