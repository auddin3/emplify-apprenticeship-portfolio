import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar'
import { useLocation } from 'react-router-dom'
import { Spinner } from '@chakra-ui/react'
import PortfolioCompact from './PortfolioCompact'
import PortfolioExpanded from './PortfolioExpanded'

const Portfolio = () => {
  const location = useLocation()
  const portfolio = location?.state?.portfolio
  // const canEdit = location?.state?.edit
  const [loading, setLoading] = useState(true)

  const [criterion, setCriterion] = useState()
  const [entries, setEntries] = useState()
  const [sortedCriterion, setSortedCriterion] = useState()
  const [selectedKSB, setSelectedKSB] = useState()

  const fetchData = async () => {
    setLoading(true)
    const apiUrl = `http://localhost:5001/portfolio/${portfolio._id}`

    try {
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      })

      if (!response.ok) {
        const errorData = await response.json()
        console.error('Operation failed:', errorData)
      }

      const data = await response.json()
      setCriterion(data?.specification)
      setEntries(data?.entries)
    } catch (error) {
      console.error('Operation failed:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    criterion && setSortedCriterion(criterion?.sort((a, b) => a.title.localeCompare(b.title)))
  }, [criterion])

  useEffect(() => {
    entries && setEntries(entries)
  }, [entries])

  console.log(selectedKSB)
  return (
    <div className='bg-gradient-to-r from-[#F7F7F8] from-10% to-white flex flex-row'>
      <Navbar />
      {loading
        ? <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
          <Spinner
            thickness='4px'
            speed='0.65s'
            emptyColor='gray.200'
            color='blue.500'
            size='xl'
          />
        </div>
        : selectedKSB
          ? <PortfolioExpanded
            setLoading={setLoading}
            selectedKSB={selectedKSB}
            setSelectedKSB = {setSelectedKSB}
            entries={entries.filter(e => e.skill === selectedKSB.title)}
          />
          : <PortfolioCompact
            sortedCriterion={sortedCriterion}
            setSortedCriterion={setSortedCriterion}
            entries={entries}
            portfolio={portfolio}
            setLoading = {setLoading}
            setSelectedKSB = {setSelectedKSB}
          />
      }
    </div>
  )
}

export default Portfolio
