import React from 'react'
import { Box, Grid, GridItem, Card, CardHeader, CardBody, Tag, Stack, StackDivider, Checkbox, IconButton,
  Table, TableContainer, TableCaption, Thead, Tbody, Tr, Th, Td, useDisclosure, Textarea } from '@chakra-ui/react'
import { camelCaseToSpaced, convertDateToString } from '../../utils'
import PieChart from '../charts/PieChart'
import Disclosure from '../Disclosure'
import { PencilSquareIcon } from '@heroicons/react/24/solid'
import SideBar from '../SideBar'

const ModuleInfoCard = ({ module, performance }) => {
  const calculateTotal = () => {
    return performance?.grades?.reduce((total, g) => {
      const weight = module?.assessmentBreakdown?.find(a => a.title === g.activity)?.percentage ?? 0
      return total + Math.round(g.grade * weight * 100)
    }, 0)
  }

  return (
    <Card>
      <CardHeader backgroundColor={'#F8F9FD'} px={8}>
        <div className='text-blue-kpmgBlue/[80] font-sansSemibold leading-tight'>{module?.moduleId}</div>
        <div className='text-black-custom1 text-lg font-sansSemibold leading-tight mb-2'>{module?.title}</div>
        <Tag backgroundColor='rgba(75, 117, 255, 0.2)' paddingX={2.5} borderRadius={7}>
          <div className='text-blue-kpmgBlue'>{camelCaseToSpaced(module?.category)}</div>
        </Tag>
      </CardHeader>
      <CardBody p={0}>
        <Stack divider={<StackDivider />}>
          <Box className='px-8 py-4'>
            <div className='font-sansSemibold pb-2'>Learning Objectives</div>
            <ul className='list-inside pl-1.5 space-y-0.5 mb-2'>
              {module?.learningObjectives?.map((lo, idx) => (
                <li key={idx} className="flex items-center font-sans">
                  <Checkbox colorScheme='green' size="sm">
                    {lo}
                  </Checkbox>
                </li>
              ))}
            </ul>
          </Box>
          <Box className='px-8 py-4'>
            <div className='font-sansSemibold pb-2'>Assessment Breakdown</div>
            {module?.assessmentBreakdown && <PieChart data={module?.assessmentBreakdown}/>}
            <TableContainer className='mt-8'>
              <Table variant='simple' size='sm'>
                <TableCaption>Results for {module?.title}</TableCaption>
                <Thead>
                  <Tr>
                    <Th>Activity</Th>
                    <Th>Weight(%)</Th>
                    <Th>Grade</Th>
                    <Th>Total(%)</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {performance?.grades?.map((g, idx) => {
                    const weight = module?.assessmentBreakdown?.find(a => a.title === g.activity).percentage

                    return (
                      <Tr key={idx}>
                        <Td noOfLines={4} style={{ maxWidth: '7rem', wordWrap: 'break-word', whiteSpace: 'initial' }}>
                          {g.activity}
                        </Td>
                        <Td>
                          <div className='w-fit mx-auto'>{weight * 100}</div>
                        </Td>
                        <Td>
                          <div className='w-fit mx-auto'>{Math.round(g?.grade * 100)}</div>
                        </Td>
                        <Td>
                          <div className='w-fit mx-auto'>{Math.round(g.grade * weight * 100)}</div>
                        </Td>
                      </Tr>
                    )
                  })}
                  <Tr>
                    <Td colSpan={3}></Td>
                    <Td>
                      <div className='w-fit mx-auto font-sansSemibold text-lg'>{calculateTotal()}</div>
                    </Td>
                  </Tr>
                </Tbody>
              </Table>
            </TableContainer>
          </Box>
        </Stack>
      </CardBody>
    </Card>
  )
}

