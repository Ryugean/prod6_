import React from 'react'

function Navbar() {
  return (
    <div className='flex justify-between items-center mt-10 p-3 border-2 rounded-md w-3/4 mx-auto'>
        <div className='px-10'>
            <h1 className='font-bold text-lg text-gray-800'>Productivity Space</h1>
        </div>
        <div className='px-10'>
            <h1 className='text-gray-800'>Options</h1>
        </div>
    </div>
  )
}

export default Navbar
