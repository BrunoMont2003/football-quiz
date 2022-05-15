import React, { useState } from 'react'
import { Button } from './components/Button'
import { Play } from './components/Play'
import { getManyPlayers, shuffle } from './services/football'
// import { players as data } from './services/ExampleData'

export const App = () => {
  const [players, setPlayers] = useState([])
  const [temp, setTemp] = useState([])
  const [loading, setLoading] = useState(false)
  const [playing, setPlaying] = useState(false)

  const getData = async () => {
    const result = await getManyPlayers()
    return result
  }

  const handleClick = async (e) => {
    setPlaying(true)
    setLoading(true)
    let result = temp.length === 0 ? await getData() : temp
    result = shuffle(result)
    setPlayers(result)
    temp.length === 0 && setTemp(result)
    setLoading(false)
  }
  const exit = (e) => {
    setPlaying(false)
    setPlayers([])
  }

  return (
    <section className='bg-main min-h-screen p-5 text-white flex gap-10 flex-col items-center justify-center'>
      <h1 className='text-5xl my-6 text-center'>¿Who is older?</h1>
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
          <div className='flex gap-5'>
            <Button color='red' onClick={exit}>
              Exit
            </Button>
          </div>
        </main>
      )}
    </section>
  )
}
