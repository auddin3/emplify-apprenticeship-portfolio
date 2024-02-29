import React from 'react'
import useAuthUser from 'react-auth-kit/hooks/useAuthUser'
import Navbar from '../components/Navbar'

const Library = () => {
  const auth = useAuthUser()
  const user = auth.user

  return (
    <div className='bg-gray-paleGray flex flex-row'>
      <Navbar user={user}/>
      <div className='w-full p-14'>
        <h1 className='text-2xl text-blue-kpmgBlue font-semibold'>Library</h1>
        <hr className='border-t-2 border-t-black-custom1/15 text-black-custom1 my-2 w-full' />
      </div>
    </div>
  )
}

export default Library
