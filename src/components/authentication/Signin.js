// import useInput from "./useInput"
import React, {useState} from "react";
import {signIn} from "../../firebase/Users";


//Sign in form for new users
const Signin = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword]=  useState("")
    return (
        <form onSubmit={(e) => {signIn(e,{email, password})}}>
            <h1>SIGN IN</h1>
            <input placeholder="Email" value={email} onChange={event => {setEmail(event.target.value)}} />
            <input placeholder="Password" type="password" value={password} onChange={event => {setPassword(event.target.value)}} />
            <br></br>
            <button type="submit">Sign in</button>
        </form>
    );
};

export default Signin;