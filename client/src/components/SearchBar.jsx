import React, { useState } from 'react'
import { Icon,
  Input,
  InputGroup,
  InputLeftElement } from '@chakra-ui/react'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'

const SearchBar = ({ elements, setElements, initialElements, searchKeys }) => {
  const [searchTerm, setSearchTerm] = useState('')

  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm)

    if (elements) {
      setElements((prevElements) => {
        const sortedElements = [...prevElements].sort((a, b) => a.title.localeCompare(b.title))

        if (!searchTerm || searchTerm.trim().length < 3) return initialElements
        else {
          return sortedElements.filter(el =>
            searchKeys.some(k => el[k].toLowerCase().includes(searchTerm.toLowerCase())),
          )
        }
      })
    }
  }

  return (
    <>
      <InputGroup borderRadius={5} size="lg">
        <InputLeftElement
          pointerEvents="none"
          stroke="16px"
          marginRight={2}
          paddingLeft={5}
        >
          <Icon as={MagnifyingGlassIcon} color="#00338D" className='stroke-[3px] mt-2.5' h={5} w={5} />
        </InputLeftElement>
        <Input
          type="text"
          size="lg"
          placeholder="Search by Modules / Subjects ..."
          _placeholder={{ fontSize: 20 }}
          background="white"
          py='1.75rem'
          marginX={2}
          value={searchTerm}
          onChange={e => handleSearch(e.target.value)}
        />
      </InputGroup>
    </>
  )
}

export default SearchBar
