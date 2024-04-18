import React, { useState, useEffect } from 'react'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, Button, Avatar, Card, CardBody, CardHeader, SimpleGrid, Select, Tag, NumberInput, NumberInputField, Icon, IconButton, InputRightAddon, InputGroup,
  Step, Stepper, StepIndicator, StepStatus, StepIcon, StepNumber, Box, StepTitle, StepSeparator, StepDescription, useSteps, Textarea, useDisclosure, useToast } from '@chakra-ui/react'
import { ChevronRightIcon, PlusCircleIcon } from '@heroicons/react/24/outline'
import { TrashIcon } from '@heroicons/react/24/solid'
import { camelCaseToSpaced } from '../../utils'
import SortMenu from '../SortMenu'
import PortfolioEntry from './PortfolioEntry'
import Sidebar from '../Sidebar'
import useAuthUser from 'react-auth-kit/hooks/useAuthUser'

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

const AddPortfolioLog = ({ isOpen, onClose, modules, selectedKSB, setEntries, portfolio, grades, setGrades }) => {
  const toast = useToast()
  const [newEntry, setNewEntry] = useState()
  const [selectedModule, setSelectedModule] = useState()
  const auth = useAuthUser()
  const user = auth?.user

  const steps = [
    { title: 'First', description: 'Basic Information' },
    { title: 'Second', description: 'Annotation' },
  ]

  const { activeStep, setActiveStep } = useSteps({
    index: 0,
    count: steps.length,
  })

  const handleChange = (key, val) => {
    setNewEntry({ ...newEntry, [key]: val })
    if (key === 'module') setSelectedModule(modules?.find(m => m.moduleId === val))
  }

  const handleSubmit = async () => {
    const formattedEntry = { ...newEntry, skill: selectedKSB?.title, dateCreated: Date(), user: user?.uid }

    const apiUrl = `http://localhost:5001/portfolioEntry/${portfolio?._id}`
    try {
      const response = await fetch(apiUrl, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formattedEntry),
      })

      if (!response.ok) {
        const errorData = await response.json()
        console.error('Operation failed:', errorData)
      }

      const data = await response.json()
      setEntries(data?.entries)
      setGrades(data?.grades)
    } catch (error) {
      console.error('Operation failed:', error)
      toast({
        title: 'Insertion Failed',
        status: 'error',
        isClosable: true,
        duration: 9000,
        position: 'bottom-right',
      })
    } finally {
      toast({
        title: 'New Entry Inserted',
        status: 'success',
        duration: 9000,
        isClosable: true,
        position: 'bottom-right',
      })
      onClose()
    }
  }

  const moduleGradesExist = grades?.filter(g => g?.module === selectedModule?.moduleId).length > 0

  return (
    <Sidebar
      isOpen={isOpen}
      onClose={onClose}
      size="xl"
      title={'Add Portfolio Entry'}
    >
      <div className='mx-20 my-10'>
        <Stepper size='md' index={activeStep}>
          {steps.map((step, index) => (
            <Step key={index}
              onClick={() => newEntry && setActiveStep(index)}
              className={`${!newEntry ? 'cursor-not-allowed' : 'cursor-pointer'}`}
            >
              <StepIndicator>
                <StepStatus
                  complete={<StepIcon />}
                  incomplete={<StepNumber />}
                  active={<StepNumber />}
                />
              </StepIndicator>

              <Box flexShrink='0'>
                <StepTitle>{step.title}</StepTitle>
                <StepDescription>{step.description}</StepDescription>
              </Box>

              <StepSeparator />
            </Step>
          ))}
        </Stepper>
      </div>
      {activeStep === 0
        ? (
          <>
            <div className='px-12 py-4 space-y-2 mb-4'>
              <div className='text-lg font-sansSemibold text-black-custom1'>
            Module
              </div>
              <Select
                size='sm'
                py='0.15rem'
                placeholder='Select a module'
                className='text-gray-500/100'
                onChange={e => handleChange('module', e.target.value)}
              >
                {selectedModule?.title}
                {modules && modules?.map(m => (
                  <option key={m?._id} value={m?.moduleId} selected={m === selectedModule}>
                    {m?.title}
                  </option>
                ))}
              </Select>
            </div>
            {
              selectedModule && (
                <div className='px-12 py-4 space-y-2 mb-4'>
                  <div className='text-lg font-sansSemibold text-black-custom1 mb-4'>
              Grades
                  </div>
                  {
                    moduleGradesExist
                      ? (
                        <Box bg='rgba(75, 117, 255, 0.2)' w='100%' p={4} color='white'>
                          <div className='text-blue-kpmgBlue'>A record for this module already exists.</div>
                        </Box>
                      )
                      : (
                        <div className='space-y-4 w-full'>
                          {selectedModule?.assessmentBreakdown.map((assessment, idx) => (
                            <div key={idx} className='flex flex-row justify-between space-x-5 items-center'>
                              <div className='font-sans text-base w-2/3'>
                                {assessment?.title}
                              </div>
                              <InputGroup className='flex flex-row-reverse'>
                                <InputRightAddon>%</InputRightAddon>
                                <NumberInput
                                  size='md'
                                  max={100}
                                  min={0}
                                  onChange={(e => handleChange(assessment?.title, e))}
                                >
                                  <NumberInputField />
                                </NumberInput>
                              </InputGroup>
                            </div>
                          ))}
                        </div>
                      )
                  }
                </div>
              )
            }
          </>
        )
        : (
          <>
            <div className='px-12 text-lg font-sansSemibold text-black-custom1'>
              <div className='px-2 py-4 space-y-3'>
                <div className='font-sansSemibold text-black-custom1 text-sm'>
         1. What was the nature of your involvement with the project?
                </div>
                <ul className='list-disc list-inside pl-6 pb-3'>
                  <li className='text-sm italic font-sans text-black-custom1'>
          What deliverables were you tasked with?
                  </li>
                  <li className='text-sm italic font-sans text-black-custom1'>
          Which team were you apart of during this time
                  </li>
                </ul>
                <div className='mx-1'>
                  <Textarea
                    size="sm"
                    value={newEntry?.q1}
                    rows={5}
                    onChange={e => handleChange('q1', e.target.value)}
                  />
                </div>
              </div>
              <div className='px-2 py-4 space-y-3'>
                <div className='font-sansSemibold text-black-custom1 text-sm'>
          2. Describe your actions and contributions.
                </div>
                <ul className='list-disc list-inside pl-6 pb-3'>
                  <li className='text-sm italic font-sans text-black-custom1'>
          What specific tasks were you assigned?
                  </li>
                  <li className='text-sm italic font-sans text-black-custom1'>
          What steps did you take to complete your tasks?
                  </li>
                </ul>
                <div className='mx-1'>
                  <Textarea
                    size="sm"
                    value={newEntry?.q2}
                    rows={5}
                    onChange={e => handleChange('q2', e.target.value)}
                  />
                </div>
              </div>
              <div className='px-2 py-4 space-y-3'>
                <div className='font-sansSemibold text-black-custom1 text-sm'>
          3. What were the outcomes of your contribution?
                </div>
                <ul className='list-disc list-inside pl-6 pb-3'>
                  <li className='text-sm italic font-sans text-black-custom1'>
          How did your actions impact the project&apos;s success or completion?
                  </li>
                  <li className='text-sm italic font-sans text-black-custom1'>
          What lessons did you learn from this experience?
                  </li>
                </ul>
                <div className='mx-1'>
                  <Textarea
                    size="sm"
                    value={newEntry?.q3}
                    rows={5}
                    onChange={e => handleChange('q3', e.target.value)}
                  />
                </div>
              </div>
              <div className='px-2 py-4 space-y-3'>
                <div className='font-sansSemibold text-black-custom1 text-sm'>
        4. Reflect on the skills gained from this experience.
                </div>
                <ul className='list-disc list-inside pl-6 pb-3'>
                  <li className='text-sm italic font-sans text-black-custom1'>
          What skills did you develop or enhance through your participation?
                  </li>
                  <li className='text-sm italic font-sans text-black-custom1'>
          How do you plan to apply these skills in future endeavors?
                  </li>
                </ul>
                <div className='mx-1'>
                  <Textarea
                    size="sm"
                    value={newEntry?.q4}
                    rows={5}
                    onChange={e => handleChange('q4', e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className='w-full flex flex-row justify-center my-2'>
              <Button
                size="lg"
                bgColor='#00338D'
                color='white'
                borderRadius={99}
                className='w-1/4 py-6 my-6 mx-auto'
                onClick={handleSubmit}
              >
                Save
              </Button>
            </div>
          </>
        )
      }
    </Sidebar>
  )
}

const EntriesGrid = ({ sortedModules, setSortedModules, setLoading, modules, entries, setSelectedEntry, setEntries, onOpen, canEdit }) => {
  const toast = useToast()
  const handleDelete = async (entry) => {
    const apiUrl = `http://localhost:5001/portfolioEntry/${entry._id}`
    setLoading(true)
    try {
      const response = await fetch(apiUrl, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      })

      if (!response.ok) {
        const errorData = await response.json()
        console.error('Operation failed:', errorData)
      }

      const data = await response.json()
      setEntries(data)
    } catch (error) {
      console.error('Operation failed:', error)
      toast({
        title: 'Deletion Failed',
        status: 'error',
        isClosable: true,
        duration: 9000,
        position: 'bottom-right',
      })
    } finally {
      toast({
        title: 'Deletion Successful',
        status: 'success',
        duration: 9000,
        isClosable: true,
        position: 'bottom-right',
      })
      setLoading(false)
    }
  }

  return (
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
        <SimpleGrid columns={3} py={5} gap={10}>
          {entries?.map((entry, idx) => {
            const module = modules?.find(m => m.moduleId === entry.module)
            return (
              <Card key={idx}>
                <CardHeader className='text-right' pb={0}>
                  <IconButton
                    as={TrashIcon}
                    color="#A9A9A9"
                    variant="unstyled"
                    size="xs"
                    onClick={() => handleDelete(entry)}
                  />
                </CardHeader>
                <CardBody pt={0} mt={-4} onClick={() => setSelectedEntry(entry)} className='cursor-pointer'>
                  <div className='font-sansSemibold mb-2'>{module?.title}</div>
                  <Tag backgroundColor='rgba(75, 117, 255, 0.2)' paddingX={2.5} borderRadius={7}>
                    <div className='text-blue-kpmgBlue'>{camelCaseToSpaced(module?.category)}</div>
                  </Tag>
                </CardBody>
              </Card>
            )
          })}
          {!!canEdit && (
            <Card
              className='flex justify-center items-center cursor-pointer min-h-28'
              backgroundColor='rgba(75, 117, 255, 0.2)'
              onClick={onOpen}
            >
              <IconButton
                as={PlusCircleIcon}
                variant="unstyled"
                h={16} w={16}
                className='stroke-blue-kpmgBlue mx-auto self-center'
              />
            </Card>
          )}
        </SimpleGrid>
      </div>
    </div>
  )
}

