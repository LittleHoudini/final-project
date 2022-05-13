import React from 'react'
import Signup from '../../authentication/Signup'
import './signup.css'

export const SignupPage = ({openSignUp, setOpenSignUp}) => {
  
  return (
    <div>
      {openSignUp ? <Signup open={openSignUp} setOpen={setOpenSignUp}/> : null}
    </div>    
      
  )
}



