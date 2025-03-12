import React from 'react'
import { useParams } from 'react-router-dom'

export default function SpecificCharacterPage() {

  const { id } = useParams()
  // console.log(id)

  return (
    <div>
      SpecificCharacterPage
      <p>ID: {id}</p>  
    </div>
  )
}
