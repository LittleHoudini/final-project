// import useInput from "./useInput"
import React, { useState } from "react";
import {signUp} from "../../firebase/Users";
import { useContext } from "react";
import { UserContext } from '../../App';
import { Navigate as Redirect} from "react-router-dom";

const Signup = () => {
    const currentUser = useContext(UserContext);
    const [signed, setSigned] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword]=  useState("")
    if(currentUser && signed){
        return <Redirect to={{pathname: '/'}}/>
    }
    return (
        <form onSubmit={(e) => {signUp(e,{email, password}); setSigned(true)}}>
            <h1>SIGN UP</h1>
            <input placeholder="Email" value={email} onChange={event => {setEmail(event.target.value)}} />
            <input placeholder="Password" type="password" value={password} onChange={event => {setPassword(event.target.value)}} />
            <br></br>
            <button type="submit">Sign up</button>
        </form>
    );
};

export default Signup;