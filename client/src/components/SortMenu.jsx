import React, { useState, useEffect } from 'react'
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

const SortMenu = ({ elements, setSortedElements, menuOptions = defaultMenuOptions, setLoading }) => {
  const [selected, setSelected] = useState('')

  useEffect(() => {
    if (elements) {
      setLoading && setLoading(true)
      const sortedElements = [...elements]

      if (selected.type === 'alpha') {
        if (selected.chronological) {
          if (sortedElements[0]?.name !== undefined) setSortedElements(sortedElements.sort((a, b) => a.name.localeCompare(b.name)))
          if (sortedElements[0]?.title !== undefined) setSortedElements(sortedElements.sort((a, b) => a.title.localeCompare(b.title)))
        } else {
          if (sortedElements[0]?.name !== undefined) setSortedElements(sortedElements.sort((a, b) => b.name.localeCompare(a.name)))
          if (sortedElements[0]?.title !== undefined) setSortedElements(sortedElements.sort((a, b) => b.title.localeCompare(a.title)))
        }
      }
      if (selected.type === 'numerical') {
        if (selected.chronological) setSortedElements(sortedElements.sort((a, b) => a[selected.property] + b[selected.property]))
        else setSortedElements(sortedElements.sort((a, b) => a[selected.property] - b[selected.property]))
      }
      if (selected.type === 'date') {
        if (selected.chronological) {
          setSortedElements(sortedElements.sort((a, b) => {
            const dateA = a[selected.property] ? new Date(a[selected.property]) : null
            const dateB = b[selected.property] ? new Date(b[selected.property]) : null

            return dateB - dateA
          }))
        } else {
          setSortedElements(sortedElements.sort((a, b) => {
            const dateA = a[selected.property] ? new Date(a[selected.property]) : null
            const dateB = b[selected.property] ? new Date(b[selected.property]) : null

            return dateA - dateB
          }))
        }
      }
      setLoading && setLoading(false)
    }
  }, [selected, elements, setSortedElements])

  const handleMenuItemClick = (value) => {
    setSelected(value)
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
