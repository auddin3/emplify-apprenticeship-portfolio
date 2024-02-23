import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EmplifyLogo from '../assets/images/logo.png'
import { Button, Icon, Image, Input, InputGroup, InputRightElement, Stack } from '@chakra-ui/react'
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid'

const initialUser = {
    email: '', // Get the value from your state or form input
    password: '', // Get the value from your state or form input
};

const Login = () => {
    const [show, setShow] = useState(false)
    const [user, setUser] = useState(initialUser)
    const navigate = useNavigate();

    const handleChange = (e, name) => {
        const { value } = e.target;
        setUser((prevUserData) => ({
            ...prevUserData,
            [name]: value,
        }));
    };

    const handleLogin = async (data) => {
        const apiUrl = 'http://localhost:5001/login';
     
        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
     
            if (!response.ok) {
                // If the server responds with an error status
                const errorData = await response.json();
                console.error('Login failed:', errorData);
     
                // Handle error, e.g., show an error message to the user
                return;
            }
     
            console.log('Login successful:');
            const token = await response.json();

            navigate('/dashboard', { state: { token: token } });
    
        } catch (error) {
            console.error('Login failed:', error);
        }
     }
    
    return (
        <div className="container">
          <div className='bg-blue-kpmgBlue w-screen py-5 px-14'>
            <a href="/">
                <Image
                    src={EmplifyLogo}
                    alt='KPMG Logo'
                    className='object-contain'
                />
            </a>
          </div>
          <div className='bg-[#F9FAFB] w-screen pt-10 2xl:pt-20 pb-7 2xl:pb-14'>
            <div className='flex flex-col space-y-1 w-5/12 2xl:w-1/3 mx-auto'>
                <h1 className='text-[52px] font-sansBold text-black-custom1'>Login to your account</h1>
                <p className='text-2xl text-black-custom1'>Welcome back!</p>
            </div>
          </div>
          <div className="flex flex-col w-screen my-12 2xl:my-24">
            <Stack spacing={1} className='w-5/12 2xl:w-1/3 mx-auto'>
                <label className="w-full mb-2 ml-2 flex self-center font-sansSemibold text-black-custom1">Email Address</label>
                <InputGroup className='mb-7 2xl:mb-10'>
                    <Input 
                        type='email' 
                        placeholder='Enter your email address' 
                        value={user.email}
                        onChange={(e) => handleChange(e, 'email')}
                        py='1.5rem'
                        _placeholder={{ opacity: 1, color: 'gray.500', fontSize: 14 }} />
                </InputGroup>

                <label className="w-full mb-2 ml-2 flex self-center font-sansSemibold text-black-custom1">Password</label>
                <InputGroup className='mb-10'>
                    <Input
                        pr='4.5rem'
                        py='1.5rem'
                        type={show ? 'text' : 'password'}
                        placeholder='Enter your password'
                        value={user.password}
                        onChange={(e) => handleChange(e, 'password')}
                        _placeholder={{ opacity: 1, color: 'gray.500', fontSize: 14 }}
                    />
                    <InputRightElement width='4.5rem' pt='0.75rem'>
                        <Button h='1.75rem' size='lg' bg='white' px='0' onClick={() => setShow(!show)}>
                        {show ? <Icon as={EyeSlashIcon} /> : <Icon as={EyeIcon} />}
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </Stack>
            <p className="mt-10 2xl:mt-24 mb-7 2xl:mb-10 text-center">
                Don't have an account? <a href="/register" className="font-semibold text-blue-500">Register an account.</a>
            </p>
            <Button 
                bg='#00338D'
                color='white'
                size='lg'
                className="w-5/12 2xl:w-1/3 rounded-md self-center"
                onClick={() => handleLogin(user)}
            >
                Login
            </Button>
        </div>
        </div>
    );
};

export default Login;
