import React from 'react'
import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useOutletContext } from 'react-router-dom'

import CharacterCard from '../components/CharacterCard'
import FavoriteUnfavoriteButton from '../components/FavoriteUnfavoriteButton'

export default function CharactersPage() {


  const { addUnaddFavorites } = useOutletContext()
  const { name } = useParams()

  //20 characters MAX per page
  const [characters, setCharacters] = useState(null)
  //CHECKPOINT
  const [currentUrl, setCurrentUrl] = useState(null)
  const [nextPage, setNextPage] = useState(null)
  const [prevPage, setPrevPage] = useState(null)
  


  // let { page } = useParams()
  let navigate = useNavigate()


  useEffect(() => {
    if (name) {
      setCurrentUrl(`https://rickandmortyapi.com/api/character/?name=${name}`);
    } else {
      setCurrentUrl(`https://rickandmortyapi.com/api/character/`)
    }
  }, [name]);

  useEffect(() => {

    async function fetchCharacters() {
      try {
        const response = await fetch(currentUrl)
        const data = await response.json()
        //find next or prev pages on api
        data.info.next ? setNextPage(data.info.next) : setNextPage(null)
        data.info.prev ? setPrevPage(data.info.prev) : setPrevPage(null)

        setCharacters([...data.results])
      } catch (error) {
        console.log("Error from useEffect", error)
      }
    }

    fetchCharacters()
  }, [currentUrl])

  function nextPageFunction() {
    if(nextPage) {
      setCurrentUrl(nextPage)
    }
  }
  function prevPageFunction() {
    if(prevPage) {
      setCurrentUrl(prevPage)
    }
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
            prevPage
            ? <button onClick={prevPageFunction} className='rounded-md p-1 bg-green-300 hover:bg-green-400 active:bg-green-600'>Previous Page</button>
            : <button className='disabled text-gray-500 bg-gray-300 rounded-md p-1'>Previous Page</button>
          }
          {
            nextPage
            ? <button onClick={nextPageFunction} className='rounded-md p-1 bg-green-300 hover:bg-green-400 active:bg-green-600'>Next Page</button>
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
                <FavoriteUnfavoriteButton onClickFunction={() => {addUnaddFavorites(char)}} className="top-2 right-2 border-2 bg-red-400 absolute rounded-md">Fav/Unfav</FavoriteUnfavoriteButton>
              </div>
            )
          })
          : <div>Cannot grab characters from api</div>
          
        }
      </div>  
    </div>
  )
}
