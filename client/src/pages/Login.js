import React, { useState } from 'react';
import EmplifyLogo from '../assets/images/logo.png'
import { Image } from '@chakra-ui/react'

const Login = () => {
    const [showPassword, setShowPassword] = useState(false)

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword)
    }
    
    return (
        <div className="container">
          <div className='bg-blue-kpmgBlue w-screen py-5 px-14'>
            <Image
                src={EmplifyLogo}
                alt='KPMG Logo'
                priority
                className='object-contain'
            />
          </div>
          <div className='bg-[#F9FAFB] w-screen pt-20 pb-14'>
            <div className='flex flex-col ml-96 space-y-6'>
                <h1 className='ml-4/6 text-6xl font-bold text-black-custom1'>Login to your account</h1>
                <h2 className='text-2xl text-black-custom1'>Welcome back!</h2>
            </div>
          </div>
          <div className="flex flex-col w-screen my-20">
            <div className="flex flex-col w-screen space-y-6">
                <div className="flex flex-col">
                    <label htmlFor="email" className="w-1/3 mb-2 flex self-center font-semibold text-black-custom1">Email Address</label>
                    <input
                        type="email"
                        id="email"
                        className="w-1/3 mb-4 px-4 py-2 border border-gray-300 rounded-md mx-auto"
                        placeholder="Enter your email address"
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="password" className="w-1/3 mb-2 flex self-center font-semibold text-black-custom1">Password</label>
                    <input
                         type={showPassword ? 'text' : 'password'}
                        id="password"
                        className="w-1/3 mb-4 px-4 py-2 border border-gray-300 rounded-md mx-auto"
                        placeholder="Enter your password"
                    />
                    <button
                        type="button"
                        className="absolute right-0 top-1/2 transform -translate-y-1/2 px-3"
                        onClick={togglePasswordVisibility}
                        >
                        {showPassword ? 'Hide' : 'Show'}
                    </button>
                </div>
            </div>
            <p className="mt-24 mb-12 text-center">
                Don't have an account? <a href="/register" className="font-semibold text-blue-500">Register an account.</a>
            </p>
            <button className="w-1/3 bg-blue-kpmgBlue text-white font-bold text-xl py-3 rounded-md self-center">
                Login
            </button>
        </div>
        </div>
    );
};

export default Login;
