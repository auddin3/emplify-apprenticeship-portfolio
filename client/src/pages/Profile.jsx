import React, { useState } from 'react'
import useAuthUser from 'react-auth-kit/hooks/useAuthUser'
import Navbar from '../components/Navbar'
import { Avatar, Box, Tabs, Tab, TabList, TabIndicator } from '@chakra-ui/react'

const Profile = () => {
  const auth = useAuthUser()
  const user = auth?.user

  // eslint-disable-next-line no-unused-vars
  const [tabIndex, setTabIndex] = useState(0)

  return (
    <div className='bg-gray-paleGray flex flex-row'>
      <Navbar user={user}/>
      <Box borderWidth='1px' borderRadius='md' bg="white" margin={5} width="full" >
        <div className='flex flex-col items-center my-7'>
          <div className='w-fit mx-auto mb-7'>
            <Avatar name={user?.name} size='xl' fontWeight={600} className='cursor-pointer'/>
          </div>
          <h1 className='text-2xl text-black-custom1 font-semibold'>{user?.name}</h1>
          <div className='text-[#696969] mt-1'>{user?.email}</div>
          <hr className='border-t-1 border-t-black-custom1/20 text-black-custom1 mt-8 w-[95%]' />
        </div>
        <Tabs onChange={index => setTabIndex(index)} className='w-[95%] mx-auto' variant='unstyled' size='lg' >
          <TabList className='space-x-10'>
            <Tab>
              <div className={`${tabIndex === 1 ? 'text-[#333E49]/60' : 'text-blue-kpmgBlue'}`}>Personal details</div>
            </Tab>
            <Tab>
              <div className={`${tabIndex === 0 ? 'text-[#333E49]/60' : 'text-blue-kpmgBlue'}`}>Settings</div>
            </Tab>
          </TabList>
          <TabIndicator
            mt="-6px"
            height="4px"
            bg="#00338D"
            borderRadius="1px"
          />
        </Tabs>
      </Box>
    </div>
  )
}

export default Profile
