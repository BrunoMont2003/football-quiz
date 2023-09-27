import React from 'react'
import './style.scss'
export const Button = ({ children, onClick, color = 'yellow' }) => {
  return (
    <button className={`css-button-sliding-to-top ${color}`} onClick={onClick}>
      {children}
    </button>
  )
}
