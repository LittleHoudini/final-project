import React, { useState } from "react";
import { getDocument, signUp } from "../../firebase/Users";
import "./sign.css";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { phoneNumberExist } from "../../firebase/Users";

const Signup = ({ open, setOpen }) => {
	//state
	const [email, setEmail] = useState("");
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [password, setPassword] = useState("");
	const [phoneNumber, setPhoneNumber] = useState("");
	const [city, setCity] = useState("");
	const [street, setStreet] = useState("");
	const [homeNumber, setHomeNumber] = useState("");
	const [error, setError] = useState("");


	// SignUp_Handle

	//checks all the fields are correctly filled
	const checkInput = (e) => {
		e.preventDefault();
		if (firstName.toString().length < 1) {
			setError("First name required");
			return false;
		}
		if (lastName.toString().length < 1) {
			setError("Last name required");
			return false;
		}

		if (phoneNumber.toString().length !== 10) {
			setError("Phone number should be 10 digits");
			return false;
		}

		if (city.toString().length < 1) {
			setError("City required");
			return false;
		}

		if (street.toString().length < 1) {
			setError("Street required");
			return false;
		}

		if (Number(homeNumber) < 1) {
			setError("Home number required");
			return false;
		}

		let re =
			/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		if (!re.test(email)) {
			setError("Incorrect email format");
			return false;
		}

		if (password.toString().length < 6) {
			setError("Password should be at least 6 digits");
			return false;
		}
		return true;
	};

	//if checkinput return true, sign up the user
	const handleForm = async (e) => {
		e.preventDefault();
		if (checkInput(e)) {
		try{
			//if we manage to get the document(email), means the user already registered
			if(await phoneNumberExist(phoneNumber)){
				setError("Phone number already in use.")
				return false;
			}

			if(await getDocument('Person',email)){
				setError("Email address already in use.")
				return false;
			}

			//if we are here it means no document(email) found.
			signUp(e, { firstName, lastName, phoneNumber, city, street, homeNumber, email, password })
				setOpen(false);
				return true;
		}	
		catch(err){
			console.log(error);
		}
		}
	};



	return (
		<Dialog open={open} onClose={() => setOpen(false)}>
			<DialogTitle>SIGN UP</DialogTitle>
			<DialogContent>
				<form className="sign-div" onSubmit={(e) => { handleForm(e) }}>
					{error ? <label style={{ color: "red" }}>{error}</label> : null}
					<TextField
						className="textfieldform"
						autoFocus
						margin="dense"
						fullWidth
						variant="standard"
						label="First Name"
						value={firstName}
						onChange={(event) => {
							setFirstName(event.target.value);
						}}
					/>
					<TextField
						className="textfieldform"
						autoFocus
						margin="dense"
						fullWidth
						variant="standard"
						label="Last Name"
						value={lastName}
						onChange={(event) => {
							setLastName(event.target.value);
						}}
					/>
					<TextField
						className="textfieldform"
						autoFocus
						margin="dense"
						fullWidth
						variant="standard"
						label="Phone Number"
						value={phoneNumber}
						onChange={(event) => {
							setPhoneNumber(event.target.value);
						}}
					/>
					<TextField
						className="textfieldform"
						autoFocus
						margin="dense"
						fullWidth
						variant="standard"
						label="City"
						value={city}
						onChange={(event) => {
							setCity(event.target.value);
						}}
					/>
					<TextField
						className="textfieldform"
						autoFocus
						margin="dense"
						fullWidth
						variant="standard"
						label="Street"
						value={street}
						onChange={(event) => {
							setStreet(event.target.value);
						}}
					/>
					<TextField
						className="textfieldform"
						autoFocus
						margin="dense"
						fullWidth
						variant="standard"
						label="Home Number"
						value={homeNumber}
						onChange={(event) => {
							setHomeNumber(event.target.value);
						}}
					/>
					<TextField
						className="textfieldform"
						autoFocus
						margin="dense"
						fullWidth
						variant="standard"
						label="Email"
						value={email}
						onChange={(event) => {
							setEmail(event.target.value);
						}}
					/>
					<TextField
						className="textfieldform"
						autoFocus
						margin="dense"
						fullWidth
						variant="standard"
						label="Password"
						type="password"
						value={password}
						onChange={(event) => {
							setPassword(event.target.value);
						}}
					/>

					<br></br>
					<button className="formbtn" type="submit">
						Sign up
					</button>
				</form>
			</DialogContent>
			<DialogActions>
				<button onClick={() => setOpen(false)}>X</button>
			</DialogActions>
		</Dialog>
	);
};

export default Signup;
