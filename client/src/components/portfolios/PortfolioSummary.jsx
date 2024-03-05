import React from 'react'
import Navbar from '../Navbar'
import { useLocation } from 'react-router-dom'

const Portfolio = () => {
  const location = useLocation()
  const portfolio = location?.state?.portfolio
  const canEdit = location?.state?.edit

  console.log(location?.state?.edit)
  return (
    <div className='bg-gradient-to-r from-[#F7F7F8] from-10% to-white flex flex-row'>
      <Navbar />
      <div className='w-full p-14'>
        <h1 className='text-2xl text-blue-kpmgBlue font-semibold'>{portfolio?.name}</h1>
        <hr className='border-t-2 border-t-black-custom1/20 text-black-custom1 my-2 w-full' />
        <div>{canEdit && 'edit'}</div>
      </div>
    </div>
  )
}

export default Portfolio
