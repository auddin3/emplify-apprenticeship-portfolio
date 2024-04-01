import React from 'react'
import Navbar from '../Navbar'
import { useLocation, useNavigate } from 'react-router-dom'
import { IconButton, Icon, SimpleGrid, Box } from '@chakra-ui/react'
import { ArrowLeftCircleIcon, CheckCircleIcon } from '@heroicons/react/24/solid'
import { LightBulbIcon, ClockIcon } from '@heroicons/react/24/outline'

const RemainingIcon = () => (
  <Box display="inline-block" borderRadius="full" p="2" width="40px" height="40px" className='bg-white'>
    <Icon as={LightBulbIcon} color="#C6007E" w={6} h={6} strokeWidth={2} />
  </Box>
)

const TimeIcon = () => (
  <Box display="inline-block" borderRadius="full" p="2" width="40px" height="40px" className='bg-white'>
    <Icon as={ClockIcon} color="#0091DA" w={6} h={6} strokeWidth={2} />
  </Box>
)

const StatCard = ({ title, icon, stat, colour }) => {
  return (
    <div style={{ backgroundColor: colour }} className={'rounded-lg p-4 flex flex-col flex-1 space-y-6'}>
      <div className='flex flex-row justify-between'>
        <Icon as={icon} color="white" h={10} w={10} />
        <div className="text-white text-4xl font-sansSemibold">{stat}</div>
      </div>
      <div className='text-white text-xl font-sansSemibold'>{title}</div>
    </div>
  )
}

const Portfolio = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const portfolio = location?.state?.portfolio
  // const canEdit = location?.state?.edit

  console.log(location?.state?.edit)
  return (
    <div className='bg-gradient-to-r from-[#F7F7F8] from-10% to-white flex flex-row'>
      <Navbar />
      <div className='w-full p-14 flex flex-col space-y-16'>
        <div className='flex flex-row space-x-12 justify-items-start'>
          <IconButton as={ArrowLeftCircleIcon} w={8} h={8} color={'rgb(0 51 141)'} isRound={true} onClick={() => navigate('/portfolios')} variant="unstyled" className='cursor-pointer'/>
          <div className='flex flex-col'>
            <h1 className='text-2xl text-blue-kpmgBlue font-semibold'>{portfolio?.name}</h1>
            <div className='text-xl w-2/3 mt-6 text-black-custom1/80'>{portfolio?.description}</div>
          </div>
        </div>
        <div className='px-20 flex flex-row justify-between w-full'>
          <SimpleGrid columns={3} spacing={10} maxWidth="100%" className='w-full'>
            <StatCard title="KSBs Achieved" icon={CheckCircleIcon} stat={19} colour="#00A3A1"/>
            <StatCard title="KSBs Remaining" icon={RemainingIcon} stat={3} colour="#C6007E"/>
            <StatCard title="Days Until Submission" icon={TimeIcon} stat={19} colour="#0091DA"/>
          </SimpleGrid>
        </div>
      </div>
    </div>
  )
}

export default Portfolio
