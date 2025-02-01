import { Eye, EyeOff, Loader2, Lock, Mail, MessageSquare, User } from 'lucide-react'
import React, { useState } from 'react'
import { useAuthStore } from '../store/useAuthStore';
import { Link } from 'react-router-dom';
import {toast} from 'react-hot-toast';

const Register = () => {

  const [showPass, setShowPass] = useState(false);
  const [formData , setFormData] = useState({
    fullName : "",
    email : "",
    password : ""
  });

  const {register, isRegistering} = useAuthStore();

  const validateForm = (data)=>{

    const {fullName, email, password} = data;
    const emailRegex = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/

    if(!fullName.trim() || !email || !password) return toast.error("Input Fields Can't Be Empty!");
    if(!emailRegex.test(email)) return toast.error("Invalid Email Format!");
    if(password.length < 6) return toast.error("Password must be atleast 6 characters long");

    return true

  }

  const handleSubmit = (e)=>{
    e.preventDefault();
    const success = validateForm(formData)
    if(success === true) register(formData);
  }

  return (
    <div className='min-h-screen grid' >
      <div className='flex flex-col justify-center items-center p-6 sm:p-12'>
        <div className='w-full max-w-md'>
        <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group">
              <div
                className="size-12 rounded-xl bg-primary/10 flex items-center justify-center 
              group-hover:bg-primary/20 transition-colors"
              >
                <MessageSquare className="size-6 text-primary" />
              </div>
              <h1 className="text-2xl font-bold mt-2">Create Account</h1>
              <p className="text-base-content/60">Get started with your free account</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Full Name</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="size-5 text-base-content/40" />
                </div>
                <input
                  type="text"
                  className={`input input-bordered w-full pl-10`}
                  placeholder="John Doe"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                />
              </div>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Email</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="size-5 text-base-content/40" />
                </div>
                <input
                  type="email"
                  className={`input input-bordered w-full pl-10`}
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Password</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="size-5 text-base-content/40" />
                </div>
                <input
                  type={showPass ? "text" : "password"}
                  className={`input input-bordered w-full pl-10`}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPass(!showPass)}
                >
                  {showPass ? (
                    <EyeOff className="size-5 text-base-content/40" />
                  ) : (
                    <Eye className="size-5 text-base-content/40" />
                  )}
                </button>
              </div>
            </div>

            <button type="submit" className="btn btn-primary w-full" disabled={isRegistering}>
              {isRegistering ? (
                <>
                  <Loader2 className="size-5 animate-spin" />
                  Loading...
                </>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          <div className='text-center flex flex-row justify-center items-center'>
            <p className='to-base-content/60 mr-1'>{`Already Have An Account?`}</p>
            <Link className='underline' to={"/login"} >Click Here</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register