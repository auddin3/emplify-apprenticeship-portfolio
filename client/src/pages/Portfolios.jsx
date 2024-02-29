import React, { useState, useEffect } from 'react'
import useAuthUser from 'react-auth-kit/hooks/useAuthUser'
import Navbar from '../components/Navbar'
import { Button, Card, CardHeader, CardBody, CardFooter, Grid, GridItem, Icon, SimpleGrid, Tooltip } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { calculateDateDifference } from '../utils'
import { InformationCircleIcon } from '@heroicons/react/24/outline'
import SortMenu from '../components/SortMenu'

const Portfolios = () => {
  const auth = useAuthUser()
  const user = auth.user
  const navigate = useNavigate()

  const [portfolios, setPortfolios] = useState()
  const [sortedPortfolios, setSortedPortfolios] = useState()

  const fetchData = async () => {
    const apiUrl = `http://localhost:5001/portfolios/${user.uid}`

    try {
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      })

      if (!response.ok) {
        const errorData = await response.json()
        console.error('Login failed:', errorData)
      }

      const data = await response.json()
      setPortfolios(data?.portfolios)
    } catch (error) {
      console.error('Operation failed:', error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    setSortedPortfolios(portfolios)
  }, [portfolios])

  return (
    <div className='bg-gray-paleGray flex flex-row'>
      <Navbar user={user}/>
      <div className='w-full p-14 max-h-screen overflow-y-scroll'>
        <h1 className='text-2xl text-blue-kpmgBlue font-semibold'>My Portfolios</h1>
        <SortMenu elements={portfolios} setSortedElements={setSortedPortfolios} />
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
                      <Tooltip hasArrow label={p?.description || 'abc'} bg="gray.300" color='black' placement='right'>
                        <Icon color='#6D2077' as={InformationCircleIcon}/>
                      </Tooltip>
                    </div>
                    <div className='text-[#333333] italic'>Due in {daysRemaining} days</div>
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
                  <CardFooter paddingTop={3} paddingBottom={5}>
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
      </div>
    </div>
  )
}

export default Portfolios
