import React from 'react'

export default function CharacterPage({ char }) {
  return (
    <div className='relative border-2 h-148 w-[65%] bg-green-500 rounded-xl flex flex-col items-center justify-between py-1'>

      <div className='border-2 w-[40%] overflow-hidden rounded-xl flex-1'>
        <img src={char.image} alt="character name" className='h-full' />
      </div>

      <div className='flex items-start h-full w-full flex-1 justify-center'>
        <div className='p-1 flex flex-col w-[80%]'>
          <p className='justify-self-center text-5xl pb-2 text-center'>{char.name}</p>
          <p className='text-xl'>Species: {char.species}</p>
          <p className='text-xl'>Gender: {char.gender}</p>
          <p className='text-xl'>Status: {char.status}</p>
          <p className='text-xl'>Species: {char.species}</p>
          <p className='text-xl'>Type: {char.type ? char.type : 'null'}</p>
          <p className='text-xl'>Origin: {char.origin.name}</p>
          <p className='text-xl'>Location: {char.location.name}</p>
        </div>
      </div>

    </div>
  )
}
