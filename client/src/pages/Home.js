import React from 'react';
import EmplifyLogo from '../assets/images/logo.png'
import { Image } from '@chakra-ui/react';

const Home = () => {
    return (
        <div className="bg-kpmgBlue h-screen">
            <div className='flex justify-between bg-blue-kpmgBlue w-screen py-2.5 px-14'>
                <Image
                    src={EmplifyLogo}
                    alt='KPMG Logo'
                    priority
                    className='object-contain'
                />
                <div className='flex flex-row space-x-3 items-center'>
                    <a href="/login" className='text-white'>Login</a>
                    <div>Register</div>
                </div>
            </div>
        </div>
    );
};

export default Home;