const PortfolioExpanded = ({ selectedKSB, setSelectedKSB, entries, setEntries, setLoading, canEdit, portfolio, grades, setGrades }) => {
  const [modules, setModules] = useState()
  const [sortedModules, setSortedModules] = useState()
  const [selectedEntry, setSelectedEntry] = useState()
  const { isOpen, onOpen, onClose } = useDisclosure()

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
        <Breadcrumb spacing='8px' className='px-14' separator={<Icon as={ChevronRightIcon} color='gray.500' variant="unstyled" />}>
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
              setSelectedEntry={setSelectedEntry}
              grades={grades}
              selectedKSB={selectedKSB}
              setEntries={setEntries}
            />
            : (
              <>
                <EntriesGrid
                  sortedModules={sortedModules}
                  setSortedModules={setSortedModules}
                  setLoading={setLoading}
                  modules={modules}
                  entries={entries}
                  setEntries={setEntries}
                  setSelectedEntry={setSelectedEntry}
                  onOpen={onOpen}
                  canEdit={canEdit}
                />
                {
                  isOpen && !!canEdit &&
                  <AddPortfolioLog
                    isOpen={isOpen}
                    onClose={onClose}
                    modules={modules}
                    selectedKSB={selectedKSB}
                    setEntries={setEntries}
                    portfolio={portfolio}
                    grades={grades}
                    setGrades={setGrades}
                  />
                }
              </>
            )
        }
      </div>
    </div>
  )
}

export default PortfolioExpanded
