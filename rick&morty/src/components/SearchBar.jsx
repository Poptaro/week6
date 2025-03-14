import { useState } from "react"
import { useNavigate } from "react-router-dom"



export default function SearchBar() {

  const [characterToSearch, setCharacterToSearch] = useState('')

  const navigate = useNavigate()


  async function onSubmit(event) {
    event.preventDefault()
    try {
      navigate(`/characters/${characterToSearch}`)
      
    } catch {
      console.log("error at fetching characterToSearch")
    }
  }

  return (
    <div className="h-full p-0 w-[30%]">
      <form onSubmit={(e) => onSubmit(e)} className="h-full">
        <input 
          className="bg-gray-200 h-full rounded-r-md border-2 w-full border-blue-500 p-1 text-xl"
          value={characterToSearch}
          onChange={(e) => {setCharacterToSearch(e.target.value)}}
          placeholder="Character to search"
        />
      </form>
    </div>
  )
}
