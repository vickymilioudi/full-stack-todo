import React from 'react'
import tick from '../assets/tick.png'
import not_tick from '../assets/not_tick.png'

// ToggleButton handles toggling complete/incomplete state
const ToggleButton = ({ isComplete, onToggle }) => {
  return (
    <img
      src={isComplete ? tick : not_tick}
      alt="status"
      onClick={onToggle}
      className="w-7 cursor-pointer"
    />
  )
}

export default ToggleButton