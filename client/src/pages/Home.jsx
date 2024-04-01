import React from 'react'
import EmplifyLogo from '../assets/images/logo.png'
import CircleMatrix from '../assets/images/circle-matrix.png'
import { Button, Heading, Icon, Image, Stack } from '@chakra-ui/react'
import { RectangleStackIcon, MagnifyingGlassIcon, ChartPieIcon } from '@heroicons/react/24/solid'

const Home = () => {
  return (
    <div className="bg-gradient-to-tl from-[#031641] via-[#031641] to-[#00338D] flex flex-col flex-1 justify-around min-h-screen">
      <div className='flex justify-between w-screen px-14 my-8'>
        <Image
          src={EmplifyLogo}
          alt='KPMG Logo'
          className='object-contain w-[100px] h-[45px]'
        />
        <div className='flex flex-row space-x-14 items-center'>
          <a href="/login" className='text-white font-sansSemibold'>Login</a>
          <a href='/register'>
            <Button bg='white' color='#00338D' size='md' rounded='3xl' px='7'>
                            Register
            </Button>
          </a>
        </div>
      </div>
      <div className='pl-14 w-screen flex flex-row justify-between my-7'>
        <Stack spacing={10} className='justify-items-start my-auto'>
          <h1 className='font-sansSemibold text-3xl text-[#F7F7F8] w-[530px]'>
                        Elevate Your Story. Amplify Your Success. Empowering Portfolios. Empowering Futures.
          </h1>
          <h2 width='550px' className='font-sans text-lg text-[#F7F7F8] w-[550px]'>
                         Enhance your professional journey by boosting your portfolio&apos;s impact, offering tailored tools to showcase your strengths seamlessly
          </h2>
        </Stack>
        <Image
          src={CircleMatrix}
          alt='Circle Matrix'
          className='object-contain w-[290px] h-[290px]'
        />
      </div>
      <div className='mx-auto w-10/12 2xl:w-10/12 my-8'>
        <div className='flex flex-row justify-center items-center space-x-16'>
          <div className='flex flex-col items-center border border-white/20 rounded-lg py-10 space-y-1.5 w-96 px-4 bg-gradient-to-tl from-[#031641] via-[#031641] to-[#00338D]'>
            <Icon as={RectangleStackIcon} w={10} h={10} color='#C6007E'/>
            <Heading size='md' className='font-sansSemibold py-2.5' color='white'>Effortless File Sync</Heading>
            <div className='text-center text-[#C1D0FC] font-sans text-lg px-10'>
              Easily synchronise your uploaded files to a specific location.
            </div>
          </div>
          <div className='flex flex-col items-center border border-white/20 rounded-lg py-10 space-y-1.5 w-96 px-4 bg-gradient-to-t from-[#031641] via-[#031641] to-[#00338D]'>
            <Icon as={MagnifyingGlassIcon} w={10} h={10} color='#00A3A1'/>
            <Heading size='md' className='font-sansSemibold py-2.5' color='white'>Portfolio Management</Heading>
            <p className='text-center text-[#C1D0FC] font-sans text-lg px-12'>Streamline portfolio tasks effortlessly with our app&apos;s user-friendly features.</p>
          </div>
          <div className='flex flex-col items-center border border-white/20 rounded-lg py-10 space-y-1.5 w-96 px-4 bg-gradient-to-br from-[#031641] via-[#031641] to-[#00338D]'>
            <Icon as={ChartPieIcon} w={10} h={10} color='#0091DA'/>
            <Heading size='md' className='font-sansSemibold py-2.5' color='white'>Expert Analysis</Heading>
            <p className='text-center text-[#C1D0FC] font-sans text-lg px-10'>Make informed decisions through visualised insights into your portfolio.</p>
          </div>
        </div>
      </div>
      <div className='flex flex-col pb-3 h-full justify-items-center mb-10 mt-5'>
        <Heading fontSize='20px' color='#F7F7F8' className='mx-auto mb-4'>Want to start today?</Heading>
        <div className='mx-auto'>
          <Button bg='white' color='#00338D' size='md' rounded='3xl' px='7'>
                        Request a demo
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Home
