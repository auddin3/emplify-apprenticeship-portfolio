import React from 'react'
// import { useNavigate } from 'react-router-dom'
import { Icon, IconButton, SimpleGrid, Box, Avatar, Card, CardBody } from '@chakra-ui/react'
import { CheckCircleIcon } from '@heroicons/react/24/solid'
import { LightBulbIcon, ClockIcon, ChevronRightIcon } from '@heroicons/react/24/outline'
import SortMenu from '../SortMenu'
import { calculateDateDifference } from '../../utils'

const menuOptions = [
  {
    type: 'alpha',
    name: 'Skill ID (Ascending)',
    chronological: true,
  },
  {
    type: 'alpha',
    name: 'Skill ID (Descending)',
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

const RemainingIcon = () => (
  <Box display="inline-flex" alignItems="center" justifyContent="center" borderRadius="full" p="2" width="30px" height="30px" className='bg-white'>
    <Icon as={LightBulbIcon} color="#C6007E" w={4} h={4} strokeWidth={2} />
  </Box>
)

const TimeIcon = () => (
  <Box display="inline-flex" alignItems="center" justifyContent="center" borderRadius="full" p="2" width="30px" height="30px" className='bg-white'>
    <Icon as={ClockIcon} color="#0091DA" w={5} h={5} strokeWidth={2} />
  </Box>
)

const StatCard = ({ title, icon, stat, colour }) => {
  return (
    <div style={{ backgroundColor: colour }} className={'rounded-lg p-4 flex flex-col flex-1 space-y-6'}>
      <div className='flex flex-row justify-between'>
        <Icon as={icon} color="white" h={9} w={9} />
        <div className="text-white text-2xl font-sansSemibold">{stat}</div>
      </div>
      <div className='text-white text-lg font-sansSemibold'>{title}</div>
    </div>
  )
}

const PortfolioCompact = ({ sortedCriterion, setSortedCriterion, entries, portfolio, setLoading, setSelectedKSB }) => {
  const ksbsAchieved = sortedCriterion?.filter(c => entries.some(e => e.skill === c.title)).length
  const ksbsRemaining = sortedCriterion?.filter(c => !entries.some(e => e.skill === c.title)).length

  return (
    <div className='w-full p-14 flex flex-col space-y-10 max-h-screen overflow-y-scroll'>
      <div className='flex flex-row space-x-12 justify-items-start ml-6'>
        {/* <IconButton
          as={ArrowLeftCircleIcon}
          w={8}
          h={8}
          color={'rgb(0 51 141)'}
          isRound={true}
          onClick={() => navigate('/portfolios')}
          variant="unstyled"
          className='cursor-pointer'
        /> */}
        <div className='flex flex-col'>
          <h1 className='text-2xl text-black-custom1 font-semibold'>{portfolio?.name}</h1>
          <div className='text-lg pr-96 mt-6 text-black-custom1/80'>{portfolio?.description}</div>
        </div>
      </div>
      <div className='px-8 flex flex-row justify-between w-full'>
        <SimpleGrid columns={3} spacing={10} maxWidth="100%" className='w-full'>
          <StatCard title="KSBs Achieved" icon={CheckCircleIcon} stat={ksbsAchieved} colour="#00A3A1"/>
          <StatCard title="KSBs Remaining" icon={RemainingIcon} stat={ksbsRemaining} colour="#C6007E"/>
          <StatCard title="Days Until Submission" icon={TimeIcon} stat={calculateDateDifference(portfolio?.deadline)} colour="#0091DA"/>
        </SimpleGrid>
      </div>
      <div className='px-8'>
        <SortMenu
          elements={sortedCriterion}
          setSortedElements={setSortedCriterion}
          menuOptions={menuOptions}
          setLoading={setLoading}
        />
      </div>
      <div className='px-8 flex flex-col space-y-4 w-full'>
        <div className='font-sansSemibold text-black-custom1/70 text-xl'>Incomplete</div>
        { sortedCriterion && sortedCriterion?.filter(c => !entries.some(e => e.skill === c.title))?.map((c, idx) => {
          const occurences = entries.filter(e => e.skill === c.title).length
          return (
            <Card key={idx} className='bg-white w-full border rounded-xl space-x-4'>
              <CardBody className='flex flex-row space-x-5'>
                <Avatar name={c.title[0] + c.subTitle + ' ' + c.title[1]} size='md' fontWeight={600} className='cursor-pointer' style={{ opacity: 0.5 }} />
                <div>
                  <div className='font-sansSemibold'>{c?.subTitle}</div>
                  <div className='font-sans text-black-custom1/70 text-sm'>{c?.description.substring(0, 80)}...</div>
                </div>
                <div className='flex flex-row items-center space-x-5' style={{ marginLeft: 'auto' }}>
                  <p className={`text-3xl font-sansSemibold ${occurences > 1 ? 'text-green-turquoise' : 'text-pink'}`}>{occurences}</p>
                  <IconButton
                    as={ChevronRightIcon}
                    h={5} w={5}
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
      <div className='px-8 flex flex-col space-y-4 w-full'>
        <div className='font-sansSemibold text-black-custom1/70 text-xl'>Achieved</div>
        { sortedCriterion && sortedCriterion?.filter(c => entries.some(e => e.skill === c.title))?.map((c, idx) => {
          const occurences = entries.filter(e => e.skill === c.title).length
          return (
            <Card key={idx} className='bg-white w-full border rounded-xl space-x-4'>
              <CardBody className='flex flex-row space-x-5'>
                <Avatar name={c.title[0] + c.subTitle + ' ' + c.title[1]} size='md' fontWeight={600} className='cursor-pointer'/>
                <div>
                  <div className='font-sansSemibold'>{c?.subTitle}</div>
                  <div className='font-sans text-black-custom1/70 text-sm'>{c?.description.substring(0, 80)}...</div>
                </div>
                <div className='flex flex-row items-center space-x-5' style={{ marginLeft: 'auto' }}>
                  <p className={`text-3xl font-sansSemibold ${occurences > 1 ? 'text-green-turquoise' : 'text-orange'}`}>{occurences}</p>
                  <IconButton
                    as={ChevronRightIcon}
                    h={5} w={5}
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
    </div>
  )
}

export default PortfolioCompact
