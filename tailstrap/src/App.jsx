import { useState, useEffect } from 'react'
import './App.css'

import Form from './components/Form'
import ChampionCard from './components/ChampionCard'

const RIOT_KEY = import.meta.env.VITE_RIOT_API_KEY

const headerObj = {
  "X-Riot-Token": RIOT_KEY
}

export default function App() {

  const [ddragon, setddragon] = useState([])
  const [master, setMaster] = useState([])
  let dict = {}


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
  useEffect(() => {
    
  })


  async function getAccountInfo(username, tag) {
    try {
      const response = await fetch(`https://americas.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${username}/${tag}`, {
        headers: headerObj
      })
      const data = await response.json()
      return data
    } catch(err) {
      console.error(err.message)
    }

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
    const data = await getAccountChampionMastery(username, tag)
    setMaster([])
    for(let i=0; i < data.length; i++) {
      champObjectBuilder(data[i])
    }
    
    console.log(master)
  }

  return (
    <>
      <div className='text-center h-dvh w-full m-auto pt-24 bg-blue-100 items-center justify-center flex flex-col'>
        <div className='w-124 p-2 rounded-md'>
          <Form submit={submit} />
        </div>

        <div className='flex flex-row items-center w-full h-full justify-center gap-6'>
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

