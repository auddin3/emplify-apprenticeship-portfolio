import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar'
import { useLocation, useNavigate } from 'react-router-dom'
import { IconButton, Icon, SimpleGrid, Box, Avatar } from '@chakra-ui/react'
import { ArrowLeftCircleIcon, CheckCircleIcon } from '@heroicons/react/24/solid'
import { LightBulbIcon, ClockIcon, ChevronRightIcon } from '@heroicons/react/24/outline'

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

const Portfolio = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const portfolio = location?.state?.portfolio
  // const canEdit = location?.state?.edit

  const [criterion, setCriterion] = useState()
  const [sortedCriterion, setSortedCriterion] = useState()
  // const [loading, setLoading] = useState(true)

  const fetchData = async () => {
    // setLoading(true)
    const apiUrl = `http://localhost:5001/portfolio/${portfolio._id}`

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
      setCriterion(data?.specification)
    } catch (error) {
      console.error('Operation failed:', error)
    }
    // finally {
    //   setLoading(false)
    // }
  }

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    criterion && setSortedCriterion(criterion)
  }, [criterion])

  return (
    <div className='bg-gradient-to-r from-[#F7F7F8] from-10% to-white flex flex-row'>
      <Navbar />
      <div className='w-full p-14 flex flex-col space-y-12'>
        <div className='flex flex-row space-x-12 justify-items-start'>
          <IconButton
            as={ArrowLeftCircleIcon}
            w={8}
            h={8}
            color={'rgb(0 51 141)'}
            isRound={true}
            onClick={() => navigate('/portfolios')}
            variant="unstyled"
            className='cursor-pointer'
          />
          <div className='flex flex-col'>
            <h1 className='text-2xl text-blue-kpmgBlue font-semibold'>{portfolio?.name}</h1>
            <div className='text-lg w-2/3 mt-6 text-black-custom1/80'>{portfolio?.description}</div>
          </div>
        </div>
        <div className='px-20 flex flex-row justify-between w-full'>
          <SimpleGrid columns={3} spacing={10} maxWidth="100%" className='w-full'>
            <StatCard title="KSBs Achieved" icon={CheckCircleIcon} stat={19} colour="#00A3A1"/>
            <StatCard title="KSBs Remaining" icon={RemainingIcon} stat={3} colour="#C6007E"/>
            <StatCard title="Days Until Submission" icon={TimeIcon} stat={19} colour="#0091DA"/>
          </SimpleGrid>
        </div>
        <div className='px-20 flex flex-col space-y-4 w-full'>
          <div className='font-sansSemibold text-black-custom1/70 text-lg'>Incomplete</div>
          { sortedCriterion && sortedCriterion?.map((c, idx) => {
            const splitTitle = c?.title.split('C').join(' ')

            return (
              <div key={idx} className='flex flex-row bg-white w-full p-4 rounded-xl border space-x-4'>
                <Avatar name={'C' + splitTitle} size='md' fontWeight={600} className='cursor-pointer' style={{ opacity: 0.5 }}/>
                <div>
                  <div className='font-sansSemibold'>{c?.subTitle}</div>
                  <div className='font-sans text-black-custom1/70 text-sm'>{c?.description.substring(0, 100)}...</div>
                </div>
                <div className='flex flex-row items-center space-x-5' style={{ marginLeft: 'auto' }}>
                  <p className='text-3xl font-sansSemibold text-pink'>0</p>
                  <Icon as={ChevronRightIcon} h={5} w={5} strokeWidth={3}/>
                </div>
              </div>
            )
          })}
        </div>
        <div className='px-20 flex flex-col space-y-4 w-full'>
          <div className='font-sansSemibold text-black-custom1/70 text-lg'>Complete</div>
          { sortedCriterion && sortedCriterion?.map((c, idx) => {
            const splitTitle = c?.title.split('C').join(' ')

            return (
              <div key={idx} className='flex flex-row bg-white w-full p-4 rounded-xl border space-x-4'>
                <Avatar name={'C' + splitTitle} size='md' fontWeight={600} className='cursor-pointer'/>
                <div>
                  <div className='font-sansSemibold'>{c?.subTitle}</div>
                  <div className='font-sans text-black-custom1/70 text-sm'>{c?.description.substring(0, 100)}...</div>
                </div>
                <div className='flex flex-row items-center space-x-5' style={{ marginLeft: 'auto' }}>
                  <p className='text-3xl font-sansSemibold text-pink'>0</p>
                  <Icon as={ChevronRightIcon} h={5} w={5} strokeWidth={3}/>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Portfolio
