import React from 'react'
import useAuthUser from 'react-auth-kit/hooks/useAuthUser'
import Navbar from '../components/Navbar'

const Portfolio = () => {
  const auth = useAuthUser()
  const user = { name: auth.name, email: auth.email }

  return (
    <div className='bg-gradient-to-r from-[#F7F7F8] from-10% to-white flex flex-row'>
      <Navbar user={user}/>
      <div>
        Portfolio
      </div>
    </div>
  )
}

export default Portfolio
