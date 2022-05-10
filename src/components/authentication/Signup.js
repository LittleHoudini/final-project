// import useInput from "./useInput"
import React, { useState } from "react";
import {signUp} from "../../firebase/Users";
import './sign.css'
import { useContext } from "react";
import { UserContext } from '../../App';
import {Navigate as Redirect} from "react-router-dom";

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
    const [error, setError] = useState("");


    const checkInput = (e) => {
        e.preventDefault();
        if(firstName.toString().length < 1){
            setError('First name required')
            return false;
        }
        if(lastName.toString().length < 1){
            setError('Last name required')
            return false;
        }

        if (phoneNumber.toString().length !== 10){
            setError('Phone number should be 10 digits')
            return false;
        }

        if(city.toString().length < 1){
            setError('City required')
            return false;
        }

        if(street.toString().length < 1){
            setError('Street required')
            return false;
        }

        if(Number(homeNumber) < 1){
            setError('Home number required')
            return false;
        }

        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(!re.test(email)){
            setError("Incorrect email format")
        }

        if(password.toString().length < 6){
            setError('Password should be at least 6 digits')
            return false;
        }
        return true;

    }

    const handleForm = (e) => {
        e.preventDefault();        
        if(checkInput(e)){            
            signUp(e,{firstName,lastName,phoneNumber,city,street,homeNumber,email,password})
        }
    }
    
    if(currentUser && signed){
        return <Redirect to={{pathname: '/'}}/>
    }

    return (
    <div className="signin-div">
        <form onSubmit={(e) => {handleForm(e); setSigned(true)}}>
            <h1>SIGN UP</h1>
            {error ? <label style={{ color: 'red' }}>{error}</label> : null}
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