import React, { useState } from 'react'
import { Button } from './components/Button'
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
  const exit = (e) => {
    e.preventDefault()
    setPlaying(false)
  }

  return (
    <section className='bg-main min-h-screen p-5 text-white flex gap-10 flex-col items-center justify-center'>
      <h1 className='text-5xl mb-6'>¿Who is older?</h1>
      {!playing && (
        <Button color='yellow' onClick={async (e) => await handleClick(e)}>
          Start
        </Button>
      )}

      {loading && <p>Loading...</p>}
      {!loading && playing && (
        <main className='flex flex-col container items-center justify-center py-10 gap-10'>
          <div className=''>
            <Play players={players} />
          </div>
          <div className=''>
            <Button color='red' onClick={exit}>
              Exit
            </Button>
          </div>
        </main>
      )}
    </section>
  )
}
