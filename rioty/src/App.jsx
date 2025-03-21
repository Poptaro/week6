import { useState, useEffect } from 'react'
import './App.css'

import Form from './components/Form'
import ChampionCard from './components/ChampionCard'
import RecentSearchBox from './components/RecentSearchBox'

const RIOT_KEY = import.meta.env.VITE_RIOT_API_KEY

const headerObj = {
  "X-Riot-Token": RIOT_KEY
}

export default function App() {

  const [ddragon, setddragon] = useState([])
  //Three champs lmao
  const [master, setMaster] = useState([])
  let dict = {}
  //5 last searched users
  const [recentSearches, setRecentSearches] = useState([])
  //open or close recent search bar
  const [recent, setRecent] = useState(false)
  const [loading, setLoading] = useState(false)


  //get every single champion data NO USER TIES
  useEffect(() => {
    async function acquireddragon() {
      const response = await fetch("https://ddragon.leagueoflegends.com/cdn/15.5.1/data/en_US/champion.json")
      const data = await response.json()
      setddragon(data)
    }
    acquireddragon()
  }, [])


  //when master has items or has changed, update the values of champ1, champ2, champ3
  // useEffect(() => {
    
  // })

  //fetch values of sql db for 5 most recent searches
  useEffect(() => {
    async function grabRecentSearches() {
      setLoading(true)
      try {
        const response = await fetch('http://localhost:8000/recent')
        const data = await response.json()
        console.log(data)
        setRecentSearches(data)
      } catch (err) {
        console.log('Error has occurred fetching 5 recent users', err)
        return
      }
      setLoading(false)
    }
    grabRecentSearches()
    setLoading(false)
  }, [master])


  async function getAccountInfo(username, tag) {
    try {
      setLoading(true)
      const response = await fetch(`https://americas.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${username}/${tag}`, {
        headers: headerObj
      })
      const data = await response.json()
      setLoading(false)
      return data
    } catch(err) {
      console.error(err.message)
    }
    setLoading(false)
  }

  async function getAccountChampionMastery(username, tag) {
    const accountResponse = await getAccountInfo(username, tag)
    const { puuid } = await accountResponse

    const response = await fetch(`https://na1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-puuid/${puuid}/top?count=3`, {
      headers: headerObj
    })
    let data = await response.json()
    return data
  }

  //SINGLE CHAMP OBJECT ONLY - Returns an object of a single champ of the values needed for the front end
  async function champObjectBuilder(champObject) {
    if(!champObject) {
      return("NO CHAMP OBJECT")
    }
    const champLevel = champObject.championLevel
    const champPoints = champObject.championPoints
    for(const value of Object.values(ddragon.data)) {
      dict[value.key] = value
    }
    let champName
    if(dict[champObject.championId]) {
      champName = dict[champObject.championId].id
    } else {
      champName = null
    }
    let temp = {}
    temp["name"] = champName
    temp["level"] = champLevel
    temp["points"] = champPoints
    temp["img"] = `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champName}_0.jpg`
    setMaster((prev) => [...prev, temp])
  }

  async function submit(username, tag) {
    setLoading(true)
    const data = await getAccountChampionMastery(username, tag)
    setMaster([])
    for(let i=0; i < data.length; i++) {
      champObjectBuilder(data[i])
    }
    //add the recently searched user and tag to db
    async function addToSearch(username, tag) {
      try {
        const response = await fetch(`http://localhost:8000/recent`, {
          method: 'POST',
          body: JSON.stringify({
            username,
            tag
          })
        })
        const data = await response.json()
        console.log(data)
      } catch (err) {
        console.log(`Could not add ${username}#${tag} to database`, err)
      }
    }
    setLoading(false)
    addToSearch(username, tag)
    // console.log(master)
  }

  return (
    <>
      <div className='text-center h-dvh w-full m-auto pt-24 bg-blue-200 items-center justify-center flex flex-col'>
        <h1 className='text-4xl mb-24'>Top 3 League Checker</h1>
        <div className='w-124 p-2 rounded-md mb-2'>
          <Form submit={submit} loading={loading}/>
        </div>
        <p className={`text-xl mb-0 hover:cursor-pointer ${recent?'':'italic font-bold'}`} onClick={() => setRecent(!recent)}>
          Recent accounts searched
        </p>
        {
          recent
          ? <div className='flex gap-2 border-2 p-2 rounded-md bg-gray-700'>
              {
              recentSearches
              ? recentSearches.map((search) => {
                return(
                  <div onClick={() => {submit(search.username, search.tag)}}>
                    <RecentSearchBox key={search.id}>{search.username} # {search.tag}</RecentSearchBox>
                  </div>
                )
              })
              : <p>Loading or no recent searches</p>
            }
          </div>
          : null
        }
        <div className='flex flex-row items-center w-full h-full justify-center gap-6' id='champCards'>
          {
            master.map(champObj => {
              return (
                <ChampionCard champObj={champObj} key={champObj.name}/>
              )
            })
          }
        </div>

      </div>
    </>
  )
}

