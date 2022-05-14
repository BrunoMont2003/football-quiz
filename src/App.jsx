import React, { useState } from 'react'
import { Play } from './components/Play'
import { getPlayers } from './services/football'

export const App = () => {
  const [players, setPlayers] = useState([])
  const [loading, setLoading] = useState(false)
  const [playing, setPlaying] = useState(false)

  const getData = async () => {
    const result = await getPlayers()
    return result
  }

  const handleClick = async (e) => {
    setPlaying(true)
    setLoading(true)
    e.preventDefault()
    const result = await getData()
    setPlayers(result)
    setLoading(false)
  }

  return (
    <section className='bg-main min-h-screen p-5 text-white flex gap-10 flex-col items-center justify-center'>
      <h1 className='text-5xl'>¿Who is older?</h1>
      {!playing && (
        <button
          className='border rounded px-5 py-2 hover:translate-y-1 ease-in-out duration-500'
          onClick={async (e) => await handleClick(e)}
        >
          Start
        </button>
      )}

      {loading && <p>Loading...</p>}
      {!loading && <Play players={players} />}
    </section>
  )
}
