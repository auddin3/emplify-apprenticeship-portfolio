import React, { useState } from 'react'
import useAuthUser from 'react-auth-kit/hooks/useAuthUser'
import Navbar from '../components/Navbar'
import SearchBar from '../components/SearchBar'
import { Tabs, TabList, Tab, TabIndicator, Tag } from '@chakra-ui/react'

const pages = ['all', 'database Management', 'networks', 'UXD/UID', 'data Modelling', 'artificial Intelligence']

const Library = () => {
  const auth = useAuthUser()
  const user = auth?.user

  const [selectedTab, setSelectedTab] = useState(0)

  return (
    <div className='bg-gray-paleGray flex flex-row'>
      <Navbar user={user}/>
      <div className='w-full p-12'>
        <SearchBar />
        <div className='mx-2'>
          <hr className='border-t border-t-black-custom1/15 text-black-custom1 my-2 w-full' />
          <hr className='border-t border-t-black-custom1/15 text-black-custom1 my-2 w-full' />

          <Tabs variant='unstyled' size='lg'>
            <TabList className='space-x-6'>
              {pages.map((page, idx) => {
                const isSelected = idx === selectedTab

                return (
                  <Tab
                    key={idx}
                    _selected={{ color: '#00338D' }}
                    className={`text-[#00338D]/60 ${page === 'All' ? '' : 'space-x-4'}`}
                    onClick={() => setSelectedTab(idx)}
                    isSelected={isSelected}
                  >
                    <div className='capitalize'>{page}</div>
                    {page === 'all'
                      ? ''
                      : (
                        <Tag backgroundColor={`${isSelected ? 'rgb(75, 117, 255)' : 'rgba(75, 117, 255, 0.2)'}`} paddingX={3.5} borderRadius={7}>
                          <div className={`${isSelected ? 'text-white' : 'text-blue-kpmgBlue'}`}>7</div>
                        </Tag>
                      )
                    }
                  </Tab>
                )
              })}
            </TabList>
            <TabIndicator
              mt="-6px"
              height="4px"
              bg="#4B75FF"
              borderRadius="1px"
            />
          </Tabs>
        </div>
      </div>
    </div>
  )
}

export default Library
