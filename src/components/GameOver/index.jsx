import React from 'react'
import { Button } from '../Button'
import './style.scss'
export const GameOver = ({ points = 0, done }) => {
  return (
    <>
      <div className='bg-blur absolute top-0 w-full h-full' />
      <div className='absolute top-0 w-full min-h-screen flex justify-center items-center '>
        <div className='game-over-card rounded-xl bg-white w-96 h-80 flex items-center justify-center flex-col'>
          <h3 className='text-7xl'>Game Over</h3>
          <h6 className='text-xl'>{points} points</h6>
          <div className='flex gap-5 mt-10'>
            <Button onClick={done} color='red'>
              Done
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
