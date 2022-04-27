// import useInput from "./useInput"
import React, { useState } from "react";
import {signUp} from "../../firebase/Users";

const Signup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword]=  useState("")
    return (
        <form onSubmit={(e) => {signUp(e,{email, password})}}>
            <h1>SIGN UP</h1>
            <input placeholder="Email" value={email} onChange={event => {setEmail(event.target.value)}} />
            <input placeholder="Password" type="password" value={password} onChange={event => {setPassword(event.target.value)}} />
            <br></br>
            <button type="submit">Sign up</button>
        </form>
    );
};

export default Signup;