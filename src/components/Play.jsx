import React from 'react'
import { Card } from './Card'

export const Play = ({ players }) => {
  console.log(players)
  return (
    <section className='w-100 flex gap-5 flex-wrap items-center justify-center'>
      {players.length > 0 &&
        players.map((player, index) => (
          <div
            key={index}
            className='flex flex-col md:flex-row gap-10 md:gap-y-0'
          >
            <Card player={player} />
          </div>
        ))}
    </section>
  )
}
