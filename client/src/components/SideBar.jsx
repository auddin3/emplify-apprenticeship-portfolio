import React from 'react'
import { Drawer,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton } from '@chakra-ui/react'

const SideBar = ({ isOpen, onClose, size = 'sm', title = 'undefined', children }) => {
  return (
    <Drawer
      placement='right'
      isOpen={isOpen}
      onClose={onClose}
      size={size}
    >
      <DrawerOverlay />
      <DrawerContent className='rounded-l-3xl py-4'>
        <DrawerHeader className='relative space-y-2'>
          <DrawerCloseButton className='w-full text-black-custom1/60 '/>
          <div className='font-sansSemibold text-blue-kpmgBlue text-[22px] py-1.5 ml-2'>
            {title}
          </div>
          <hr className='border-t border-t-black-custom1/15 text-black-custom1 w-full absolute left-0 right-0' />
        </DrawerHeader>
        {children}
      </DrawerContent>
    </Drawer>
  )
}

export default SideBar