const EditPortfolioLog = ({ isOpen, onClose, selectedEntry, setSelectedEntry, setEntries }) => {
  const handleClick = (e, question) => {
    setSelectedEntry({ ...selectedEntry, [question]: e.target.value })
  }

  const handleClose = async () => {
    const apiUrl = `http://localhost:5001/portfolioEntry/${selectedEntry._id}`

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(selectedEntry),
      })

      if (!response.ok) {
        const errorData = await response.json()
        console.error('Operation failed:', errorData)
      }

      const data = await response.json()
      setEntries(data)
    } catch (error) {
      console.error('Operation failed:', error)
    } finally {
      onClose()
      // setLoading(false)
    }
  }

  return (
    <SideBar
      isOpen={isOpen}
      onClose={handleClose}
      size="xl"
      title={'Modify Portfolio Entry'}
    >
      <div className='px-12 py-4 space-y-3'>
        <div className='text-lg font-sansSemibold text-black-custom1'>
           1. What was the nature of your involvement with the project?
        </div>
        <ul className='list-disc list-inside pl-6 pb-3'>
          <li className='text-sm italic font-sans text-black-custom1'>
            What deliverables were you tasked with?
          </li>
          <li className='text-sm italic font-sans text-black-custom1'>
            Which team were you apart of during this time
          </li>
        </ul>
        <div className='mx-1'>
          <Textarea
            size="sm"
            value={selectedEntry?.q1}
            rows={9}
            onChange={e => handleClick(e, 'q1')}
          />
        </div>
      </div>
      <div className='px-12 py-4 space-y-3'>
        <div className='text-lg font-sansSemibold text-black-custom1'>
           2. Describe your actions and contributions.
        </div>
        <ul className='list-disc list-inside pl-6 pb-3'>
          <li className='text-sm italic font-sans text-black-custom1'>
            What specific tasks were you assigned?
          </li>
          <li className='text-sm italic font-sans text-black-custom1'>
            What steps did you take to complete your tasks?
          </li>
        </ul>
        <div className='mx-1'>
          <Textarea
            size="sm"
            value={selectedEntry?.q2}
            rows={9}
            onChange={e => handleClick(e, 'q2')}
          />
        </div>
      </div>
      <div className='px-12 py-4 space-y-3'>
        <div className='text-lg font-sansSemibold text-black-custom1'>
          3. What were the outcomes of your contribution?
        </div>
        <ul className='list-disc list-inside pl-6 pb-3'>
          <li className='text-sm italic font-sans text-black-custom1'>
            How did your actions impact the project&apos;s success or completion?
          </li>
          <li className='text-sm italic font-sans text-black-custom1'>
            What lessons did you learn from this experience?
          </li>
        </ul>
        <div className='mx-1'>
          <Textarea
            size="sm"
            value={selectedEntry?.q3}
            rows={9}
            onChange={e => handleClick(e, 'q3')}
          />
        </div>
      </div>
      <div className='px-12 py-4 space-y-3'>
        <div className='text-lg font-sansSemibold text-black-custom1'>
          4. Reflect on the skills gained from this experience.
        </div>
        <ul className='list-disc list-inside pl-6 pb-3'>
          <li className='text-sm italic font-sans text-black-custom1'>
            What skills did you develop or enhance through your participation?
          </li>
          <li className='text-sm italic font-sans text-black-custom1'>
            How do you plan to apply these skills in future endeavors?
          </li>
        </ul>
        <div className='mx-1'>
          <Textarea
            size="sm"
            value={selectedEntry?.q4}
            rows={9}
            onChange={e => handleClick(e, 'q4')}
          />
        </div>
      </div>
    </SideBar>
  )
}

const PortfolioLogCard = ({ selectedEntry, selectedKSB, onOpen }) => {
  const creationDate = convertDateToString(selectedEntry?.dateCreated, { month: 'long', year: 'numeric' })
  return (
    <Card>
      <CardHeader backgroundColor={'#F8F9FD'} pl={8} pr={2} className='flex flex-row items-start justify-between'>
        <div className='flex flex-col'>
          <div className='font-sansSemibold text-black-custom1 mr-6'>{selectedKSB?.description}</div>
          <div className='font-sans text-black-custom1/70 text-sm italic pt-2'>{creationDate}</div>
        </div>
        <IconButton
          as={PencilSquareIcon}
          h={4}
          w={4}
          variant="unstyled"
          onClick={onOpen}
          className='stroke-black-custom1/70 cursor-pointer'
        />
      </CardHeader>
      <CardBody p={0}>
        <Stack divider={<StackDivider />}>
          <Disclosure
            question="1. What was the nature of your involvement with the project?"
            answer={selectedEntry?.q1}
            subtext={[
              'What deliverables were you tasked with?',
              'Which team were you apart of during this time?',
            ]}
          />
          <Disclosure
            question="2. Describe your actions and contributions."
            answer={selectedEntry?.q2}
            subtext={[
              'What specific tasks were you assigned?',
              'What steps did you take to complete your tasks?',
            ]}
          />
          <Disclosure
            question="3. What were the outcomes of your contribution?"
            answer={selectedEntry?.q3}
            subtext={[
              'How did your actions impact the project\'s success or completion?',
              'What lessons did you learn from this experience?',
            ]}
          />
          <Disclosure
            question="4. Reflect on the skills gained from this experience."
            answer={selectedEntry?.q4}
            subtext={[
              'What skills did you develop or enhance through your participation?',
              'How do you plan to apply these skills in future endeavors?',
            ]}
          />
        </Stack>
      </CardBody>
    </Card>
  )
}

const PortfolioEntry = ({ module, selectedEntry, setSelectedEntry, grades, selectedKSB, setEntries }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Grid
        templateRows='repeat(4, 1fr)'
        templateColumns='repeat(10, 1fr)'
        gap={4}
        minHeight="screen"
      >
        <GridItem colSpan={4} rowSpan={3}>
          <ModuleInfoCard
            module={module}
            performance={grades?.find(g => g.module === module.moduleId)}
          />
        </GridItem>
        <GridItem colSpan={6} rowSpan={4}>
          <PortfolioLogCard
            selectedEntry={selectedEntry}
            selectedKSB={selectedKSB}
            onOpen={onOpen}
          />
        </GridItem>
      </Grid>
      {
        isOpen && (
          <EditPortfolioLog
            isOpen={isOpen}
            onClose={onClose}
            selectedEntry={selectedEntry}
            setSelectedEntry={setSelectedEntry}
            setEntries={setEntries}
          />)
      }
    </>
  )
}

export default PortfolioEntry
