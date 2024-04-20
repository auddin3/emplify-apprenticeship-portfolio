import React from 'react'
import { Card, CardHeader, CardBody, IconButton, Stack, StackDivider } from '@chakra-ui/react'
import { ArrowPathIcon } from '@heroicons/react/24/outline'

const EvidenceList = ({ openFile, fileList, selectedKSB }) => {
  const renderFileList = (files) => {
    return (
      <Stack divider={<StackDivider />}>
        {files?.map((file, index) => (
          <div key={index}>
            {file.isDirectory
              ? (
                <div>
                  {file.name}
                  {renderFileList(file.files)}
                </div>
              )
              : (
                <div>{file.name}</div>
              )}
          </div>
        ))}
      </Stack>
    )
  }

  return (
    <Card>
      <CardHeader backgroundColor={'#F8F9FD'} px={8} className='flex flex-row justify-between'>
        <div className='text-black-custom1 text-lg font-sansSemibold leading-tight mb-2'>Evidence</div>
        <IconButton
          as={ArrowPathIcon}
          variant="unstyled"
          size="xs"
          aria-label='Refresh'
          className='cursor-pointer stroke-blue-lightBlue'
          fontSize='20px'
          onClick={openFile}
        />
      </CardHeader>
      <CardBody>
        {renderFileList(fileList?.find(f => f.name === selectedKSB)?.files)}
      </CardBody>
    </Card>
  )
}

export default EvidenceList
