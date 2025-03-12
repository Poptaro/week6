import React from 'react'
import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

import CharacterCard from '../components/CharacterCard'

export default function CharactersPage() {


  //20 characters MAX per page
  const [characters, setCharacters] = useState([])

  let { page } = useParams()
  let navigate = useNavigate()

  let currentPage = Number(page)

  useEffect(() => {
    async function fetchCharacters() {
      const response = await fetch(`https://rickandmortyapi.com/api/character?page=${page}`)
      const data = await response.json()
      return(data)
    }
    async function populateCharacters() {
      const data = await fetchCharacters()
      setCharacters([...data.results])
    }
    populateCharacters()
  }, [page])

  function nextPage() {
    navigate(`/characters/${currentPage + 1}`)
  }
  function previousPage() {
    navigate(`/characters/${currentPage - 1}`)
  }
  // function specificCharacter(characterid) {
  //   navigate()
  // }

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
              <div onClick={() => console.log('hi')}>
                <CharacterCard char={char} key={char.id} />
              </div>
            )
          })
          : null
        }
      </div>  
    </div>
  )
}
