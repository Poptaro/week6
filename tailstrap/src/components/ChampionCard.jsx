import React from 'react'

export default function ChampionCard({ champObj }) {
  if(!champObj) {
    return (
      <>
        <p>Null Champ Object</p>
      </>
    )
  }
  return (
    <div className='h-96 w-64 rounded-2xl overflow-hidden relative items-center'>
      <img src={champObj.img} className='h-full w-full absolute object-cover inset-0 -translate-x-32 -translate-y-12 overflow-visible' />
    
      <div className='flex flex-col h-[80%] w-full z-10 bg-gradient-to-t from-blue-700 to-transparent via-blue-400 to-via-blue-300 absolute bottom-0 justify-center'>
        <div className='pt-16'>
          <p className='text-3xl '>{champObj.name}</p>
          <p>Level: {champObj.level}</p>
          <p>Mastery: {champObj.points}</p>
        </div>
      </div>
    </div>
  )
}
