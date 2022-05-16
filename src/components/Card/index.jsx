import moment from 'moment'
import React from 'react'
import './style.scss'
export const Card = ({ player, onClick, showDate = false, status }) => {
  return (
    <article
      role='button'
      className={`card w-64 h-80 rounded-lg  shadow-md border-4 hover:cursor-pointer  hover:translate-y-1 duration-1000 ease-in-out relative ${status}`}
      onClick={onClick}
    >
      <div className='flex flex-col items-center py-10'>
        <figure className='mb-3 w-28 h-28 bg-slate-800 bg-opacity-30 rounded-full shadow-lg player-image flex justify-center pt-2 duration-500 ease-in-out'>
          <img
            className='overflow-hidden h-20'
            src={player.playerImage}
            alt={player.name}
          />
        </figure>
        <h5 className='text-2xl ease-in-out duration-500 font-medium  text-white'>
          {player.name}
        </h5>
        <span className='text-sm ease-in-out duration-500 text-gray-400'>
          {player.position}
        </span>
        <div className='flex team-info ease-in-out duration-500 mt-4 space-x-3 lg:mt-8  bg-purple-900 bg-opacity-40 p-2 rounded'>
          <figure className=' w-6 h-6 flex justify-center'>
            <img src={player.leagueImage} alt='league' />
          </figure>
          <figure className=' w-6 h-6 flex justify-center'>
            <img src={player.clubImage} alt='club' />
          </figure>
        </div>
      </div>
      {showDate && (
        <div className='date-container mt-1 p-1 border w-fit bg-white'>
          <p className=' text-3xl text-black'>
            {moment(player.birth_date).format('ll')}
          </p>
        </div>
      )}
    </article>
  )
}
