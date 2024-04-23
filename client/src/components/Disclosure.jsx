import React from 'react'
import { Box, useDisclosure, IconButton, Collapse } from '@chakra-ui/react'
import { ChevronRightIcon } from '@heroicons/react/24/solid'

const Disclosure = ({ question, answer, subtext }) => {
  const { isOpen, onToggle } = useDisclosure()

  return (
    <Box className='px-3 py-2'>
      <div className='flex flex-row items-center space-x-4'>
        <IconButton
          as={ChevronRightIcon}
          onClick={onToggle}
          variant="unstyled"
          className={`transform ${isOpen ? 'rotate-90' : ''}`}
          h={5} w={5}
          color="#A9A9A9"
        />
        <div className='text-lg font-sansBold text-black-custom1'>{question}</div>
      </div>
      <ul className='list-disc list-inside pl-20'>
        {subtext?.map((s, idx) => (
          <li key={idx} className='text-sm italic font-sans text-black-custom1'>
            {s}
          </li>
        ))}
      </ul>
      <Collapse in={isOpen} animateOpacity>
        <Box px={14} py={5}>
          <div className='text-justify font-sans text-black-custom1'>{answer}</div>
        </Box>
      </Collapse>
    </Box>
  )
}

export default Disclosure
