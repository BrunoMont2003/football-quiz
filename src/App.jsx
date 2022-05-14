import React, { useState } from 'react'
import { Card } from './components/Card'
import { Play } from './components/Play'
import { getPlayers } from './services/football'

export const App = () => {
  const [players, setPlayers] = useState([])
  const [loading, setLoading] = useState(false)

  const getData = async () => {
    const result = await getPlayers()
    return result
  }

  const handleClick = async (e) => {
    setLoading(true)
    e.preventDefault()
    const result = await getData()
    setPlayers(result)
    setLoading(false)
  }

  return (
    <section className='bg-slate-900 min-h-screen p-5 text-white flex gap-5 flex-col items-center justify-center'>
      <button
        className='border rounded px-5 py-2 hover:translate-y-1 ease-in-out duration-500'
        onClick={async (e) => await handleClick(e)}
      >
        Start
      </button>

      {loading && <p>Loading...</p>}
      {!loading && <Play players={players} />}
      <Card />
    </section>
  )
}
