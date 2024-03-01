import React, { useState } from 'react'
import { Menu, MenuButton, MenuList, MenuItem, Icon } from '@chakra-ui/react'
import { ChevronDownIcon } from '@heroicons/react/24/outline'

const defaultMenuOptions = [
  {
    type: 'alpha',
    name: 'Alphabetically (A-Z)',
    chronological: true,
  },
  {
    type: 'alpha',
    name: 'Alphabetically (Z-A)',
    chronological: false,
  },
]

const SortMenu = ({ elements, setSortedElements, menuOptions = defaultMenuOptions }) => {
  const [selected, setSelected] = useState('')

  const handleMenuItemClick = (value) => {
    setSelected(value)

    const sortedElements = [...elements]

    if (value.type === 'alpha') {
      if (value.chronological) {
        if (sortedElements[0]?.name !== undefined) setSortedElements(sortedElements.sort((a, b) => a.name.localeCompare(b.name)))
        if (sortedElements[0]?.title !== undefined) setSortedElements(sortedElements.sort((a, b) => a.title.localeCompare(b.title)))
      } else {
        if (sortedElements[0]?.name !== undefined) setSortedElements(sortedElements.sort((a, b) => b.name.localeCompare(a.name)))
        if (sortedElements[0]?.title !== undefined) setSortedElements(sortedElements.sort((a, b) => b.title.localeCompare(a.title)))
      }
    }
    if (value.type === 'numerical') {
      if (value.chronological) setSortedElements(sortedElements.sort((a, b) => b[value.property] - a[value.property]))
      else setSortedElements(sortedElements.sort((a, b) => a[value.property] - b[value.property]))
    }
    if (value.type === 'date') {
      if (value.chronological) {
        setSortedElements(sortedElements.sort((a, b) => {
          const dateA = a[value.property] ? new Date(a[value.property]) : null
          const dateB = b[value.property] ? new Date(b[value.property]) : null

          return dateB - dateA
        }))
      } else {
        setSortedElements(sortedElements.sort((a, b) => {
          const dateA = a[value.property] ? new Date(a[value.property]) : null
          const dateB = b[value.property] ? new Date(b[value.property]) : null

          return dateA - dateB
        }))
      }
    }
  }

  return (
    <div className='flex flex-row-reverse items-center my-4'>
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
          { selected ? selected.name : menuOptions[0].name }
          <Icon as={ChevronDownIcon} marginLeft={2} />
        </MenuButton>
        <MenuList>
          {menuOptions.map((option, idx) => (
            <MenuItem key={idx} onClick={() => handleMenuItemClick(option)}>
              {option.name}
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
      <div className='text-[#0D2976] mx-3'>Sort by</div>
    </div>
  )
}

export default SortMenu
