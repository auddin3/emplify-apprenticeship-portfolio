import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar'
import { useLocation } from 'react-router-dom'
import { Spinner, useToast } from '@chakra-ui/react'
import PortfolioCompact from './PortfolioCompact'
import PortfolioExpanded from './PortfolioExpanded'
import useAuthUser from 'react-auth-kit/hooks/useAuthUser'

const Portfolio = () => {
  const location = useLocation()
  const [portfolio, setPortfolio] = useState(location?.state?.portfolio)
  const auth = useAuthUser()
  const user = auth?.user
  const [loading, setLoading] = useState(true)
  const [entries, setEntries] = useState()
  const [specification, setSpecification] = useState(portfolio?.specification)
  const [selectedKSB, setSelectedKSB] = useState()
  const [userGrades, setUserGrades] = useState()
  const toast = useToast()

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
    portfolio?.specification && setSpecification(portfolio?.specification)
  }, [portfolio?.specification])

  const [fileList, setFileList] = useState([])

  const openFile = async () => {
    try {
      const path = 'documents/'
      const pathSegments = path.split('/').filter(segment => segment !== '').slice(0, -1)
      let currentHandle = await window.showDirectoryPicker()

      for (const segment of pathSegments) {
        currentHandle = await currentHandle.getDirectoryHandle(segment)
      }

      const files = []
      for await (const entry of currentHandle.values()) {
        const isDirectory = entry.kind === 'directory'
        const fileInfo = {
          name: entry.name,
          isDirectory,
          files: isDirectory ? await readFilesFromDirectory(entry) : null,
        }
        files.push(fileInfo)
      }
      setFileList(files)
      toast({
        title: 'Success',
        description: 'The file list has been refreshed.',
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'bottom-right',
      })
    } catch (error) {
      console.error('Error selecting directory:', error)
      if (error.name === 'NotAllowedError') {
        toast({
          title: 'Error',
          description: 'You do not have permission to access this directory. Please grant permission in your browser settings.',
          status: 'error',
          duration: 5000,
          isClosable: true,
          position: 'bottom-right',
        })
      } else {
        toast({
          title: 'Error',
          description: 'An error occurred while selecting the directory.',
          status: 'error',
          duration: 5000,
          isClosable: true,
          position: 'bottom-right',
        })
      }
    }
  }

  const readFilesFromDirectory = async (directoryHandle) => {
    const files = []
    for await (const entry of directoryHandle.values()) {
      const isDirectory = entry.kind === 'directory'
      const fileInfo = {
        name: entry.name,
        isDirectory,
        files: isDirectory ? await readFilesFromDirectory(entry) : null,
      }
      files.push(fileInfo)
    }
    return files
  }

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
              fileList={fileList}
              openFile={openFile}
            />
          )
          : (
            <PortfolioCompact
              specification={specification?.sort((a, b) => a?.localeCompare(b))}
              entries={entries}
              portfolio={portfolio}
              setPortfolio={setPortfolio}
              setLoading={setLoading}
              setSelectedKSB={setSelectedKSB}
              canEdit={canEdit}
            />
          )}
    </div>
  )
}

export default Portfolio
