import React, { useState, useEffect } from 'react'
import { SimpleGrid, Avatar, Card, CardBody, Icon, IconButton, Tooltip, useDisclosure } from '@chakra-ui/react'
import { CheckCircleIcon, ChevronRightIcon, InformationCircleIcon, Cog8ToothIcon } from '@heroicons/react/24/outline'
import SortMenu from '../SortMenu'
import { calculateDateDifference } from '../../utils'
import StatCard from '../StatCard'
import { TimeIcon, RemainingIcon } from '../Icons'
import EditPortfolio from './EditPortfolio'

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
          ?.filter(c => (status === 'Incomplete' ? !entries.some(e => e.skill === c.title) : entries.some(e => e.skill === c.title)))
          ?.map((c, idx) => {
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

const PortfolioCompact = ({ specification, entries, portfolio, setPortfolio, setLoading, setSelectedKSB }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [skills, setSkills] = useState()
  const [users, setUsers] = useState()

  const fetchData = async () => {
    setLoading(true)
    const skillsApiUrl = 'http://localhost:5001/skills'
    const usersApiUrl = 'http://localhost:5001/users'

    try {
      const [skillsResponse, usersResponse] = await Promise.all([
        fetch(skillsApiUrl, { method: 'GET', headers: { 'Content-Type': 'application/json' } }),
        fetch(usersApiUrl, { method: 'GET', headers: { 'Content-Type': 'application/json' } }),
      ])

      if (!skillsResponse.ok) {
        const errorData = await skillsResponse.json()
        console.error('Operation failed:', errorData)
      }

      if (!usersResponse.ok) {
        const errorData = await usersResponse.json()
        console.error('Operation failed:', errorData)
      }

      const [skillsData, usersData] = await Promise.all([
        skillsResponse.json(),
        usersResponse.json(),
      ])

      setSkills(skillsData?.skills.sort((a, b) => a.title.localeCompare(b.title)))
      setUsers(usersData?.users)
    } catch (error) {
      console.error('Operation failed:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const [sortedCriterion, setSortedCriterion] = useState(skills?.filter(s => specification?.includes(s?.title)))

  const ksbsAchieved = sortedCriterion?.filter(c => entries.some(e => e.skill === c.title)).length
  const ksbsRemaining = sortedCriterion?.filter(c => !entries.some(e => e.skill === c.title)).length

  useEffect(() => {
    specification && setSortedCriterion(skills?.filter(s => specification?.includes(s?.title)))
  }, [specification, skills])

  return (
    <>
      <div className='w-full p-14 flex flex-col space-y-10 max-h-screen overflow-y-scroll'>
        <div className='flex flex-row space-x-12 justify-items-start ml-6'>
          <div className='flex flex-col w-full'>
            <div className='flex flex-row justify-between items-center w-full'>
              <div className='flex flex-row space-x-3 items-center'>
                <h1 className='text-2xl text-black-custom1 font-semibold'>{portfolio?.name}</h1>
                <Tooltip hasArrow label={`Owned by ${users?.find(user => user._id === portfolio.owner)?.name}`} placement='auto'>
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
        <EditPortfolio
          isOpen={isOpen}
          onClose={onClose}
          portfolio={portfolio}
          setPortfolio={setPortfolio}
          skills={skills}
          users={users}
        />
      )}
    </>
  )
}

export default PortfolioCompact
