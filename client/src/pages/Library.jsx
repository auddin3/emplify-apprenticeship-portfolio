import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import SearchBar from '../components/SearchBar'
import { Card, CardHeader, CardBody, Grid, Spinner, Tabs, TabList, Tab, TabIndicator, TabPanels, TabPanel, Tag, useDisclosure } from '@chakra-ui/react'
import SortMenu from '../components/SortMenu'
import { camelCaseToSpaced, convertDateToString } from '../utils'
import SideBar from '../components/SideBar'
import PieChart from '../components/charts/PieChart'

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

const ModuleInformation = ({ isOpen, onClose, selectedModule }) => {
  return (
    <SideBar isOpen={isOpen} onClose={onClose} title={selectedModule?.title} >
      <div className='relative space-y-2'>
        <div className='ml-8 mt-2.5 mb-3 flex flex-row items-center space-x-8'>
          <div className='space-y-2 w-24'>
            <div className='font-sansSemibold text-blue-kpmgBlue'>Date Created</div>
            <div className='font-sans text-blue-kpmgBlue text-sm'>{convertDateToString(selectedModule?.dateCreated)}</div>
          </div>
          <div className='space-y-2'>
            <div className='font-sansSemibold text-blue-kpmgBlue'>Category</div>
            <Tag backgroundColor='rgba(75, 117, 255, 0.2)' paddingX={2.5} borderRadius={7}>
              <div className='text-blue-kpmgBlue font-sans'>{camelCaseToSpaced(selectedModule?.category)}</div>
            </Tag>
          </div>
        </div>
        <hr className='border-t border-t-black-custom1/20 text-black-custom1 w-full absolute left-0 right-0' />
      </div>
      <div className='relative space-y-2 mt-10'>
        <div className='ml-8 my-3.5 flex flex-row items-start space-x-8'>
          <div className='space-y-2 w-24'>
            <div className='font-sansSemibold text-blue-kpmgBlue'>Module ID</div>
            <div className='font-sans text-blue-kpmgBlue text-sm'>{selectedModule?.moduleId}</div>
          </div>
          <div className='space-y-2 w-64'>
            <div className='font-sansSemibold text-blue-kpmgBlue'>Description</div>
            <div className='text-blue-kpmgBlue font-sans text-sm'>{selectedModule?.description}</div>
          </div>
        </div>
        <div className='space-y-2 mx-8'>
          <div className='font-sansSemibold text-blue-kpmgBlue'>Learning Objectives</div>
          <div className='text-blue-kpmgBlue'>
            <ul className="list-inside pl-1.5 mb-3.5">
              {selectedModule?.learningObjectives && selectedModule?.learningObjectives?.map((lo, idx) => (
                <li key={idx} className="text-sm flex items-center font-sans">
                  <span className="mr-2 font-sansBold">&#10003;</span>
                  {lo}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <hr className='border-t border-t-black-custom1/20 text-black-custom1 w-full absolute left-0 right-0' />
      </div>
      <div className='relative space-y-2 mt-10'>
        <div className='ml-8 my-3.5 flex flex-col space-x-8'>
          <div className='font-sansSemibold text-blue-kpmgBlue'>Assessment Breakdown</div>
        </div>
        {selectedModule?.assessmentBreakdown && <PieChart data={selectedModule?.assessmentBreakdown}/>}
        <div className="h-1"></div>
        <hr className='border-t border-t-black-custom1/20 text-black-custom1 w-full absolute left-0 right-0' />
      </div>
    </SideBar>
  )
}

const Library = () => {
  const [tabIndex, setTabIndex] = useState(0)
  const [modules, setModules] = useState()
  const [filteredModules, setFilteredModules] = useState()
  const [loading, setLoading] = useState(true)

  const { isOpen, onOpen, onClose } = useDisclosure()
  const [selectedModule, setSelectedModule] = useState('')

  const fetchData = async () => {
    setLoading(true)
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
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    modules && setFilteredModules(modules.sort((a, b) => a.title.localeCompare(b.title)))
  }, [modules])

  const onModuleClick = (module) => {
    if (module) {
      setSelectedModule(module)
      onOpen()
    }
  }

  return (
    <div className='bg-gray-paleGray flex flex-row max-h-screen'>
      <Navbar />
      {loading
        ? <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
          <Spinner
            thickness='4px'
            speed='0.65s'
            emptyColor='gray.200'
            color='blue.500'
            size='xl'
          />
        </div>
        : <>
          <div className='w-full p-12 max-h-screen overflow-y-scroll'>
            <SearchBar
              elements={filteredModules}
              setElements={setFilteredModules}
              initialElements={modules}
              searchKeys={['title', 'moduleId']}
              setLoading={setLoading}
            />
            <div className='mx-2 mt-10'>
              <hr className='border-t border-t-black-custom1/20 text-black-custom1 my-2 w-full' />
              <SortMenu
                elements={filteredModules}
                setSortedElements={setFilteredModules}
                menuOptions={menuOptions}
                setLoading={setLoading}
              />
              <hr className='border-t border-t-black-custom1/20 text-black-custom1 my-2 w-full mb-5' />
              <Tabs variant='unstyled' size='lg'>
                <TabList className='space-x-5'>
                  {pages?.map((page, idx) => {
                    const isSelected = idx === tabIndex
                    const count = filteredModules?.filter(module => module?.category === page).length

                    return (
                      <Tab
                        key={idx}
                        _selected={{ color: '#00338D' }}
                        className={`text-[#00338D]/60 ${page === 'All' ? '' : 'space-x-2'}`}
                        onClick={() => setTabIndex(idx)}
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
                            return (
                              <Card key={idx} className='px-2'>
                                <CardHeader className='flex flex-row justify-between border-b'>
                                  <Tag backgroundColor='rgba(75, 117, 255, 0.2)' paddingX={2.5} borderRadius={7}>
                                    <div className='text-blue-kpmgBlue'>{camelCaseToSpaced(module?.category)}</div>
                                  </Tag>
                                  <div className='text-sm text-[#00338D]/80 font-sansSemibold'>{convertDateToString(module?.dateCreated) || ''}</div>
                                </CardHeader>
                                <CardBody>
                                  <div className='text-blue-kpmgBlue font-sansSemibold text-lg h-12 cursor-pointer' onClick={() => onModuleClick(module)}>
                                    {module?.moduleId} - {module?.title}
                                  </div>
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
          { selectedModule && <ModuleInformation isOpen={isOpen} onClose={onClose} selectedModule={selectedModule} /> }
        </>
      }
    </div>
  )
}

export default Library
