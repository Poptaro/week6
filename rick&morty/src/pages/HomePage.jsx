import { useState, useEffect } from "react"

import CharacterCard from '../components/CharacterCard.jsx'

export default function HomePage() {
  const amountOfCharacters = 826

  const [characters, setCharacters] = useState([])

  useEffect(() => {
    async function fetchCharacter(characterID) {
      const response = await fetch(`https://rickandmortyapi.com/api/character/${characterID}`)
      const data = await response.json()
      return data
    }
    async function populateCharacters() {
      setCharacters([])
      for(let i=0; i < 3; i++) {
        let temp = await fetchCharacter(Math.floor(Math.random() * amountOfCharacters)+1)
        setCharacters((prev) => [...prev, temp])
      }
    }
    populateCharacters()

  }, [])


  return (
    <div className='m-4'>
      <h1 className='text-3xl'>Welcome to my horrible rick and morty site.</h1>
      <p className='m-4'>Enjoy 3 random characters from Rick & Morty</p>
      <div className="flex justify-between p-4">
        {
          characters
            ? characters.map(character => {
                return(
                  <CharacterCard char={character} key={character.id} />
                )
              })
          : null
        }
      </div>
    </div>
  )
}
