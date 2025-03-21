import React from 'react'
import { useState } from 'react'


export default function Form({ submit, loading }) {
  const [username, setUsername] = useState('Rokusho')
  const [tag, setTag] = useState('Kana')


  function onSubmit(event) {
    event.preventDefault()
    submit(username, tag)
  }

  return (
    <>
      <form 
        onSubmit={(e) => onSubmit(e)}
        className='items-center flex flex-row text-2xl'
        >
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder='Summoner Name'
          className='border-2 rounded-sm w-[45%] px-2 placeholder:text-xl'
          autoFocus
        />
        <span className='px-2 text-2xl'>#</span>
        <input 
          value={tag}
          onChange={(e) => setTag(e.target.value)}
          placeholder='Tag'
          className='border-2 rounded-sm w-[25%] px-2 placeholder:text-xl'
        />
        <button className={`border-2 !rounded-md bg-green-200 mx-2 w-[30%]`} disabled={loading?true:false}>Submit</button>
      </form>
    </>
  )
}
