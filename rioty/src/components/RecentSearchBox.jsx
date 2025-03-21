import React from 'react'

export default function RecentSearchBox({ children }) {
  return (
    <div className='border-2 rounded-md p-1 px-2 bg-gray-500 text-white border-black hover:cursor-pointer'>
      {children}
    </div>
  )
}
