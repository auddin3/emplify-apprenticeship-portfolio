import React from 'react'
import { Icon, Box } from '@chakra-ui/react'
import { LightBulbIcon, ClockIcon } from '@heroicons/react/24/outline'

export const RemainingIcon = () => (
  <Box display="inline-flex" alignItems="center" justifyContent="center" borderRadius="full" p="2" width="30px" height="30px" className='bg-white'>
    <Icon as={LightBulbIcon} color="#C6007E" w={4} h={4} strokeWidth={2} />
  </Box>
)

export const TimeIcon = () => (
  <Box display="inline-flex" alignItems="center" justifyContent="center" borderRadius="full" p="2" width="30px" height="30px" className='bg-white'>
    <Icon as={ClockIcon} color="#0091DA" w={5} h={5} strokeWidth={2} />
  </Box>
)
