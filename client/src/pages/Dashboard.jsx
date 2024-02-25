import React from 'react'
import useAuthUser from 'react-auth-kit/hooks/useAuthUser'
import Navbar from '../components/Navbar'
import { useNavigate } from 'react-router-dom'
import { Button, Card, CardBody, CardHeader, CardFooter, CircularProgress, Icon, SimpleGrid, Tag, TagLabel, Avatar } from '@chakra-ui/react'
import { ShieldCheckIcon } from '@heroicons/react/24/solid'

const portfolios = [
  {
    name: 'BSC Digital and Technology Solutions',
    performance: 0.9,
  },
  {
    name: 'BSC Business and Accounting',
    performance: 0.65,
  },
  {
    name: 'MLA Law and Economics',
    performance: 0.35,
  },
]

const skills = [
  'Big Data Programming', 'Semi-structured Data Engineering', 'Procedural Programming', 'Web Programming',
]

const colorScheme = ['#0091DA', '#C6007E', '#00A3A1']

const Dashboard = () => {
  const auth = useAuthUser()
  const user = { name: auth.name, email: auth.email }
  const navigate = useNavigate()

  return (
    <div className='bg-gradient-to-r from-[#F7F7F8] from-10% to-white flex flex-row'>
      <Navbar user={user}/>
      <div className='flex flex-col w-9/12 space-y-5 m-5'>
        <Card className='px-2 rounded-full' size='lg'>
          <CardHeader paddingBottom='8px'>
            <div className='font-sansSemibold text-blue-kpmgBlue text-xl'>Performance Analysis</div>
            <div className='pt-4'>The top performing portfolio is <strong>{portfolios[0]?.name}.</strong></div>
          </CardHeader>
          <CardBody>
            <SimpleGrid spacing={10} templateColumns='repeat(auto-fill, minmax(200px, 1fr))'>
              {portfolios.map((p, idx) => (
                <Card key={idx}>
                  <CardBody className='flex flex-col justify-items-center' paddingBottom='15px'>
                    <CircularProgress thickness='10px' size='110px' color={colorScheme[idx]} value={p?.performance * 100} className='mx-auto' />
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
        <Card className='px-2 rounded-full' size='md'>
          <CardHeader paddingBottom='8px'>
            <div className='font-sansSemibold text-blue-kpmgBlue text-xl'>Skills Distribution</div>
          </CardHeader>
          <CardBody>
            <SimpleGrid spacing={8} templateColumns='repeat(2, minmax(200px, 1fr))'>
              <Card backgroundColor={colorScheme[2]}>
                <CardHeader paddingBottom={0}>
                  <div className='text-white font-sansSemibold text-lg'>Top Areas</div>
                </CardHeader>
                <CardBody>
                  <div className='space-y-3'>
                    {skills.map((skill, idx) => (
                      <Tag key={idx} size="lg" borderRadius="full" backgroundColor="white" marginRight={2}>
                        <TagLabel className='text-blue-kpmgBlue font-sansSemibold text-sm px-2 py-1.5'>{skill}</TagLabel>
                      </Tag>
                    ))}
                  </div>
                </CardBody>
              </Card>

              <Card backgroundColor={colorScheme[1]}>
                <CardHeader paddingBottom={0}>
                  <div className='text-white font-sansSemibold text-lg'>Areas For Improvement</div>
                </CardHeader>
                <CardBody>
                  <div className='space-y-3'>
                    {skills.map((skill, idx) => (
                      <Tag key={idx} size="lg" borderRadius="full" backgroundColor="white" marginRight={2}>
                        <TagLabel className='text-blue-kpmgBlue font-sansSemibold text-sm px-2 py-1.5'>{skill}</TagLabel>
                      </Tag>
                    ))}
                  </div>
                </CardBody>
              </Card>
            </SimpleGrid>
          </CardBody>
        </Card>
      </div>
      <div className='flex flex-col w-auto space-y-5 m-5'>
        <Card className='px-2 rounded-full' size='md'>
          <CardBody>
            <div className='text-center'>
              <Avatar name={user?.name} size='2xl' fontWeight={600} />
            </div>
            <div className='text-3xl text-center font-sansSemibold pt-8'>{user?.name}</div>
          </CardBody>
          <CardFooter>
            <div className='w-full text-center mx-10 mb-4'>Queen Mary&apos;s University of London</div>
          </CardFooter>
        </Card>
        <Card className='px-2 rounded-full' size='lg'>
          <CardHeader paddingBottom='8px'>
            <div className='font-sansSemibold text-blue-kpmgBlue text-xl text-center'>Latest Portfolios</div>
          </CardHeader>
          <CardBody marginX={5}>
            <ul className='space-y-5'>
              {portfolios.map((p, idx) => (
                <li key={idx} className='flex flex-row space-x-8 items-center'>
                  <Icon as={ShieldCheckIcon} color='#0091DA' h={5} w={5}/>
                  <div className='font-sansSemibold'>{p?.name}</div>
                </li>
              ))}
            </ul>
          </CardBody>
          <CardFooter>
            <Button size="md" bgColor='#00338D' color='white' borderRadius={99} w="full" onClick={() => navigate('/portfolios')}>View all</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

export default Dashboard
