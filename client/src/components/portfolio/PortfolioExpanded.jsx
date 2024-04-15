import React, { useState, useEffect } from 'react'
import { Breadcrumb,
  BreadcrumbItem,
  Button,
  BreadcrumbLink,
  Avatar,
  Card,
  CardBody,
  CardHeader,
  SimpleGrid,
  Tag,
  Icon } from '@chakra-ui/react'
import { ChevronRightIcon, PlusIcon } from '@heroicons/react/24/outline'
import { TrashIcon } from '@heroicons/react/24/solid'
import { camelCaseToSpaced } from '../../utils'
import SortMenu from '../SortMenu'
import PortfolioEntry from './PortfolioEntry'

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

const KSBGrid = ({ sortedModules, setSortedModules, setLoading, modules, entries, setSelectedEntry }) => (
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
            <Card key={idx} onClick={() => setSelectedEntry(e)}>
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
    <Button leftIcon={<PlusIcon />} colorScheme='facebook' variant="solid">
        New Entry
    </Button>
  </div>
)

const PortfolioExpanded = ({ selectedKSB, setSelectedKSB, entries, setLoading, grades }) => {
  const [modules, setModules] = useState()
  const [sortedModules, setSortedModules] = useState()
  const [selectedEntry, setSelectedEntry] = useState()

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
    <div className='w-full flex flex-col space-y-7 max-h-screen overflow-y-scroll bg-white'>
      <div className='w-full bg-gray-paleGray py-7'>
        <Breadcrumb spacing='8px' className='px-14' separator={<Icon as={ChevronRightIcon} color='gray.500' />}>
          <BreadcrumbItem>
            <BreadcrumbLink
              onClick={() => setSelectedKSB()}
              color='#005EB8'
            >
            Home
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink
              color={selectedEntry ? '#005EB8' : 'black'}
              fontWeight={selectedEntry ? 500 : 700}
              onClick={() => setSelectedEntry()}
              className='cursor-pointer'
            >
              {selectedKSB?.subTitle}
            </BreadcrumbLink>
          </BreadcrumbItem>
          {
            selectedEntry
              ? (
                <BreadcrumbItem isCurrentPage>
                  <BreadcrumbLink color='black' fontWeight={700} className='cursor-pointer'>
                    {modules?.find(m => m.moduleId === selectedEntry.module).title}
                  </BreadcrumbLink>
                </BreadcrumbItem>
              )
              : ''
          }
        </Breadcrumb>
      </div>
      <div className='px-20 h-full'>
        <div className='flex flex-col items-center space-y-5 pb-8'>
          <Avatar
            name={selectedKSB.title[0] + selectedKSB.subTitle + ' ' + selectedKSB.title[1]}
            size='xl'
            fontWeight={600}
            className='cursor-pointer'/>
          <div className='text-xl font-sansSemibold'>{selectedKSB.subTitle}</div>
          <div className='font-sans text-black-custom1/70'>{selectedKSB.description}</div>
        </div>
        {
          selectedEntry
            ? <PortfolioEntry
              module={modules?.find(m => m.moduleId === selectedEntry.module)}
              selectedEntry={selectedEntry}
              setLoading={setLoading}
              grades={grades}
              selectedKSB={selectedKSB}
            />
            : <KSBGrid
              sortedModules={sortedModules}
              setSortedModules={setSortedModules}
              setLoading={setLoading}
              modules={modules}
              entries={entries}
              setSelectedEntry={setSelectedEntry}
            />
        }
      </div>
    </div>
  )
}

export default PortfolioExpanded
