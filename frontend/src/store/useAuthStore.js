import {create} from "zustand";

import {axiosInstance} from "../lib/axios.js"
import toast from "react-hot-toast";

export const useAuthStore = create((set)=>({
    authUser:null,
    
    isCheckingAuth:true,
    checkAuth : async()=>{
        try {
            const res = await axiosInstance.get("/auth/check-auth");
            set( {authUser: res.data.userData} )
        } catch (error) {
            console.error(error.message || error)
            set({authUser:null})
        }finally{
            set({isCheckingAuth:false})
        }
    },
    
    isRegistering:false,
    register : async(data)=>{
        try {
            set({isRegistering:true});
            const res = await axiosInstance.post("/auth/register", data);
            set({authUser:res.data.userData})
            toast.success('Registration Successfulls');
        } catch (error) {
            toast.error(error.response.data.message)
        }finally{
            set({isRegistering:false})
        }
    },

    isLoggingIn:false,
    login : async(data)=>{
        try {
            set({isLoggingIn:true})
            const res = await axiosInstance.post("/auth/login", data);
            toast.success("User Logged In");
            set({authUser:res.data.userData})
        } catch (error) {
            toast.error(error.response.data.message)
            set({authUser:null})
        }finally{
            set({isLoggingIn:false})
        }
    },

    logout : async()=>{
        try {
            const res = axiosInstance.post("/auth/logout");
            set({authUser:null})
            toast.success("User Logged Out Successfully")
        } catch (error) {
            toast.error(error.response.data.message)
        }
    },

    isUpdatingProfile:false,
    updateProfile : async()=>{
        try {
            
        } catch (error) {
            
        }
    }

}))