import React, { useState, useEffect } from 'react'
import { SimpleGrid, Avatar, Card, CardBody, Checkbox, CheckboxGroup, Icon, IconButton, Input, Textarea, Tooltip, Stack, useDisclosure } from '@chakra-ui/react'
import { CheckCircleIcon, ChevronRightIcon, InformationCircleIcon, Cog8ToothIcon } from '@heroicons/react/24/outline'
import SortMenu from '../SortMenu'
import { calculateDateDifference } from '../../utils'
import StatCard from '../StatCard'
import { TimeIcon, RemainingIcon } from '../Icons'
import Sidebar from '../Sidebar'

const menuOptions = [
  {
    type: 'alpha',
    name: 'ID (Ascending)',
    chronological: true,
  },
  {
    type: 'alpha',
    name: 'ID (Descending)',
    chronological: false,
  },
  {
    type: 'alpha',
    name: 'Title (A-Z)',
    chronological: false,
    property: 'subTitle',
  },
  {
    type: 'alpha',
    name: 'Title (Z-A)',
    chronological: true,
    property: 'subTitle',
  },
]

const SkillsAccordion = ({ sortedCriterion, entries, setSelectedKSB, status }) => {
  return (
    <div className='px-8 flex flex-col space-y-4 w-full'>
      <div className='font-sansSemibold text-black-custom1/70 text-xl'>{status}</div>
      {sortedCriterion &&
        sortedCriterion
          .filter(c => (status === 'Incomplete' ? !entries.some(e => e.skill === c.title) : entries.some(e => e.skill === c.title)))
          .map((c, idx) => {
            const occurences = entries.filter(e => e.skill === c.title).length
            return (
              <Card key={idx} className='bg-white w-full border rounded-xl space-x-4'>
                <CardBody className='flex flex-row space-x-5'>
                  <Avatar
                    name={c.title[0] + c.subTitle + ' ' + c.title[1]}
                    size='md'
                    fontWeight={600}
                    className={`cursor-pointer ${occurences >= 1 ? 'opacity-100' : 'opacity-50'}`}
                  />
                  <div>
                    <div className='font-sansSemibold'>{c?.subTitle}</div>
                    <div className='font-sans text-black-custom1/70 text-sm'>{c?.description.substring(0, 80)}...</div>
                  </div>
                  <div className='flex flex-row items-center space-x-5' style={{ marginLeft: 'auto' }}>
                    <p className={`text-3xl font-sansSemibold ${occurences > 1 ? 'text-green-turquoise' : status === 'Incomplete' ? 'text-pink' : 'text-orange'}`}>{occurences}</p>
                    <IconButton
                      as={ChevronRightIcon}
                      h={5}
                      w={5}
                      strokeWidth={3}
                      variant={'unstyled'}
                      onClick={() => setSelectedKSB(c)}
                      className='stroke-black-custom1/70 cursor-pointer'
                    />
                  </div>
                </CardBody>
              </Card>
            )
          })}
    </div>
  )
}

