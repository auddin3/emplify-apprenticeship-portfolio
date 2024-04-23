import React, { useState } from 'react'
import { Icon,
  Input,
  InputGroup,
  InputLeftElement } from '@chakra-ui/react'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'

const Searchbar = ({ elements, setElements, initialElements, searchKeys, setLoading }) => {
  const [searchTerm, setSearchTerm] = useState('')

  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm)
    setLoading && setLoading(true)

    if (elements) {
      setElements((prevElements) => {
        const sortedElements = [...initialElements].sort((a, b) => a.title.localeCompare(b.title))

        const filteredElements = searchTerm.trim().length < 1
          ? initialElements
          : sortedElements.filter(el =>
            searchKeys.some(k => el[k].toLowerCase().includes(searchTerm.toLowerCase())),
          )

        setLoading && setLoading(false)
        return filteredElements
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

export default Searchbar
