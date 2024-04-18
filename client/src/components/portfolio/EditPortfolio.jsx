import React, { useState } from 'react'
import { Button, Box, Card, CardBody, Checkbox, CheckboxGroup, Input, Textarea, Stack, Stepper, Step, StepIndicator, StepStatus,
  StepSeparator, StepIcon, StepNumber, StepTitle, StepDescription, useSteps } from '@chakra-ui/react'
import Sidebar from '../Sidebar'

const EditPortfolio = ({ isOpen, onClose, portfolio, skills }) => {
  const [modifiedPortfolio, setModifiedPortfolio] = useState(portfolio)

  const handleChange = (key, value) => {
    setModifiedPortfolio({ ...modifiedPortfolio, [key]: value })
  }

  const steps = [
    { title: 'First', description: 'Basic Information' },
    { title: 'Second', description: 'Specification' },
  ]

  const { activeStep, setActiveStep } = useSteps({
    index: 0,
    count: steps.length,
  })

  return (
    <Sidebar
      isOpen={isOpen}
      onClose={onClose}
      size="xl"
      title={'Edit Portfolio'}
    >
      <div className='mx-20 my-10'>
        <Stepper size='md' index={activeStep}>
          {steps.map((step, index) => (
            <Step key={index}
              onClick={() => setActiveStep(index)}
            >
              <StepIndicator>
                <StepStatus
                  complete={<StepIcon />}
                  incomplete={<StepNumber />}
                  active={<StepNumber />}
                />
              </StepIndicator>

              <Box flexShrink='0'>
                <StepTitle>{step.title}</StepTitle>
                <StepDescription>{step.description}</StepDescription>
              </Box>

              <StepSeparator />
            </Step>
          ))}
        </Stepper>
      </div>
      {activeStep === 0
        ? (
          <>
            <div className='px-12 py-4 space-y-3'>
              <div className='text-lg font-sansSemibold text-black-custom1'>
            Name
              </div>
              <div className='mx-1'>
                <Input
                  size="sm"
                  value={modifiedPortfolio?.name}
                  rows={9}
                  onChange={e => handleChange('name', e.target.value)}
                  py='1rem'
                  _placeholder={{ opacity: 1, color: 'gray.500', fontSize: 14 }}
                />
              </div>
            </div>
            <div className='px-12 py-4 space-y-3'>
              <div className='text-lg font-sansSemibold text-black-custom1'>
             Description
              </div>
              <div className='mx-1'>
                <Textarea
                  size="sm"
                  value={modifiedPortfolio?.description}
                  rows={3}
                  onChange={e => handleChange('description', e.value.target)}
                />
              </div>
            </div>
            <div className='px-12 py-4 space-y-3'>
              <div className='text-lg font-sansSemibold text-black-custom1'>
             Shared With
              </div>
              <div className='mx-1'>
                <Textarea
                  size="sm"
                  value={modifiedPortfolio?.description}
                  rows={3}
                  onChange={e => handleChange('description', e.value.target)}
                />
              </div>
            </div>
          </>
        )
        : (
          <>
            <div className='px-12 py-4 space-y-3 h-2/3 overflow-y-scroll'>
              <div className='text-lg font-sansSemibold text-black-custom1'>
            Specification
              </div>
              <CheckboxGroup defaultValue={modifiedPortfolio?.specification}>
                <Stack pl={2} mt={1} spacing={1} gap={5}>
                  {skills?.map((skill, idx) => {
                    return (
                      <>
                        <Card key={idx} className='bg-gray-paleGray w-full border rounded-xl space-x-4'>
                          <CardBody className='flex flex-row space-x-5'>
                            <Checkbox
                              size='lg'
                              key={idx}
                              value={skill?.title}
                              onChange={(e) => {
                                const checked = e.target.checked
                                const updatedSkills = skills.map((s, index) => {
                                  if (idx === index) {
                                    return { ...s, checked }
                                  }
                                  return s
                                })
                                setModifiedPortfolio({ ...modifiedPortfolio, specification: updatedSkills })
                              }}
                            >
                            </Checkbox>
                            <div>
                              <div className='font-sansSemibold'>{skill?.subTitle}</div>
                              <div className='font-sans text-black-custom1/70 text-sm'>{skill?.description.substring(0, 450)}...</div>
                            </div>
                          </CardBody>
                        </Card>
                      </>
                    )
                  },
                  )}
                </Stack>
              </CheckboxGroup>
            </div>
          </>
        )}
      <div className='w-full flex flex-row justify-center my-2'>
        <Button
          size="lg"
          bgColor='#00338D'
          color='white'
          borderRadius={99}
          className='w-1/4 py-6 my-6 mx-auto'
        //   onClick={handleSubmit}
        >
                Save
        </Button>
      </div>
    </Sidebar>
  )
}

export default EditPortfolio
