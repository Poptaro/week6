import { Outlet } from 'react-router-dom'
import { useState } from 'react'

import NavBar from './components/NavBar'

import './App.css'

function App() {

  const [favorites, setFavorites] = useState([])

  function addUnaddFavorites(characterObj) {

    const foundCharacter = favorites.some(item => item.id === characterObj.id)

    if(foundCharacter) {
      const filteredArray = favorites.filter(item => item.id !== characterObj.id)
      console.log('removed')
      setFavorites([...filteredArray])
    } else {
      console.log('added')
      setFavorites([...favorites, characterObj])
    }    
  }

  return (
    <div>
      <NavBar />
      <Outlet context={{ favorites, addUnaddFavorites }}/>
    </div>
  )
}

export default App
