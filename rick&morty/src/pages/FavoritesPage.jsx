import { useOutletContext, useNavigate } from "react-router-dom"


import CharacterCard from '../components/CharacterCard.jsx'



export default function FavoritesPage() {
  const { favorites, addUnaddFavorites } = useOutletContext()

  const navigate = useNavigate()

  function specificCharacterNav(characterid) {
    navigate(`/character/${characterid}`)
  }


  console.log(favorites)
  return (
       <div className='flex flex-col bg-green-200'>
          <div className='flex justify-between m-4'>
            <p className='text-3xl'>Favorite Character Page</p>
          </div>
    
          <div className='flex flex-wrap gap-4 justify-center'>
            {
              favorites
              ? favorites.map(char => {
                return (
                  <div key={char.id} className="relative">
                    <div onClick={() => specificCharacterNav(char.id)}>
                      <CharacterCard char={char}/>
                    </div>
                    <button onClick={() => {addUnaddFavorites(char)}} className="top-2 right-2 border-2 bg-red-400 absolute rounded-md">Fav/Unfav</button>
                  </div>
                )
              })
              : <div>Cannot grab favorites from api</div>
              
            }
          </div>  
        </div>

  )
}
