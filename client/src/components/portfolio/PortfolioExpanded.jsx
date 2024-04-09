import React, { useState, useEffect } from 'react'
import { Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Avatar,
  Card,
  CardBody,
  CardHeader,
  SimpleGrid,
  Tag,
  Icon } from '@chakra-ui/react'
import { ChevronRightIcon } from '@heroicons/react/24/outline'
import { TrashIcon } from '@heroicons/react/24/solid'
import { camelCaseToSpaced } from '../../utils'
import SortMenu from '../SortMenu'

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
]

const Menu = ({ sortedModules, setSortedModules, setLoading, modules, entries }) => (
  <div>
    <hr className='border-t border-t-black-custom1/20 text-black-custom1 my-2 w-full' />
    <SortMenu
      elements={sortedModules}
      setSortedElements={setSortedModules}
      menuOptions={menuOptions}
      setLoading={setLoading}
    />
    <hr className='border-t border-t-black-custom1/20 text-black-custom1 my-2 w-full mb-5' />
    <div>
      <SimpleGrid columns={3} py={5}>
        {entries?.map((e, idx) => {
          const module = modules?.find(m => m.moduleId === e.module)
          return (
            <Card key={idx} >
              <CardHeader className='text-right' pb={0}>
                <Icon as={TrashIcon} />
              </CardHeader>
              <CardBody pt={0} mt={-4}>
                <div className='font-sansSemibold mb-2'>{module?.title}</div>
                <Tag backgroundColor='rgba(75, 117, 255, 0.2)' paddingX={2.5} borderRadius={7}>
                  <div className='text-blue-kpmgBlue'>{camelCaseToSpaced(module?.category)}</div>
                </Tag>
              </CardBody>
            </Card>
          )
        })}
      </SimpleGrid>
    </div>
  </div>
)

const PortfolioExpanded = ({ selectedKSB, setSelectedKSB, entries, setLoading }) => {
  const [modules, setModules] = useState()
  const [sortedModules, setSortedModules] = useState()

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
    modules && setModules(modules.sort((a, b) => a.title.localeCompare(b.title)))
  }, [modules])

  return (
    <div className='w-full pt-8 flex flex-col space-y-7 max-h-screen overflow-y-scroll'>
      <Breadcrumb spacing='8px' className='px-14' separator={<Icon as={ChevronRightIcon} color='gray.500' />}>
        <BreadcrumbItem>
          <BreadcrumbLink onClick={() => setSelectedKSB()} color='#005EB8'>Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink color='black' fontWeight={700}>{selectedKSB?.subTitle}</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <div className='bg-white px-20 h-full'>
        <div className='flex flex-col items-center space-y-5 py-10'>
          <Avatar
            name={selectedKSB.title[0] + selectedKSB.subTitle + ' ' + selectedKSB.title[1]}
            size='xl'
            fontWeight={600}
            className='cursor-pointer'/>
          <div className='text-xl font-sansSemibold'>{selectedKSB.subTitle}</div>
          <div className='font-sans text-black-custom1/70'>{selectedKSB.description}</div>
        </div>
        <Menu
          sortedModules={sortedModules}
          setSortedModules={setSortedModules}
          setLoading={setLoading}
          modules={modules}
          entries={entries}
        />
      </div>
    </div>
  )
}

export default PortfolioExpanded
