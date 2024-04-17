import React from 'react'
import { Icon } from '@chakra-ui/react'

const StatCard = ({ title, icon, stat, colour }) => {
  return (
    <div style={{ backgroundColor: colour }} className={'rounded-lg p-4 flex flex-col flex-1 space-y-6'}>
      <div className='flex flex-row justify-between'>
        <Icon as={icon} color="white" h={9} w={9} />
        <div className="text-white text-2xl font-sansSemibold">{stat}</div>
      </div>
      <div className='text-white text-lg font-sansSemibold'>{title}</div>
    </div>
  )
}

export default StatCard
