// import useInput from "./useInput"
import React, { useState } from "react";
import {signUp} from "../../firebase/Users";
import './sign.css'


const Signup = () => {
    const [values, setValues] = useState({
        firstName: "",
        lastName: "",
        password: "",
        phoneNumber: "",
        city: "",
        street: "",
        homeNumber: "",
        email: "",
        error: null,
      });

    const { firstName, lastName, password, phoneNumber, city,street,homeNumber,email,error } = values;

    const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value });
    };

    const handleForm = (e) => {
        e.preventDefault()
        if(firstName.length < 1 || lastName.length < 1){
            setValues({error: 'First name and last name are required'})
            return false;
        }
        else{
            signUp(e,{firstName,lastName,phoneNumber,city,street,homeNumber,email,password})
        }
        
    }
    return (
    <div className="signin-div">
        <form onSubmit={(e) => {handleForm(e)}}>
            <h1>SIGN UP</h1>
            <input placeholder="First Name" value={firstName} onChange={handleChange("firstName")} />
            <input placeholder="Last Name" value={lastName} onChange={handleChange("lastName")} />
            <input placeholder="Phone Number" value={phoneNumber} onChange={handleChange("phoneNumber")} />
            <input placeholder="City" value={city} onChange={handleChange("city")} />
            <input placeholder="Street" value={street} onChange={handleChange("street")} />
            <input placeholder="Home Number" value={homeNumber} onChange={handleChange("homeNumber")} />
            <input placeholder="Email" value={email} onChange={handleChange("email")} />
            <input placeholder="Password" type="password" value={password} onChange={handleChange("password")} />
            <br></br>
            <button type="submit">Sign up</button>
        </form>
        {error ? <p style={{ color: 'red' }}>{error}</p> : null}
    </div>
 
    );
};

export default Signup;