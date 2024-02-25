import React from 'react'
import useAuthUser from 'react-auth-kit/hooks/useAuthUser'
import Navbar from '../components/Navbar'

const Portfolios = () => {
  const auth = useAuthUser()
  const user = auth.user

  return (
    <div className='bg-gradient-to-r from-[#F7F7F8] from-10% to-white flex flex-row'>
      <Navbar user={user}/>
      <div>
        Portfolio
      </div>
    </div>
  )
}

export default Portfolios
