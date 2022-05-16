import moment from 'moment'
import React, { useState } from 'react'
import { Button } from './Button'
import { Card } from './Card'

export const Play = ({ players, exit }) => {
  const [index, setIndex] = useState(1)
  const [points, setPoints] = useState(0)
  const [olderPlayer, setOlderPlayer] = useState(players[0])
  const [currentPlayer, setCurrentPlayer] = useState(players[1])
  const [nextPair, setNextPair] = useState(null)
  const [showDate, setShowDate] = useState(false)
  const [response, setResponse] = useState(null)
  const [statusCurrent, setStatusCurrent] = useState('')
  const [statusOlder, setStatusOlder] = useState('')

  const handleClick = ({ id }) => {
    if (response !== null) return
    const olderPlayerDate = moment(olderPlayer.birth_date)
    const currentPlayerDate = moment(currentPlayer.birth_date)
    let styleOlder = ''
    let styleCurrent = ''
    //* a.diff(b) -> a - b < 0
    //* If the moment is earlier than the moment you are passing to moment.fn.diff, the return value will be negative.
    if (id === currentPlayer.id) {
      // you think that de current player is older than the other
      const res = currentPlayerDate.diff(olderPlayerDate) <= 0
      styleCurrent = res ? 'correct' : 'wrong'
      setResponse(res)
      setShowDate(true)
      if (res && index < players.length - 1) {
        const pair = {
          olderPlayer: currentPlayer,
          currentPlayer: players[index + 1]
        }
        setNextPair(pair)
        setIndex(index + 1)
        setPoints(points + 1)
      }
    } else {
      // you think that de older player is older than the current
      const res = olderPlayerDate.diff(currentPlayerDate) <= 0
      styleOlder = res ? 'correct' : 'wrong'
      setResponse(res)
      setShowDate(true)
      if (res && index < players.length - 1) {
        const pair = {
          olderPlayer,
          currentPlayer: players[index + 1]
        }
        setNextPair(pair)
        setIndex(index + 1)
        setPoints(points + 1)
      }
    }
    console.log(statusCurrent, statusOlder)
    setStatusCurrent(styleCurrent + ' no-hover')
    setStatusOlder(styleOlder + ' no-hover')
  }
  const onNext = () => {
    setCurrentPlayer(nextPair.currentPlayer)
    setOlderPlayer(nextPair.olderPlayer)
    setShowDate(false)
    setResponse(null)
    setStatusOlder('')
    setStatusCurrent('')
  }

  return (
    <section className='w-100 flex flex-col gap-5 flex-wrap items-center justify-center'>
      <h4 className='text-xl mb-5'>{points} points</h4>
      <div className='flex flex-col md:flex-row gap-10 md:gap-y-0'>
        <Card
          player={olderPlayer}
          onClick={() => handleClick(olderPlayer)}
          showDate={showDate}
          status={statusOlder}
        />
        <Card
          player={currentPlayer}
          onClick={() => handleClick(currentPlayer)}
          showDate={showDate}
          status={statusCurrent}
        />
      </div>
      <div className='flex mt-5 gap-5'>
        <Button color='red' onClick={exit}>
          Exit
        </Button>
        {response && (
          <Button color='blue' onClick={onNext}>
            Next
          </Button>
        )}
      </div>
    </section>
  )
}
