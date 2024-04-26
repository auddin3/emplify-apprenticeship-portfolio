import React, { useState } from 'react'
import { Icon,
  Input,
  InputGroup,
  InputLeftElement } from '@chakra-ui/react'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { handleSearch } from '../utils'

const Searchbar = ({ elements, setElements, initialElements, searchKeys, setLoading }) => {
  const [searchTerm, setSearchTerm] = useState('')

  const handleChange = (searchTerm) => {
    setLoading(true)
    setSearchTerm(searchTerm)
    const filteredElements = handleSearch({ searchTerm, elements, initialElements, searchKeys })
    setElements(filteredElements)
    setLoading(false)
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
          onChange={e => handleChange(e.target.value)}
        />
      </InputGroup>
    </>
  )
}

export default Searchbar
