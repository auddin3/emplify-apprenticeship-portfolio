import React from 'react'
import { Grid, GridItem, Card, CardHeader, CardBody, Stack, StackDivider, IconButton, useDisclosure, Textarea, useToast } from '@chakra-ui/react'
import { convertDateToString } from '../../utils'
import Disclosure from '../Disclosure'
import { PencilSquareIcon } from '@heroicons/react/24/solid'
import SideBar from '../SideBar'
import ModuleInfoCard from './ModuleInfoCard'

const EditPortfolioLog = ({ isOpen, onClose, selectedEntry, setSelectedEntry, setEntries }) => {
  const toast = useToast()

  const handleChange = (e, question) => {
    setSelectedEntry({ ...selectedEntry, [question]: e.target.value })
  }

  const handleSubmit = async () => {
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
      toast({
        title: 'Changes Unsaved',
        status: 'error',
        isClosable: true,
        duration: 9000,
        position: 'bottom-right',
      })
    } finally {
      onClose()
      toast({
        title: 'Record Updated',
        status: 'success',
        duration: 9000,
        isClosable: true,
        position: 'bottom-right',
      })
    }
  }

  return (
    <SideBar
      isOpen={isOpen}
      onClose={handleSubmit}
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
            onChange={e => handleChange(e, 'q1')}
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
            onChange={e => handleChange(e, 'q2')}
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
            onChange={e => handleChange(e, 'q3')}
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
            onChange={e => handleChange(e, 'q4')}
          />
        </div>
      </div>
    </SideBar>
  )
}

const PortfolioLogCard = ({ selectedEntry, selectedKSB, onOpen }) => {
  const creationDate = convertDateToString(selectedEntry?.dateCreated, { month: 'long', year: 'numeric' })

  const questions = [
    {
      question: '1. What was the nature of your involvement with the project?',
      answer: selectedEntry?.q1,
      subtext: [
        'What deliverables were you tasked with?',
        'Which team were you a part of during this time?',
      ],
    },
    {
      question: '2. Describe your actions and contributions.',
      answer: selectedEntry?.q2,
      subtext: [
        'What specific tasks were you assigned?',
        'What steps did you take to complete your tasks?',
      ],
    },
    {
      question: '3. What were the outcomes of your contribution?',
      answer: selectedEntry?.q3,
      subtext: [
        'How did your actions impact the project\'s success or completion?',
        'What lessons did you learn from this experience?',
      ],
    },
    {
      question: '4. Reflect on the skills gained from this experience.',
      answer: selectedEntry?.q4,
      subtext: [
        'What skills did you develop or enhance through your participation?',
        'How do you plan to apply these skills in future endeavors?',
      ],
    },
  ]

  return (
    <Card>
      <CardHeader backgroundColor="#F8F9FD" pl={8} pr={2} className="flex flex-row items-start justify-between">
        <div className="flex flex-col">
          <div className="font-sansSemibold text-black-custom1 mr-6 text-lg">{selectedKSB?.description}</div>
          <div className="font-sans text-black-custom1/80 pt-2">{creationDate}</div>
        </div>
        <IconButton
          as={PencilSquareIcon}
          h={4}
          w={4}
          variant="unstyled"
          onClick={onOpen}
          className="stroke-blue-kpmgBlue cursor-pointer"
        />
      </CardHeader>
      <CardBody p={0}>
        <Stack divider={<StackDivider />}>
          {questions.map(({ question, answer, subtext }, idx) => (
            <Disclosure
              key={idx}
              question={question}
              answer={answer}
              subtext={subtext}
            />
          ))}
        </Stack>
      </CardBody>
    </Card>
  )
}

const PortfolioEntry = ({ module, selectedEntry, setSelectedEntry, grades, selectedKSB, setEntries }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  console.log(grades)

  return (
    <>
      <Grid templateRows='repeat(4, 1fr)' templateColumns='repeat(10, 1fr)' gap={4} minHeight="screen" paddingBottom={10}>
        <GridItem colSpan={4} rowSpan={4}>
          <ModuleInfoCard module={module} performance={grades?.find(g => g.module === module.moduleId)} />
        </GridItem>
        <GridItem colSpan={6} rowSpan={4}>
          <PortfolioLogCard selectedEntry={selectedEntry} selectedKSB={selectedKSB} onOpen={onOpen} />
        </GridItem>
      </Grid>
      {isOpen && (
        <EditPortfolioLog
          isOpen={isOpen}
          onClose={onClose}
          selectedEntry={selectedEntry}
          setSelectedEntry={setSelectedEntry}
          setEntries={setEntries}
        />
      )}
    </>
  )
}

export default PortfolioEntry
