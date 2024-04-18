import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar'
import { useLocation } from 'react-router-dom'
import { Spinner } from '@chakra-ui/react'
import PortfolioCompact from './PortfolioCompact'
import PortfolioExpanded from './PortfolioExpanded'
import useAuthUser from 'react-auth-kit/hooks/useAuthUser'

const Portfolio = () => {
  const location = useLocation()
  const [portfolio, setPortfolio] = useState(location?.state?.portfolio)
  const auth = useAuthUser()
  const user = auth?.user
  const [loading, setLoading] = useState(true)
  const [criterion, setCriterion] = useState()
  const [entries, setEntries] = useState()
  const [sortedCriterion, setSortedCriterion] = useState()
  const [selectedKSB, setSelectedKSB] = useState()
  const [userGrades, setUserGrades] = useState()
  const canEdit = portfolio?.owner === user.uid

  const fetchData = async () => {
    setLoading(true)
    const portfolioApiUrl = `http://localhost:5001/portfolio/${portfolio._id}`
    const gradesApiUrl = `http://localhost:5001/grades/${portfolio?.owner}`

    try {
      const [portfolioResponse, gradesResponse] = await Promise.all([
        fetch(portfolioApiUrl, { method: 'GET', headers: { 'Content-Type': 'application/json' } }),
        fetch(gradesApiUrl, { method: 'GET', headers: { 'Content-Type': 'application/json' } }),
      ])

      if (!portfolioResponse.ok) {
        const errorData = await portfolioResponse.json()
        console.error('Portfolio operation failed:', errorData)
      }

      if (!gradesResponse.ok) {
        const errorData = await gradesResponse.json()
        console.error('Grades operation failed:', errorData)
      }

      const [portfolioData, gradesData] = await Promise.all([
        portfolioResponse.json(),
        gradesResponse.json(),
      ])

      setCriterion(portfolioData?.specification)
      setEntries(portfolioData?.entries)
      setUserGrades(gradesData?.userGrades)
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
    criterion && setSortedCriterion([...criterion].sort((a, b) => a.title.localeCompare(b.title)))
  }, [criterion])

  return (
    <div className='bg-gradient-to-r from-[#F7F7F8] from-10% to-white flex flex-row'>
      <Navbar />
      {loading
        ? (
          <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
            <Spinner thickness='4px' speed='0.65s' emptyColor='gray.200' color='blue.500' size='xl' />
          </div>
        )
        : selectedKSB
          ? (
            <PortfolioExpanded
              setLoading={setLoading}
              selectedKSB={selectedKSB}
              setSelectedKSB={setSelectedKSB}
              entries={entries.filter(e => e.skill === selectedKSB.title)}
              setEntries={setEntries}
              grades={userGrades}
              setGrades={setUserGrades}
              canEdit={canEdit}
              portfolio={portfolio}
            />
          )
          : (
            <PortfolioCompact
              sortedCriterion={sortedCriterion}
              setSortedCriterion={setSortedCriterion}
              entries={entries}
              portfolio={portfolio}
              setPortfolio={setPortfolio}
              setLoading={setLoading}
              setSelectedKSB={setSelectedKSB}
            />
          )}
    </div>
  )
}

export default Portfolio
