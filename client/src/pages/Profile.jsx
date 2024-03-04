import React, { useState } from 'react'
import useAuthUser from 'react-auth-kit/hooks/useAuthUser'
import Navbar from '../components/Navbar'
import { Avatar, Box, Button, FormControl, FormLabel, Icon, Input, InputGroup, InputRightElement, Stack,
  Tabs, Tab, TabList, TabIndicator, TabPanels, TabPanel } from '@chakra-ui/react'
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid'

const Profile = () => {
  const auth = useAuthUser()
  const user = auth?.user

  const [userData, setUserData] = useState({
    email: user?.email,
    password: '',
    name: user?.name,
    school: user?.school,
  })
  const [tabIndex, setTabIndex] = useState(0)
  const [show, setShow] = useState(false)

  const handleChange = (e, name) => {
    const { value } = e.target
    setUserData(prevUserData => ({
      ...prevUserData,
      [name]: value,
    }))
  }

  return (
    <div className='bg-gray-paleGray flex flex-row'>
      <Navbar user={user}/>
      <Box borderWidth='1px' borderRadius='md' bg="white" margin={5} width="full">
        <div className='flex flex-col items-center my-7'>
          <div className='w-fit mx-auto mb-7'>
            <Avatar name={user?.name} size='xl' fontWeight={600} className='cursor-pointer'/>
          </div>
          <h1 className='text-xl text-black-custom1 font-semibold'>{user?.name}</h1>
          <div className='text-[#696969] mt-1 text-sm'>{user?.email}</div>
          <hr className='border-t-1 border-t-black-custom1/20 text-black-custom1 mt-8 w-[95%]' />
        </div>
        <Tabs onChange={index => setTabIndex(index)} className='mx-auto' variant='unstyled' size='md' >
          <TabList className='space-x-10 ml-14'>
            <Tab>
              <div className={`${tabIndex === 1 ? 'text-[#333E49]/60' : 'text-blue-kpmgBlue'}`}>Personal details</div>
            </Tab>
            <Tab>
              <div className={`${tabIndex === 0 ? 'text-[#333E49]/60' : 'text-blue-kpmgBlue'}`}>Settings</div>
            </Tab>
          </TabList>
          <TabIndicator
            mt="-6px"
            ml={0.5}
            height="4px"
            bg="#00338D"
            borderRadius="1px"
          />
          <TabPanels>
            <TabPanel>
              <Stack spacing={5} className='w-11/12 overflow-y-scroll h-64 2xl:h-full my-8 ml-10'>
                <FormControl className='flex flex-row justify-between'>
                  <div className='w-1/2 mr-10'>
                    <FormLabel className="w-full mb-2 ml-2 flex self-center font-sansSemibold text-black-custom1 text-xs">First Name</FormLabel>
                    <InputGroup className='mb-2 2xl:mb-5'>
                      <Input
                        type='text'
                        placeholder='Enter your full name'
                        value={userData?.name.split(' ')[0]}
                        onChange={e => handleChange(e, 'name')}
                        py='1.25rem'
                        _placeholder={{ opacity: 1, color: 'gray.500' }}
                        size="sm"
                      />
                    </InputGroup>
                  </div>
                  <div className='w-1/2 ml-10'>
                    <FormLabel className="w-full mb-2 ml-2 flex self-center font-sansSemibold text-black-custom1 text-xs">Last Name</FormLabel>
                    <InputGroup className='mb-2 2xl:mb-5'>
                      <Input
                        type='text'
                        placeholder='Enter your full name'
                        value={userData?.name.split(' ')[2]}
                        onChange={e => handleChange(e, 'name')}
                        py='1.25rem'
                        _placeholder={{ opacity: 1, color: 'gray.500' }}
                        size="sm"
                      />
                    </InputGroup>
                  </div>
                </FormControl>

                <FormControl >
                  <FormLabel className="w-full mb-2 ml-2 flex self-center font-sansSemibold text-black-custom1 text-xs">Email address</FormLabel>
                  <InputGroup className='mb-2 2xl:mb-5'>
                    <Input
                      type='text'
                      placeholder='Enter your full name'
                      value={userData?.email}
                      onChange={e => handleChange(e, 'name')}
                      py='1.25rem'
                      _placeholder={{ opacity: 1, color: 'gray.500' }}
                      size="sm"
                    />
                  </InputGroup>
                </FormControl>

                <FormControl >
                  <FormLabel className="w-full mb-2 ml-2 flex self-center font-sansSemibold text-black-custom1 text-xs">Password</FormLabel>
                  <InputGroup className='mb-2 2xl:mb-5'>
                    <Input
                      type={show ? 'text' : 'password'}
                      placeholder='password'
                      py='1.25rem'
                      _placeholder={{ opacity: 1, color: 'gray.500' }}
                      size="sm"
                    />
                    <InputRightElement width='4.5rem' pt='0.25rem'>
                      <Button h='1.75rem' size='lg' bg='white' px='0' onClick={() => setShow(!show)}>
                        {show ? <Icon as={EyeSlashIcon} /> : <Icon as={EyeIcon} />}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                </FormControl>

              </Stack>

              <div className='w-full flex flex-row items-center'>
                <Button
                  bg='#00338D'
                  color='white'
                  size='md'
                  my={2}
                  className="w-5/12 2xl:w-1/3 rounded-md mx-auto"
                >
                Save
                </Button>
              </div>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </div>
  )
}

export default Profile
