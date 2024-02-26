import React, { useState, useEffect } from 'react'
import useAuthUser from 'react-auth-kit/hooks/useAuthUser'
import Navbar from '../components/Navbar'
import { Button, Card, CardHeader, CardBody, CardFooter, Grid, GridItem, SimpleGrid } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'

const Portfolios = () => {
  const auth = useAuthUser()
  const user = auth.user
  const navigate = useNavigate()

  const [portfolios, setPortfolios] = useState()

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
      setPortfolios(data?.portfolios.sort((a, b) => a.name + b.name))
    } catch (error) {
      console.error('Operation failed:', error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div className='bg-gradient-to-r from-[#F7F7F8] from-10% to-white flex flex-row'>
      <Navbar user={user}/>
      <div className='w-full p-14 max-h-screen overflow-y-scroll'>
        <h1 className='text-2xl text-blue-kpmgBlue font-semibold'>My Portfolios</h1>
        <hr className='border-t-2 border-t-black-custom1/15 text-black-custom1 my-2 w-full' />
        <Grid templateColumns='repeat(2, 1fr)' rowGap={8} columnGap={10} marginTop={8}>
          {portfolios && portfolios?.map((p, idx) => {
            const daysRemaining = 32

            const ksbsCompleted = 19
            const ksbsRemaining = 24

            return (
              <GridItem key={idx} w='100%'>
                <Card padding={4}>
                  <CardHeader paddingBottom={0}>
                    <div className='text-lg font-sansSemibold'>{p?.name}</div>
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