const PortfolioCompact = ({ sortedCriterion, setSortedCriterion, entries, portfolio, setLoading, setSelectedKSB }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [modifiedPortfolio, setModifiedPortfolio] = useState(portfolio)
  const [skills, setSkills] = useState()

  const ksbsAchieved = sortedCriterion?.filter(c => entries.some(e => e.skill === c.title)).length
  const ksbsRemaining = sortedCriterion?.filter(c => !entries.some(e => e.skill === c.title)).length

  const handleChange = (key, value) => {
    setModifiedPortfolio({ ...modifiedPortfolio, [key]: value })
  }

  const fetchData = async () => {
    setLoading(true)
    const apiUrl = 'http://localhost:5001/skills'

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
      setSkills(data?.skills.sort((a, b) => a.title.localeCompare(b.title)))
    } catch (error) {
      console.error('Operation failed:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <>
      <div className='w-full p-14 flex flex-col space-y-10 max-h-screen overflow-y-scroll'>
        <div className='flex flex-row space-x-12 justify-items-start ml-6'>
          <div className='flex flex-col w-full'>
            <div className='flex flex-row justify-between items-center w-full'>
              <div className='flex flex-row space-x-3 items-center'>
                <h1 className='text-2xl text-black-custom1 font-semibold'>{portfolio?.name}</h1>
                <Tooltip hasArrow label={portfolio?.description || 'abc'} placement='auto'>
                  <Icon color='#7213EA' as={InformationCircleIcon} h={7} w={7}/>
                </Tooltip>
              </div>
              <IconButton as={Cog8ToothIcon} size='sm' variant='unstyled' color='#A8A8A8' onClick={onOpen}/>
            </div>
            <div className='text-lg pr-96 mt-6 text-black-custom1/80'>{portfolio?.description}</div>
          </div>
        </div>
        <div className='px-8 flex flex-row justify-between w-full'>
          <SimpleGrid columns={3} spacing={10} maxWidth='100%' className='w-full'>
            <StatCard title='KSBs Achieved' icon={CheckCircleIcon} stat={ksbsAchieved} colour='#00A3A1' />
            <StatCard title='KSBs Remaining' icon={RemainingIcon} stat={ksbsRemaining} colour='#C6007E' />
            <StatCard title='Days Until Submission' icon={TimeIcon} stat={calculateDateDifference(portfolio?.deadline)} colour='#0091DA' />
          </SimpleGrid>
        </div>
        <div className='px-8'>
          <SortMenu elements={sortedCriterion} setSortedElements={setSortedCriterion} menuOptions={menuOptions} setLoading={setLoading} />
        </div>
        {['Incomplete', 'Achieved'].map((status, idx) =>
          <SkillsAccordion
            key={idx}
            sortedCriterion={sortedCriterion}
            entries={entries}
            setSelectedKSB={setSelectedKSB}
            status={status}
          />,
        )}
      </div>
      {isOpen && (
        <Sidebar
          isOpen={isOpen}
          onClose={onClose}
          size="lg"
          title={'Modify Portfolio'}
        >
          <div className='px-12 py-4 space-y-3'>
            <div className='text-lg font-sansSemibold text-black-custom1'>
            Name
            </div>
            <div className='mx-1'>
              <Input
                size="sm"
                value={modifiedPortfolio?.name}
                rows={9}
                onChange={e => handleChange('name', e.target.value)}
                py='1rem'
                _placeholder={{ opacity: 1, color: 'gray.500', fontSize: 14 }}
              />
            </div>
          </div>
          <div className='px-12 py-4 space-y-3'>
            <div className='text-lg font-sansSemibold text-black-custom1'>
             Description
            </div>
            <div className='mx-1'>
              <Textarea
                size="sm"
                value={modifiedPortfolio?.description}
                rows={3}
                onChange={e => handleChange('description', e.value.target)}
              />
            </div>
          </div>
          <div className='px-12 py-4 space-y-3'>
            <div className='text-lg font-sansSemibold text-black-custom1'>
            Specification
            </div>
            <CheckboxGroup defaultValue={modifiedPortfolio?.specification}>
              <Stack pl={2} mt={1} spacing={1} gap={5}>
                {skills?.map((skill, idx) => {
                  return (
                    <>
                      <Card key={idx} className='bg-gray-paleGray w-full border rounded-xl space-x-4'>
                        <CardBody className='flex flex-row space-x-5'>
                          <Checkbox
                            size='lg'
                            key={idx}
                            value={skill?.title}
                            onChange={(e) => {
                              const checked = e.target.checked
                              const updatedSkills = skills.map((s, index) => {
                                if (idx === index) {
                                  return { ...s, checked }
                                }
                                return s
                              })
                              setModifiedPortfolio({ ...modifiedPortfolio, specification: updatedSkills })
                            }}
                          >
                          </Checkbox>
                          <div>
                            <div className='font-sansSemibold'>{skill?.subTitle}</div>
                            <div className='font-sans text-black-custom1/70 text-sm'>{skill?.description.substring(0, 450)}...</div>
                          </div>
                        </CardBody>
                      </Card>
                    </>
                  )
                },
                )}
              </Stack>
            </CheckboxGroup>
          </div>
        </Sidebar>
      )}
    </>
  )
}

export default PortfolioCompact
