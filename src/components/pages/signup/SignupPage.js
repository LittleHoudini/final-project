import React from 'react'
import Signup from '../../authentication/Signup'
import './signup.css'
import Popup from '../../popups/Popups'
import {useState} from 'react';

export const SignupPage = () => {
  const TADA = {
    color: "white",
    backgroundColor: "pink",
    padding: "10px",
    fontFamily: "Arial",
    textAlign: 'center'
  };

  const [buttonPopup, setButtonPopup] = useState(true);
  return (
      <div className='magic'>
        <h1 style={TADA}>TADA ! FIXED ! בצבע ורוד !</h1>  
        <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
        <Signup/>
        </Popup>
       
      </div>
    
  )
}
