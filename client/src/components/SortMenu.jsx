// SortMenu.jsx
import React, { useState } from 'react'
import { Menu, MenuButton, MenuList, MenuItem, Icon } from '@chakra-ui/react'
import { ChevronDownIcon } from '@heroicons/react/24/outline'

const menuOptions = [
  'Alphabetically (A-Z)',
  'Alphabetically (Z-A)',
  'Performance: High to low',
  'Performance: Low to high',
]

const SortMenu = ({ elements, setSortedElements }) => {
  const [selected, setSelected] = useState('')

  const handleMenuItemClick = (value) => {
    setSelected(value)

    const sortedElements = [...elements]

    switch (value) {
    case menuOptions[0]:
      setSortedElements(sortedElements.sort((a, b) => a.name.localeCompare(b.name)))
      break
    case menuOptions[1]:
      setSortedElements(sortedElements.sort((a, b) => b.name.localeCompare(a.name)))
      break
    case menuOptions[2]:
      setSortedElements(sortedElements.sort((a, b) => b.performance - a.performance))
      break
    case menuOptions[3]:
      setSortedElements(sortedElements.sort((a, b) => a.performance - b.performance))
      break
    default:
      setSortedElements(sortedElements.sort((a, b) => a.name.localeCompare(b.name)))
      break
    }
  }

  return (
    <div className='flex flex-row-reverse items-center'>
      <Menu w="full">
        <MenuButton
          px={4}
          py={2}
          transition='all 0.2s'
          borderRadius='md'
          borderWidth='1px'
          _hover={{ bg: 'gray.400' }}
          _expanded={{ bg: 'blue.400' }}
          _focus={{ boxShadow: 'outline' }}
          background="white"
          textColor={'#0D2976'}
        >
          {selected || menuOptions[0]}
          <Icon as={ChevronDownIcon} marginLeft={2} />
        </MenuButton>
        <MenuList>
          {menuOptions.map((option, idx) => (
            <MenuItem key={idx} onClick={() => handleMenuItemClick(option)}>
              {option}
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
      <div className='text-[#0D2976] mx-3'>Sort by</div>
    </div>
  )
}

export default SortMenu
