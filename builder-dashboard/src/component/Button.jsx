import React from 'react'
import "./button.css"


const Button = (p) => {
  return (
    <div>
      <button className='btn' onClick={p.onClick}>{p.value}</button>
    </div>
  )
}

export default Button
