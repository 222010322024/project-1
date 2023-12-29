import React from 'react'
import "./Authform.css"

import { useState } from 'react';

const Input = (p) => {
 

  return (
    
    <div className='input-box'>
    <input type={p.type} placeholder={p.placeholder}  onChange={p.onChange}/>
    
    
    </div>
  )
}

export default Input
