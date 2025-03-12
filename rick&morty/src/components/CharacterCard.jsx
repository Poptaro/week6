import React from 'react'

export default function CharacterCard({ char }) {
  return (
    <div className='relative border-2 h-84 w-64 bg-green-500 rounded-xl flex flex-col items-center justify-between py-1'>

      <div className='border-2 h-[50%] w-[95%] overflow-hidden rounded-xl flex-1'>
        <img src={char.image} alt="character name" />
      </div>

      <div className='flex items-start h-full w-full flex-1 justify-center'>
        <div className='p-1 flex flex-col w-[80%]'>
          <p className='justify-self-center text-xl pb-2 text-center'>{char.name}</p>
          <p>Species: {char.species}</p>
          <p>Gender: {char.gender}</p>
          <p>Type: {char.type ? char.type : 'null'}</p>
          <p>Origin: {char.origin.name}</p>
        </div>
      </div>

    </div>
  )
}
