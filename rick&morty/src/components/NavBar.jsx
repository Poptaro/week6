import { Link } from 'react-router-dom'
import SearchBar from './SearchBar'
import { useState } from 'react'

export default function NavBar() {

  const [showSearch, setShowSearch] = useState(false)

  function showSearchBar() {
    setShowSearch(!showSearch)
  }

  return (
    <>
      <div className='w-full h-18 bg-green-400 flex flex-row items-center justify-start gap-4 px-4 border-2'>
        <Link to="/" className='border-2 rounded-sm p-2 bg-gray-400 '>HOME PAGE</Link>
        <Link to="/about" className='border-2 rounded-sm p-2 bg-gray-400'>ABOUT PAGE</Link>
        <Link to="/characters" className='border-2 rounded-sm p-2 bg-gray-400'>CHARACTERS PAGE</Link>
        <Link to="/favorite-characters" className='border-2 rounded-sm p-2 bg-gray-400'>FAVORITE CHARACTERS PAGE</Link>
      </div>
      <div className='flex gap-2 m-2 items-center h-10'>
        <button onClick={showSearchBar} className='rounded-l-md bg-green-300 p-1 px-2 h-full text-xl'>{showSearch ? <p>Hide Search</p> : <p>Show Search</p>}</button>
        {
          showSearch
          ? <SearchBar />
          : null
        }
      </div>
    </>
  )
}
