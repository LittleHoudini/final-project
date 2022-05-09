import React from 'react';
import Signin from '../../authentication/Signin';
import './signin.css';
import Popup from '../../popups/Popups'
import {useState} from 'react';

export const SigninPage = () => {
  const [buttonPopup, setButtonPopup] = useState(true);
  return (
      <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
        <Signin />
      </Popup>
  )
}
