import React, { useState, useEffect } from 'react'
import useAuthUser from 'react-auth-kit/hooks/useAuthUser'
import Navbar from '../components/Navbar'
import { useNavigate } from 'react-router-dom'
import { Button, Card, CardBody, CardHeader, CardFooter, CircularProgress, Grid, GridItem, Icon, SimpleGrid, Spinner, Tag,
  TagLabel, Avatar } from '@chakra-ui/react'
import { ShieldCheckIcon } from '@heroicons/react/24/solid'
import { Cog8ToothIcon } from '@heroicons/react/24/outline'

const colorScheme = ['#0091DA', '#C6007E', '#007E7D']

const Dashboard = () => {
  const auth = useAuthUser()
  const user = auth?.user
  const navigate = useNavigate()

  const [portfolios, setPortfolios] = useState()
  const [skills, setSkills] = useState()
  const [loading, setLoading] = useState(true)

  const fetchData = async () => {
    setLoading(true)
    const apiUrl = `http://localhost:5001/dashboard/${user.uid}`

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
      setPortfolios(data?.portfolios.sort((a, b) => a.performance + b.performance))
      setSkills(data?.skills)
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
    <div className='bg-gray-paleGray flex flex-row max-h-screen'>
      <Navbar />
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
        : <>
          <Grid
            templateRows='repeat(2, 1fr)'
            templateColumns='repeat(10, 1fr)'
            gap={4}
            h="screen"
            padding={6}
          >
            <GridItem colSpan={7} rowSpan={1}>
              <Card className='px-2 rounded-full' size='md' h="full">
                <CardHeader paddingBottom='8px'>
                  <div className='font-sansSemibold text-blue-kpmgBlue text-xl'>Performance Analysis</div>
                  <div className='pt-4'>The top performing portfolio is <strong> {portfolios ? portfolios[0]?.name : ''}.</strong></div>
                </CardHeader>
                <CardBody>
                  <SimpleGrid spacing={10} templateColumns='repeat(auto-fill, minmax(200px, 1fr))'>
                    {portfolios && portfolios?.map((p, idx) => (
                      <Card key={idx}>
                        <CardBody className='flex flex-col justify-items-center max-h-48' paddingBottom='15px'>
                          <CircularProgress aria-label={`${p?.name}-progress`} thickness='10px' size='110px' color={colorScheme[idx]} value={p?.performance * 100} className='mx-auto' />
                          <div className={' text-2xl text-center mt-4 font-sansBold'} style= {{ color: colorScheme[idx] }}>{p?.performance * 100}%</div>
                        </CardBody>
                        <CardFooter paddingTop='0px'>
                          <div className='text-sm font-sansBold mx-auto text-center'>{p?.name}</div>
                        </CardFooter>
                      </Card>
                    ))}
                  </SimpleGrid>
                </CardBody>
              </Card>
            </GridItem >
            <GridItem colSpan={3} rowSpan={1}>
              <Card className='rounded-full' size='lg' h="full">
                <CardHeader>
                  <div className='text-right text-[#A8A8A8] cursor-pointer'>
                    <Icon as={Cog8ToothIcon} h={6} w={6} onClick={() => navigate('/profile')}/>
                  </div>
                </CardHeader>
                <CardBody paddingTop={1} >
                  <div className='text-center'>
                    <Avatar name={user?.name} fontWeight={600} h={150} w={150} size="2xl"/>
                  </div>
                </CardBody>
                <CardFooter className='flex flex-col items-center space-y-1' paddingTop={0} paddingBottom={10}>
                  <h1 className='text-3xl text-center font-sansSemibold pt-8'>{user?.name}</h1>
                  <div className='w-full text-center mx-10 mb-4 text-[#696969]'>{user?.school}</div>
                </CardFooter>
              </Card>
            </GridItem>
            <GridItem colSpan={7} rowSpan={1}>
              <Card className='px-2 rounded-full' size='lg' h="full">
                <CardHeader paddingBottom='8px'>
                  <div className='font-sansSemibold text-blue-kpmgBlue text-xl'>Skills Distribution</div>
                </CardHeader>
                <CardBody>
                  <SimpleGrid spacing={8} templateColumns='repeat(2, minmax(200px, 1fr))'>
                    <Card backgroundColor={colorScheme[2]}>
                      <CardHeader paddingBottom={0}>
                        <div className='text-white font-sansSemibold text-lg'>Top Areas</div>
                      </CardHeader>
                      <CardBody className='max-h-40 overflow-y-scroll'>
                        {skills && skills?.slice(0, 3)?.map((s, idx) => (
                          <Tag key={idx} size="lg" borderRadius="full" backgroundColor="white" marginRight={2} marginY={1}>
                            <TagLabel className='text-blue-kpmgBlue font-sansSemibold text-sm px-2 py-1.5'>{s?.subTitle}</TagLabel>
                          </Tag>
                        ))}
                      </CardBody>
                    </Card>

                    <Card backgroundColor={colorScheme[1]}>
                      <CardHeader paddingBottom={0}>
                        <div className='text-white font-sansSemibold text-lg'>Areas For Improvement</div>
                      </CardHeader>
                      <CardBody className='max-h-40 overflow-y-scroll'>
                        <div>
                          {skills && skills?.slice(-3)?.map((s, idx) => (
                            <Tag key={idx} size="lg" borderRadius="full" backgroundColor="white" marginRight={2} marginY={1}>
                              <TagLabel className='text-blue-kpmgBlue font-sansSemibold text-sm px-2 py-1.5'>{s?.subTitle}</TagLabel>
                            </Tag>
                          ))}
                        </div>
                      </CardBody>
                    </Card>
                  </SimpleGrid>
                </CardBody>
              </Card>
            </GridItem>
            <GridItem colSpan={3} rowSpan={1}>
              <Card className='px-2 rounded-full' size='lg' h="full">
                <CardHeader paddingBottom='8px'>
                  <div className='font-sansSemibold text-blue-kpmgBlue text-xl text-center'>Latest Portfolios</div>
                </CardHeader>
                <CardBody marginX={5} marginY={0}>
                  <ul className='space-y-8'>
                    {portfolios && portfolios?.map((p, idx) => (
                      <li key={idx} className='flex flex-row space-x-8 items-center cursor-pointer' onClick={() => navigate(`/portfolios/${p._id}`, { state: { portfolio: p, edit: p.owner === user.uid } })}>
                        <Icon as={ShieldCheckIcon} color='#0091DA' h={8} w={8}/>
                        <div className='font-sansSemibold text-lg leading-tight'>{p?.name}</div>
                      </li>
                    ))}
                  </ul>
                </CardBody>
                <CardFooter paddingTop={0}>
                  <Button size="md" bgColor='#00338D' color='white' borderRadius={99} w="full" onClick={() => navigate('/portfolios')}>
                    View all
                  </Button>
                </CardFooter>
              </Card>
            </GridItem>
          </Grid>
        </>
      }

    </div>
  )
}

export default Dashboard
