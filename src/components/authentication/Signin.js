// import useInput from "./useInput"
import React, { useState } from "react";
import { signIn } from "../../firebase/Users";
// import { useContext } from "react";
// import { UserContext } from "../../App";
import { Navigate as Redirect } from "react-router-dom";
import "./sign.css";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

//Sign in form for new users
const Signin = ({ open, setOpen }) => {
	//state
	// const currentUser = useContext(UserContext);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");

	// Checks email and passsword fields are correctly filled
	const checkInput = () => {
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

	//if checkinput return true, will sign in the user
	const handleForm = (e) => {
		e.preventDefault();
		if (checkInput(e)) {
			//makes sure to close the popup after sign in
			if(signIn(e, { email, password })){
				setOpen(false);
			}
			else{
				setError("Something went wrong.")
			}
			
		}
	};

	//<Redirect to={{ pathname: "/" }} />;

	return (
		<Dialog open={open} onClose={() => setOpen(false)}>
			<DialogTitle>SIGN IN</DialogTitle>
			<DialogContent>
				<form onSubmit={(e) => {handleForm(e)}}>
					{error ? <label style={{ color: "red" }}>{error}</label> : null}
					<TextField
						className="textfieldform"
						autoFocus
						margin="dense"
						label="Email Address"
						type="email"
						fullWidth
						variant="standard"
						value={email}
						onChange={(event) => {
							setEmail(event.target.value);
						}}
					/>
					<TextField
						className="textfieldform"
						autoFocus
						margin="dense"
						label="password"
						type="password"
						fullWidth
						variant="standard"
						value={password}
						onChange={(event) => {
							setPassword(event.target.value);
						}}
					/>
					<button className="formbtn" type="submit">
						Sign in
					</button>
				</form>
			</DialogContent>
			<DialogActions>
				<button onClick={() => setOpen(false)}>X</button>
			</DialogActions>
		</Dialog>
	);
};

export default Signin;
