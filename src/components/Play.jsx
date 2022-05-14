import React from 'react'
import { Card } from './Card'

export const Play = ({ players }) => {
  console.log(players.length)
  return (
    <section className='w-100 flex gap-5'>
      {players.length > 0 &&
        players.map((player, index) => <Card player={player} key={index} />)}
      {players.length === 0 && <p>No players</p>}
    </section>
  )
}
