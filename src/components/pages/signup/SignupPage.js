import React from 'react'
import Signup from '../../authentication/Signup'
import './signup.css'
import Popup from '../../popups/Popups'
import {useState} from 'react';

export const SignupPage = () => {
  const [buttonPopup, setButtonPopup] = useState(true);
  return (
    <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
      <Signup/>
    </Popup>
       
    
  )
}
