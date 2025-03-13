import React from 'react'
import { Link } from 'react-router-dom'

export default function NavBar() {
  return (
    <div className='w-full h-18 bg-green-400 flex flex-row items-center justify-start gap-4 px-4 border-2'>
      <Link to="/" className='border-2 rounded-sm p-2 bg-gray-400'>HOME PAGE</Link>
      <Link to="/about" className='border-2 rounded-sm p-2 bg-gray-400'>ABOUT PAGE</Link>
      <Link to="/characters/1" className='border-2 rounded-sm p-2 bg-gray-400'>CHARACTERS PAGE</Link>
      <Link to="/favorite-characters" className='border-2 rounded-sm p-2 bg-gray-400'>FAVORITE CHARACTERS PAGE</Link>
    </div>
  )
}
