// import useInput from "./useInput"
import React, {useState} from "react";
import {signIn} from "../../firebase/Users";
import './sign.css'


//Sign in form for new users
const Signin = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword]=  useState("")
    return (
        <div className="signin-div">
            <form className="signin-form"  onSubmit={(e) => {signIn(e,{email, password})}}>
                <h1 className="signin-h1-form">SIGN IN</h1>
                <input className="signin-input" placeholder="Email" value={email} onChange={event => {setEmail(event.target.value)}} />
                <input className="signin-input" placeholder="Password" type="password" value={password} onChange={event => {setPassword(event.target.value)}} />
                <br></br>
                <button className="signin-button" type="submit">Sign in</button>
            </form>
        </div>
    );
};

export default Signin;