import React from 'react'
import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useOutletContext } from 'react-router-dom'

import CharacterCard from '../components/CharacterCard'

export default function CharactersPage() {

  const { addUnaddFavorites } = useOutletContext()
  
  //20 characters MAX per page
  const [characters, setCharacters] = useState(null)

  let { page } = useParams()
  let navigate = useNavigate()

  let currentPage = Number(page)

  useEffect(() => {
    async function fetchCharacters() {
      try {
        const response = await fetch(`https://rickandmortyapi.com/api/character?page=${page}`)
        const data = await response.json()
        setCharacters([...data.results])
      } catch {
        console.log("Error from useEffect")
      }
    }

    fetchCharacters()
  }, [page])

  function nextPage() {
    navigate(`/characters/${currentPage + 1}`)
  }
  function previousPage() {
    navigate(`/characters/${currentPage - 1}`)
  }
  function specificCharacterNav(characterid) {
    navigate(`/character/${characterid}`)
  }

  return (
    <div className='flex flex-col bg-green-200'>
      <div className='flex justify-between m-4'>
        <p className='text-3xl'>Characters Page</p>
        <div className='flex gap-2'>
          {
            currentPage > 1
            ? <button onClick={previousPage} className='rounded-md p-1 bg-green-300 hover:bg-green-400 active:bg-green-600'>Previous Page</button>
            : <button className='disabled text-gray-500 bg-gray-300 rounded-md p-1'>Previous Page</button>
          }
          {
            currentPage < 42
            ? <button onClick={nextPage} className='rounded-md p-1 bg-green-300 hover:bg-green-400 active:bg-green-600'>Next Page</button>
            : <button className='disabled text-gray-700 bg-gray-300 rounded-md p-1'>Next Page</button>
          }
        </div>
      </div>

      <div className='flex flex-wrap gap-4 justify-center'>
        {
          characters
          ? characters.map(char => {
            return (
              <div key={char.id} className="relative">
                <div onClick={() => specificCharacterNav(char.id)}>
                  <CharacterCard char={char}/>
                </div>
                <button onClick={() => {addUnaddFavorites(char)}} className="top-2 right-2 border-2 bg-red-400 absolute rounded-md">Fav/Unfav</button>
              </div>
            )
          })
          : <div>Cannot grab characters from api</div>
          
        }
      </div>  
    </div>
  )
}
