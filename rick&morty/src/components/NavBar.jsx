import SearchBar from './SearchBar'
import { useState } from 'react'

import NavLinkButton from './NavLinkButton'

export default function NavBar() {

  const [showSearch, setShowSearch] = useState(false)

  function showSearchBar() {
    setShowSearch(!showSearch)
  }

  return (
    <>
      <div className='w-full h-18 bg-gray-700 flex flex-row items-center justify-start gap-4 px-4 border-2'>
        <NavLinkButton path="/">HOME PAGE</NavLinkButton>
        <NavLinkButton path="/about">ABOUT PAGE</NavLinkButton>
        <NavLinkButton path="/characters">CHARACTERS PAGE</NavLinkButton>
        <NavLinkButton path="/favorite-characters">FAVORITE CHARACTERS PAGE</NavLinkButton>
      </div>
      <div className='flex gap-2 m-2 items-center h-10'>
        <button onClick={showSearchBar} className='border-2 rounded-sm p-2 bg-black text-blue-400 border-green-500 hover:bg-gray-700 rounded-l-xl'>{showSearch ? <p>Hide Search</p> : <p>Show Search</p>}</button>
        {
          showSearch
          ? <SearchBar />
          : null
        }
      </div>
    </>
  )
}
