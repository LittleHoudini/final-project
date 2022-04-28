// import useInput from "./useInput"
import React, {useState} from "react";
import {signIn} from "../../firebase/Users";
import { useContext } from "react";
import { UserContext } from '../../App';
import {Navigate as Redirect} from "react-router-dom";

//Sign in form for new users
const Signin = (props) => {
    const currentUser = useContext(UserContext);
    const [signed, setSigned] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword]=  useState("")
    if(currentUser && signed){
        return <Redirect to={{pathname: '/'}}/>
    }
    return (
        <form onSubmit={(e) => {signIn(e,{email, password}); setSigned(true)}}>
            <h1>SIGN IN</h1>
            <input placeholder="Email" value={email} onChange={event => {setEmail(event.target.value)}} />
            <input placeholder="Password" type="password" value={password} onChange={event => {setPassword(event.target.value)}} />
            <br></br>
            <button type="submit">Sign in</button>
        </form>
    );
};

export default Signin;