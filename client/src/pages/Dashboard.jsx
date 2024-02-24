import React from 'react'
import useAuthUser from 'react-auth-kit/hooks/useAuthUser'

const Dashboard = () => {
  const auth = useAuthUser()

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-4">Welcome to the Services Page</h1>
      <p className="text-lg">
                Hello {auth.name}
      </p>
    </div>
  )
}

export default Dashboard
