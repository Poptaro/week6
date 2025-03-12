import React from 'react'

export default function AboutPage() {
  return (
    <>
      <div>
        <img 
          src={`https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Rick_and_Morty_title_card.png/1600px-Rick_and_Morty_title_card.png?20220323175048`} 
          className='w-[100%] h-64'  
        />
      </div>

      <div className='m-4'>
        <p className='text-2xl'>Rick and morty is about a self centered asshole and his grandpa that travel the universe</p>
      </div>
    </>
  )
}
