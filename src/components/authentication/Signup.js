// import useInput from "./useInput"
import React, { useState } from "react";
import {signUp} from "../../firebase/Users";
import { useContext } from "react";
import { UserContext } from '../../App';
import { Navigate as Redirect} from "react-router-dom";
import './sign.css'

const Signup = () => {
    const currentUser = useContext(UserContext);
    const [signed, setSigned] = useState(false);
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword]=  useState("")
    const [phoneNumber, setPhoneNumber]=  useState("")
    const [city, setCity]=  useState("")
    const [street, setStreet]=  useState("")
    const [homeNumber, setHomeNumber]=  useState("")
    if(currentUser && signed){
        return <Redirect to={{pathname: '/'}}/>
    }
    return (

        <div className="signin-div">
            <form onSubmit={(e) => {signUp(e,{email, password}); setSigned(true)}}>
            <h1>SIGN UP</h1>
            <input placeholder="First Name" value={firstName} onChange={event => {setFirstName(event.target.value)}} />
            <input placeholder="Last Name" value={lastName} onChange={event => {setLastName(event.target.value)}} />
            <input placeholder="Phone Number" value={phoneNumber} onChange={event => {setPhoneNumber(event.target.value)}} />
            <input placeholder="City" value={city} onChange={event => {setCity(event.target.value)}} />
            <input placeholder="Street" value={street} onChange={event => {setStreet(event.target.value)}} />
            <input placeholder="Home Number" value={homeNumber} onChange={event => {setHomeNumber(event.target.value)}} />
            <input placeholder="Email" value={email} onChange={event => {setEmail(event.target.value)}} />
            <input placeholder="Password" type="password" value={password} onChange={event => {setPassword(event.target.value)}} />
            <br></br>
            <button type="submit">Sign up</button>
        </form>

           </div>
 
    );
};

export default Signup;