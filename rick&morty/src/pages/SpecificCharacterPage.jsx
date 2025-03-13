import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import CharacterPage from '../components/CharacterPage'

export default function SpecificCharacterPage() {

  const { id } = useParams()

  const [character, setCharacter] = useState(null)

  useEffect(() => {
    async function fetchCharacterInfo() {
      try{
        const response = await fetch(`https://rickandmortyapi.com/api/character/${id}`)
        const data = await response.json()
        setCharacter(data)
      } catch {
        console.log("Error from useEffect")
      }

    }
    fetchCharacterInfo()
  })

  return (
    <div className='flex justify-center m-8'>
      {
        character
        ? <CharacterPage char={character} />
        : null
      }  
    </div>
  )
}
