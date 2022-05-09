import React from 'react';
import Signin from '../../authentication/Signin';
import './signin.css';
import Popup from '../../popups/Popups'
import {useState} from 'react';

export const SigninPage = () => {
  // const TADA = {
  //   color: "white",
  //   backgroundColor: "DodgerBlue",
  //   padding: "10px",
  //   fontFamily: "Arial",
  //   textAlign: 'center',
  //   width: "500px",
  // };

  const [buttonPopup, setButtonPopup] = useState(true);
  return (
      // <div className='tada'> 
      <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
      {/* <h1 style={TADA}>TADA ! FIXED !</h1>  */}
        <Signin />
      </Popup>
      // </div>
  )
}
