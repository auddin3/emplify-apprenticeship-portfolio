import React from 'react'
import { Card, CardHeader, CardBody, Stack, StackDivider } from '@chakra-ui/react'

const UploadEvidence = () => {
  return (
    <Card>
      <CardHeader backgroundColor={'#F8F9FD'} px={8}>
        <div className='text-black-custom1 text-lg font-sansSemibold leading-tight mb-2'>
         Evidence
        </div>
      </CardHeader>
      <CardBody>
        <Stack divider={<StackDivider />}>
        </Stack>
      </CardBody>
    </Card>
  )
}

export default UploadEvidence
