import React, { useState, useEffect } from 'react'
import useAuthUser from 'react-auth-kit/hooks/useAuthUser'
import Navbar from '../components/Navbar'
import SearchBar from '../components/SearchBar'
import { Card, CardHeader, CardBody, Grid, Tabs, TabList, Tab, TabIndicator, TabPanels, TabPanel, Tag } from '@chakra-ui/react'
import SortMenu from '../components/SortMenu'
import { camelCaseToSpaced } from '../utils'

const pages = ['all', 'dataModelling', 'artificialIntelligence', 'softwareEngineering', 'networks', 'UXD/UID']

const menuOptions = [
  {
    type: 'alpha',
    name: 'Alphabetically (A-Z)',
    chronological: true,
  },
  {
    type: 'alpha',
    name: 'Alphabetically (Z-A)',
    chronological: false,
  },
  {
    type: 'date',
    name: 'Most Recent',
    chronological: true,
    property: 'dateCreated',
  },
  {
    type: 'date',
    name: 'Least Recent',
    chronological: false,
    property: 'dateCreated',
  },
]

const Library = () => {
  const auth = useAuthUser()
  const user = auth?.user

  const [selectedTab, setSelectedTab] = useState(0)
  const [modules, setModules] = useState()
  const [filteredModules, setFilteredModules] = useState()

  const fetchData = async () => {
    const apiUrl = 'http://localhost:5001/modules'

    try {
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      })

      if (!response.ok) {
        const errorData = await response.json()
        console.error('Operation failed:', errorData)
      }

      const data = await response.json()
      setModules(data?.modules)
    } catch (error) {
      console.error('Operation failed:', error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    modules && setFilteredModules(modules.sort((a, b) => a.title.localeCompare(b.title)))
  }, [modules])

  return (
    <div className='bg-gray-paleGray flex flex-row'>
      <Navbar user={user}/>
      <div className='w-full p-12 max-h-screen overflow-y-scroll'>
        <SearchBar />
        <div className='mx-2 mt-10'>
          <hr className='border-t border-t-black-custom1/15 text-black-custom1 my-2 w-full' />
          <SortMenu elements={modules} setSortedElements={setFilteredModules} menuOptions={menuOptions}/>
          <hr className='border-t border-t-black-custom1/15 text-black-custom1 my-2 w-full mb-5' />
          <Tabs variant='unstyled' size='lg'>
            <TabList className='space-x-5'>
              {pages?.map((page, idx) => {
                const isSelected = idx === selectedTab
                const count = filteredModules?.filter(module => module?.category === page).length

                return (
                  <Tab
                    key={idx}
                    _selected={{ color: '#00338D' }}
                    className={`text-[#00338D]/60 ${page === 'All' ? '' : 'space-x-2'}`}
                    onClick={() => setSelectedTab(idx)}
                    isSelected={isSelected}
                  >
                    <div className='capitalize'>{camelCaseToSpaced(page)}</div>
                    {page === 'all'
                      ? ''
                      : (
                        <Tag backgroundColor={`${isSelected ? 'rgb(75, 117, 255)' : 'rgba(75, 117, 255, 0.2)'}`} paddingX={3.5} borderRadius={7}>
                          <div className={`${isSelected ? 'text-white' : 'text-blue-kpmgBlue'}`}>
                            {count}
                          </div>
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
            <TabPanels>
              {pages?.map((page, idx) => {
                const tabModules = page === 'all' ? filteredModules : filteredModules?.filter(module => module?.category === page)
                return (
                  <TabPanel key={idx}>
                    <Grid templateColumns='repeat(3, 1fr)' rowGap={8} columnGap={10} marginTop={8}>
                      {tabModules && tabModules?.map((module, idx) => {
                        const dateCreated = new Date(module?.dateCreated)
                        const options = { day: 'numeric', month: 'numeric', year: 'numeric' }
                        const formattedDate = dateCreated.toLocaleDateString('en-GB', options)

                        return (
                          <Card key={idx} className='px-2'>
                            <CardHeader className='flex flex-row justify-between border-b'>
                              <Tag backgroundColor='rgba(75, 117, 255, 0.2)' paddingX={2.5} borderRadius={7}>
                                <div className='text-blue-kpmgBlue'>{camelCaseToSpaced(module?.category)}</div>
                              </Tag>
                              <div className='text-sm text-[#00338D]/80 font-sansSemibold'>{formattedDate || ''}</div>
                            </CardHeader>
                            <CardBody>
                              <div className='text-blue-kpmgBlue font-sansSemibold text-lg h-12'>{module?.moduleId} - {module?.title}</div>
                              <div className='text-blue-kpmgBlue my-5'>{module?.description}</div>
                            </CardBody>
                          </Card>
                        )
                      })}
                    </Grid>
                  </TabPanel>
                )
              })}
            </TabPanels>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

export default Library
