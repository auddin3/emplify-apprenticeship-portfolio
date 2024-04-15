import React from 'react'
import { Box, useDisclosure, IconButton, Collapse } from '@chakra-ui/react'
import { ChevronRightIcon } from '@heroicons/react/24/solid'

const Disclosure = ({ question, answer }) => {
  const { isOpen, onToggle } = useDisclosure()

  return (
    <Box className='px-8 py-4'>
      <div className='flex flex-row items-center space-x-4'>
        <IconButton
          as={ChevronRightIcon}
          onClick={onToggle}
          variant="unstyled"
          className={`transform ${isOpen ? 'rotate-90' : ''}`}
          h={5} w={5}
        />
        <div className='text-lg font-sansSemibold'>{question}</div>
      </div>
      <ul className='list-disc list-inside pl-20'>
        <li className='text-sm italic font-sans'>
            What deliverable were you tasked with?
        </li>
      </ul>

      <Collapse in={isOpen} animateOpacity>
        <Box px={14} py={5}>
          <div>{answer}</div>
        </Box>
      </Collapse>
    </Box>
  )
}

export default Disclosure
