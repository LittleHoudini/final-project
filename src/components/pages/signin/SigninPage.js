import React from 'react';
import Signin from '../../authentication/Signin';
import './signin.css';
export const SigninPage = ({openSignIn, setOpenSignIn}) => {
  return (
    <div>
      {openSignIn ? <Signin open={openSignIn} setOpen={setOpenSignIn}/> : null}
    </div>    
      
  )
}