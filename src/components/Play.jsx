import moment from 'moment'
import React, { useState } from 'react'
import { Card } from './Card'

export const Play = ({ players }) => {
  const [index, setIndex] = useState(1)
  const [points, setPoints] = useState(0)
  const [olderPlayer, setOlderPlayer] = useState(players[0])
  const [currentPlayer, setCurrentPlayer] = useState(players[1])
  console.log(players)
  const handleClick = ({ id, name }) => {
    const olderPlayerDate = moment(olderPlayer.birth_date)
    const currentPlayerDate = moment(currentPlayer.birth_date)
    //* a.diff(b) -> a - b < 0
    //* If the moment is earlier than the moment you are passing to moment.fn.diff, the return value will be negative.
    console.log(`${index} < ${players.length}`, index < players.length)
    if (id === currentPlayer.id) {
      // you think that de current player is older than the other
      const response = currentPlayerDate.diff(olderPlayerDate) <= 0
      console.log(response)
      if (response && index < players.length - 1) {
        setOlderPlayer(currentPlayer)
        setCurrentPlayer(players[index + 1])
        setIndex(index + 1)
        setPoints(points + 1)
      }
    } else {
      // you think that de older player is older than the current
      const response = olderPlayerDate.diff(currentPlayerDate) <= 0
      console.log(response)
      if (response && index < players.length - 1) {
        setCurrentPlayer(players[index + 1])
        setIndex(index + 1)
        setPoints(points + 1)
      }
    }
  }

  return (
    <section className='w-100 flex flex-col gap-5 flex-wrap items-center justify-center'>
      <h4 className='text-xl'>{points} points</h4>
      <div className='flex flex-col md:flex-row gap-10 md:gap-y-0'>
        <Card player={olderPlayer} onClick={() => handleClick(olderPlayer)} />
        <Card
          player={currentPlayer}
          onClick={() => handleClick(currentPlayer)}
        />
      </div>
    </section>
  )
}
