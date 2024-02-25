import React from 'react'
import EmplifyLogo from '../assets/images/logo.png'
import CircleMatrix from '../assets/images/circle-matrix.png'
import { Button, Heading, Icon, Image, Stack } from '@chakra-ui/react'
import { RectangleStackIcon, MagnifyingGlassIcon, ChartPieIcon } from '@heroicons/react/24/outline'

const Home = () => {
  return (
    <div className="bg-blue-kpmgBlue min-h-screen flex flex-col flex-1 justify-around">
      <div className='flex justify-between w-screen py-2.5 px-14'>
        <Image
          src={EmplifyLogo}
          alt='KPMG Logo'
          className='object-contain w-[100px] h-[45px]'
        />
        <div className='flex flex-row space-x-8 items-center'>
          <a href="/login" className='text-white font-sansSemibold'>Login</a>
          <a href='/register'>
            <Button bg='white' color='#00338D' size='md' rounded='3xl' px='7'>
                            Register
            </Button>
          </a>
        </div>
      </div>
      <div className='pl-14 my-12 w-screen flex flex-row justify-between'>
        <Stack spacing={10} className='justify-items-start my-auto'>
          <Heading as='h1' size='lg' color='#F7F7F8' width='530px' className='font-sansSemibold'>
                        Elevate Your Story. Amplify Your Success. Empowering Portfolios. Empowering Futures.
          </Heading>
          <Heading size='md' color='#F7F7F8' width='550px' className=''>
                         Enhance your professional journey by boosting your portfolio&apos;s impact, offering tailored tools to showcase your strengths seamlessly
          </Heading>
        </Stack>
        <Image
          src={CircleMatrix}
          alt='Circle Matrix'
          className='object-contain w-[303px] h-[300px]'
        />
      </div>
      <div className='bg-[#F7F7F8] py-10 2xl:py-20'>
        <Stack spacing={3} className='flex flex-col'>
          <Heading fontSize='22px' color='black-custom1' className='flex font-sansSemibold mx-auto pb-8'>
                        Why choose us?
          </Heading>
          <div className='flex flex-row justify-center mx-54 mb-4'>
            <div className='flex flex-col items-center w-1/3'>
              <Icon as={RectangleStackIcon} w={12} h={12} color='#00338D'/>
              <Heading size='sm' className='font-sansSemibold py-2.5'>Effortless File Sync</Heading>
              <p className='w-7/12 text-center'>Easily synchronise your uploaded files to a specific location.</p>
            </div>
            <div className='flex flex-col items-center w-1/3'>
              <Icon as={MagnifyingGlassIcon} w={12} h={12} color='#00338D'/>
              <Heading size='sm' className='font-sansSemibold py-2.5'>Portfolio Management</Heading>
              <p className='w-7/12 text-center'>Streamline portfolio tasks effortlessly with our app&apos;s user-friendly features.</p>
            </div>
            <div className='flex flex-col items-center w-1/3'>
              <Icon as={ChartPieIcon} w={12} h={12} color='#00338D'/>
              <Heading size='sm' className='font-sansSemibold py-2.5'>Expert Analysis</Heading>
              <p className='w-7/12 text-center'>Make informed decisions through visualised insights into your portfolio.</p>
            </div>
          </div>
        </Stack>
      </div>
      <div className='flex flex-col py-5 h-full justify-items-center'>
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
