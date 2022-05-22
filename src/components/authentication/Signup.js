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
	//state to set errors
	const [error, setError] = useState("");

	//state for form values
	const [values, setValues] = useState({
		firstName: "",
		lastName: "",
		phoneNumber: "",
		city: "",
		street: "",
		homeNumber: "",
		email: "",
		password: "",
	});

	//deconstruct
	const { firstName, lastName, phoneNumber, city, street, homeNumber, email, password } = values;

	//handle input value change
	const handleChange = (name) => (event) => {
		setValues({ ...values, [name]: event.target.value });
	};

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
			const checkNumberExist = await phoneNumberExist(phoneNumber);
			if(checkNumberExist){
				setError("Phone number already in use.")
				return false;
			}

			// checks if email exist in database
			const getDoc = await getDocument('Person',email);
			if(getDoc){
				setError("Email address already in use.")
				return false;
			}

			//if we are here it means no document(email) and phone number is not registered.
			signUp(e, { firstName, lastName, phoneNumber, city, street, homeNumber, email, password })
				setOpen(false);
				return true;
		}	
		catch(err){
			console.log(err);
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
						onChange={handleChange("firstName")}
					/>
					<TextField
						className="textfieldform"
						autoFocus
						margin="dense"
						fullWidth
						variant="standard"
						label="Last Name"
						value={lastName}
						onChange={handleChange("lastName")}/>
					<TextField
						className="textfieldform"
						autoFocus
						margin="dense"
						fullWidth
						variant="standard"
						label="Phone Number"
						value={phoneNumber}
						onChange={handleChange("phoneNumber")}
					/>
					<TextField
						className="textfieldform"
						autoFocus
						margin="dense"
						fullWidth
						variant="standard"
						label="City"
						value={city}
						onChange={handleChange("city")}
					/>
					<TextField
						className="textfieldform"
						autoFocus
						margin="dense"
						fullWidth
						variant="standard"
						label="Street"
						value={street}
						onChange={handleChange("street")}
					/>
					<TextField
						className="textfieldform"
						autoFocus
						margin="dense"
						fullWidth
						variant="standard"
						label="Home Number"
						value={homeNumber}
						onChange={handleChange("homeNumber")}
					/>
					<TextField
						className="textfieldform"
						autoFocus
						margin="dense"
						fullWidth
						variant="standard"
						label="Email"
						value={email}
						onChange={handleChange("email")}
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
						onChange={handleChange("password")}
					/>

					<br></br>
					<a className="youraccountlink"> יש לך משתמש קיים? לחץ להתחברות</a>
					<button className="containerbtn" type="submit">
						Sign up
					</button>
				</form>
			</DialogContent>
			<DialogActions>
				<button className="closebtn" onClick={() => setOpen(false)}>X</button>
			</DialogActions>
		</Dialog>
	);
};

export default Signup;
