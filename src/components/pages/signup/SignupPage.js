import React from 'react'
import Signup from '../../authentication/Signup'
import './signup.css'

export const SignupPage = () => {
  const TADA = {
    color: "white",
    backgroundColor: "pink",
    padding: "10px",
    fontFamily: "Arial",
    textAlign: 'center'
  };
  return (
      <div className='magic'>
        <h1 style={TADA}>TADA ! FIXED ! בצבע ורוד !</h1>  
        <Signup/>
      </div>
    
  )
}
