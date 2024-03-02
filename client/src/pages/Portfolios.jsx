import React, { useState, useEffect } from 'react'
import useAuthUser from 'react-auth-kit/hooks/useAuthUser'
import Navbar from '../components/Navbar'
import { Button, Card, CardHeader, CardBody, CardFooter, Grid, GridItem, Icon, SimpleGrid, Spinner, Tooltip } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { calculateDateDifference } from '../utils'
import { InformationCircleIcon } from '@heroicons/react/24/outline'
import { ClockIcon, UserGroupIcon } from '@heroicons/react/24/solid'
import SortMenu from '../components/SortMenu'

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
    type: 'numerical',
    name: 'Performance: High to low',
    chronological: true,
    property: 'performance',
  },
  {
    type: 'numerical',
    name: 'Performance: Low to high',
    chronological: false,
    property: 'performance',
  },
]

const CardGrid = ({ sortedPortfolios, user }) => {
  const navigate = useNavigate()

  return (
    <Grid templateColumns='repeat(2, 1fr)' rowGap={8} columnGap={10} marginTop={8}>
      {sortedPortfolios && sortedPortfolios?.map((p, idx) => {
        const daysRemaining = calculateDateDifference(p?.deadline)

        // Update logic
        const ksbsCompleted = 19
        const ksbsRemaining = 24

        return (
          <GridItem key={idx} w='100%'>
            <Card padding={4}>
              <CardHeader paddingBottom={2}>
                <div className='flex flex-row space-x-2 items-center'>
                  <div className='text-lg font-sansSemibold'>{p?.name}</div>
                  <Tooltip hasArrow label={p?.description || 'abc'} placement='auto'>
                    <Icon color='#7213EA' as={InformationCircleIcon} h={7} w={7}/>
                  </Tooltip>
                </div>
                <div className='flex flex-row justify-between'>
                  <div className='flex flex-row items-center space-x-2'>
                    <Icon as={ClockIcon} color="#989898"/>
                    <div className='text-[#333333] italic'>Due in {daysRemaining} days</div>
                  </div>
                  {
                    p?.sharedWith?.length > 0 &&
                    <Tooltip hasArrow label='Shared'>
                      <Icon as={UserGroupIcon} color='#00338D'/>
                    </Tooltip>
                  }
                </div>
              </CardHeader>
              <CardBody>
                <SimpleGrid spacing={8} templateColumns='repeat(2, minmax(200px, 1fr))'>
                  <Card className='items-center p-5'>
                    <div className='text-4xl font-sansSemibold text-green-turquoise pb-2'>{ksbsCompleted}</div>
                    <div className='leading-tight'>has been</div>
                    <strong className='leading-tight'>completed</strong>
                  </Card>
                  <Card className='items-center p-5'>
                    <div className='text-4xl font-sansSemibold text-blue-lightBlue pb-2'>{ksbsRemaining}</div>
                    <div className='leading-tight'>left</div>
                    <strong className='leading-tight'>to complete</strong>
                  </Card>
                </SimpleGrid>
              </CardBody>
              <CardFooter paddingTop={2} paddingBottom={2}>
                <Button size="md"
                  bgColor='#00338D'
                  color='white'
                  borderRadius={99}
                  paddingX={10}
                  marginX="auto"
                  onClick={() => navigate(`/portfolios/${p._id}`, { state: { portfolio: p } })}
                >
                      Edit
                </Button>
              </CardFooter>

            </Card>
          </GridItem>
        )
      })}
    </Grid>
  )
}

const Portfolios = () => {
  const auth = useAuthUser()
  const user = auth?.user

  const [portfolios, setPortfolios] = useState()
  const [sortedPortfolios, setSortedPortfolios] = useState()
  const [loading, setLoading] = useState(true)

  const fetchData = async () => {
    setLoading(true)
    const apiUrl = `http://localhost:5001/portfolios/${user.uid}`

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
      setPortfolios(data?.portfolios)
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
    portfolios && setSortedPortfolios(portfolios)
  }, [portfolios])

  return (
    <div className='bg-gray-paleGray flex flex-row'>
      <Navbar user={user}/>
      {loading
        ? <div
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        >

          <Spinner
            thickness='4px'
            speed='0.65s'
            emptyColor='gray.200'
            color='blue.500'
            size='xl'
          />
        </div>
        : <div className='w-full p-14 max-h-screen overflow-y-scroll'>
          <SortMenu elements={portfolios} setSortedElements={setSortedPortfolios} menuOptions={menuOptions} />
          <div>
            <h1 className='text-2xl text-blue-kpmgBlue font-semibold'>My Portfolios</h1>
            <CardGrid sortedPortfolios={sortedPortfolios?.filter(p => p.owner === user.uid)} user={user} />
          </div>

          <div className='mt-14'>
            <h1 className='text-2xl text-blue-kpmgBlue font-semibold'>Shared with Me</h1>
            <CardGrid sortedPortfolios={sortedPortfolios?.filter(p => p.owner !== user.uid)} user={user} />
          </div>

        </div>
      }
    </div>
  )
}

export default Portfolios
