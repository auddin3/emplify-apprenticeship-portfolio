import React from 'react'
import { Drawer, DrawerHeader, DrawerOverlay, DrawerContent, DrawerCloseButton, Box } from '@chakra-ui/react'

const Sidebar = ({ isOpen, onClose, size = 'sm', title = '', children }) => {
  return (
    <Drawer placement='right' isOpen={isOpen} onClose={onClose} size={size}>
      <DrawerOverlay />
      <DrawerContent className='rounded-l-3xl py-4'>
        <DrawerHeader className='relative space-y-2'>
          <DrawerCloseButton className='w-full text-black-custom1/60' />
          <div className='font-sansSemibold text-blue-kpmgBlue text-[22px] py-1.5 ml-2'>
            {title}
          </div>
          <hr className='border-t border-t-black-custom1/20 text-black-custom1 w-full absolute left-0 right-0' />
        </DrawerHeader>
        <Box overflowY="auto">
          {children}
        </Box>
      </DrawerContent>
    </Drawer>
  )
}

export default Sidebar
