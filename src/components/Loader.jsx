import React from 'react'
import { motion } from 'framer-motion'

export const Loader = () => {
  const variants = {
    animationOne: {
      x: ['-20px', '20px'],
      y: ['0px', '30px'],
      transition: {
        x: {
          yoyo: Infinity,
          duration: 0.5
        },
        y: {
          yoyo: Infinity,
          duration: 0.25,
          ease: 'easeOut'
        }
      }
    }
  }

  return (
    <>
      <motion.div
        variants={variants}
        animate='animationOne'
        className='w-3 h-3 rounded-full bg-white'
      />
      <p className='my-10 text-3xl'>Loading ...</p>
    </>
  )
}
