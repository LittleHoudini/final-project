import React from 'react';
import Signin from '../../authentication/Signin';
import './signin.css';

export const SigninPage = () => {
  const TADA = {
    color: "white",
    backgroundColor: "DodgerBlue",
    padding: "10px",
    fontFamily: "Arial",
    textAlign: 'center'
  };
  return (
      <div className='tada'> 
      <h1 style={TADA}>TADA ! FIXED !</h1> 
        <Signin/>
      </div>
  )
}
