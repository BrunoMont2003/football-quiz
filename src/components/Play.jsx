import React from 'react'

export const Play = ({ players }) => {
  console.log(players.length)
  return (
    <section className='text-white w-100 grid grid-cols-4 gap-5 border'>
      {players.length > 0 &&
        players.map((player, index) => (
          <article className='flex flex-col gap-5' key={index}>
            <span className='font-bold'>{player.name}</span>
            <span className=''>{player.id}</span>
            <img src={player.image} alt={player.name} />
          </article>
        ))}
      {players.length === 0 && <p>No players</p>}
    </section>
  )
}
