import React, { useState } from 'react'

const Navbar = () => {
  const [showPopup, setShowPopup] = useState(false)

  const togglePopup = () => {
    setShowPopup(!showPopup)
  }

  return (
    <div className="flex w-1/5 h-screen bg-blue-900 text-white">
      <div className="p-4">
        <div className="mb-8">
          <a href="#dashboard" className="flex items-center py-2 px-4 text-lg">
            Dashboard
          </a>
          <a href="#portfolios" className="flex items-center py-2 px-4 text-lg">
            Portfolios
          </a>
          <a href="#library" className="flex items-center py-2 px-4 text-lg">
            Library
          </a>
        </div>
        <div className="circle-icon cursor-pointer" onClick={togglePopup}>
          <div className="h-12 w-12 bg-white rounded-full flex items-center justify-center">
            {/* You can add an avatar or initials here */}
          </div>
        </div>
      </div>
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded-lg">
            {/* Your popup content goes here */}
            <p>Popup Content</p>
            <button className="mt-4 p-2 bg-blue-500 text-white rounded" onClick={togglePopup}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Navbar
