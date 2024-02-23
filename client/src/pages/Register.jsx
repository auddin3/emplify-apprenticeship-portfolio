import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EmplifyLogo from '../assets/images/logo.png'
import { Button, FormControl, FormLabel, Icon, Image, Input, InputGroup, InputRightElement, Stack } from '@chakra-ui/react'
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid'

const initialUserData = {
    email: '', // Get the value from your state or form input
    password: '', // Get the value from your state or form input
    name: '', // Get the value from your state or form input
};

const Register = () => {
    const [show, setShow] = useState(false)
    const [userData, setUserData] = useState(initialUserData)
    const navigate = useNavigate();

    const handleChange = (e, name) => {
        const { value } = e.target;
        setUserData((prevUserData) => ({
            ...prevUserData,
            [name]: value,
        }));
    };

    const handleRegister = async (data) => {
        const apiUrl = 'http://localhost:5001/register';
     
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
                console.error('Registration failed:', errorData);
     
                // Handle error, e.g., show an error message to the user
                return;
            }
     
            console.log('Registration successful:');
            navigate('/login'); // Use history.push() for redirection
    
        } catch (error) {
            console.error('Registration failed:', error);
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
                <h1 className='text-[52px] font-sansBold text-black-custom1'>Register your account</h1>
                <p className="2xl:mt-24 mb-7 2xl:mb-10">
                    Already have an account? <a href="/login" className="font-semibold text-blue-500">Login.</a>
                </p>
            </div>
          </div>
          <div className="flex flex-col w-screen my-10 2xl:my-16">
            <Stack spacing={1} className='w-5/12 2xl:w-1/3 mx-auto'>
                <FormControl isRequired>
                    <FormLabel className="w-full mb-2 ml-2 flex self-center font-sansSemibold text-black-custom1">Name</FormLabel>
                    <InputGroup className='mb-2 2xl:mb-5'>
                        <Input 
                            type='text' 
                            placeholder='Enter your full name' 
                            value={userData.name}
                            onChange={(e) => handleChange(e, 'name')}
                            py='1.5rem'
                            _placeholder={{ opacity: 1, color: 'gray.500', fontSize: 14 }} />
                    </InputGroup>
                </FormControl>

                <FormControl isRequired>
                    <FormLabel className="w-full mb-2 ml-2 flex self-center font-sansSemibold text-black-custom1">Email Address</FormLabel>
                    <InputGroup className='mb-2 2xl:mb-5'>
                        <Input 
                            type='email' 
                            placeholder='Enter your email address' 
                            value={userData.email}
                            onChange={(e) => handleChange(e, 'email')}
                            py='1.5rem'
                            _placeholder={{ opacity: 1, color: 'gray.500', fontSize: 14 }} />
                    </InputGroup>
                </FormControl>

                <FormControl isRequired>
                    <FormLabel className="w-full mb-2 ml-2 flex self-center font-sansSemibold text-black-custom1">Password</FormLabel>
                    <InputGroup className='mb-2 2xl:mb-5'>
                        <Input
                            pr='4.5rem'
                            py='1.5rem'
                            type={show ? 'text' : 'password'}
                            placeholder='Enter your password'
                            value={userData.password}
                            onChange={(e) => handleChange(e, 'password')}
                            _placeholder={{ opacity: 1, color: 'gray.500', fontSize: 14 }}
                        />
                        <InputRightElement width='4.5rem' pt='0.75rem'>
                            <Button h='1.75rem' size='lg' bg='white' px='0' onClick={() => setShow(!show)}>
                            {show ? <Icon as={EyeSlashIcon} /> : <Icon as={EyeIcon} />}
                            </Button>
                        </InputRightElement>
                    </InputGroup>
                </FormControl>
            </Stack>
            <Button 
                bg='#00338D'
                color='white'
                size='lg'
                mt='4.2%'
                className="w-5/12 2xl:w-1/3 rounded-md self-center"
                onClick={() => handleRegister(userData)}
            >
                Register
            </Button>
        </div>
        </div>
    );
};

export default Register;
