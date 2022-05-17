import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from './components/Button'
import { Play } from './components/Play'
import { getManyPlayers, shuffle } from './services/football'
import { Loader } from './components/Loader'

export const App = () => {
  const [players, setPlayers] = useState([])
  const [temp, setTemp] = useState([])
  const [loading, setLoading] = useState(false)
  const [playing, setPlaying] = useState(false)

  const getData = async () => {
    const result = await getManyPlayers(11)
    return result
  }

  const start = async () => {
    setPlaying(true)
    setLoading(true)
    let result = temp.length === 0 ? await getData() : temp
    result = shuffle(result)
    setPlayers(result)
    temp.length === 0 && setTemp(result)
    setLoading(false)
  }
  const exit = () => {
    setPlaying(false)
    setPlayers([])
  }
  const mainVariants = {
    noPlaying: {
      transition: {
        duration: 1,
        type: 'spring',
        stiffness: 260,
        damping: 20
      },
      y: ['0px', '-300px', '0px'],
      opacity: 1
    },
    playing: {
      transition: {
        duration: 1
      },
      opacity: [0, 1]
    }
  }
  return (
    <motion.main className='bg-main min-h-screen sm:p-5 text-white flex flex-col items-center justify-center relative'>
      <motion.section
        variants={mainVariants}
        animate={!playing ? 'noPlaying' : 'playing'}
        className='flex justify-center items-center flex-col'
      >
        <h1 className='text-5xl my-6 text-center'>¿Who is older?</h1>
        {!playing && (
          <Button color='yellow' onClick={async (e) => await start(e)}>
            Start
          </Button>
        )}
      </motion.section>

      {loading && <Loader />}
      {!loading && playing && (
        <section className='flex flex-col container items-center justify-center py-5 gap-10'>
          <Play players={players} exit={exit} playing={playing} />
        </section>
      )}
    </motion.main>
  )
}
