import React from 'react'
import { Card, CardHeader, CardBody, IconButton, Icon, Stack, StackDivider } from '@chakra-ui/react'
import { ArrowPathIcon } from '@heroicons/react/24/outline'
import { FolderOpenIcon, DocumentChartBarIcon, DocumentIcon, PresentationChartBarIcon } from '@heroicons/react/24/solid'

const EvidenceList = ({ openFile, fileList, selectedKSB }) => {
  const renderFileList = (files) => {
    return (
      <Stack divider={<StackDivider />}>
        {files?.map((file, index) => (
          <div key={index} className='px-3'>
            {file.isDirectory
              ? (
                <div className='flex flex-row space-x-3'>
                  <Icon as={FolderOpenIcon} />
                  <div>
                    {file.name}
                    {renderFileList(file.files)}
                  </div>
                </div>
              )
              : (
                <div className='flex flex-row space-x-3 items-center'>
                  {['pdf', 'xlsx'].includes(file.name.split('.')[1]) && <Icon as={DocumentChartBarIcon} color="#333D49"/>}
                  {['docx', 'doc'].includes(file.name.split('.')[1]) && <Icon as={DocumentIcon} color="#333D49"/>}
                  {['pptx', 'ppt'].includes(file.name.split('.')[1]) && <Icon as={PresentationChartBarIcon} color="#333D49"/>}
                  <div>{file.name.split('.')[0]}</div>
                </div>
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
