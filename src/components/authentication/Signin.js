import React, { useState } from "react";
import { getDocument, signIn,resetPassword } from "../../firebase/Users";
import "./sign.css";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { passwordMatch } from "../../firebase/Users";
import Alert from '@mui/material/Alert';

//Sign in form for new users
const Signin = ({ open, setOpen }) => {
	//state
	// const currentUser = useContext(UserContext);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");

	const [forgotPassword, setForgotPassword] = useState(false);
	const [emailReset, setEmailReset] = useState("");

	const [emailSent, setEmailSent] = useState(false);
	

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
	const handleForm = async (e) => {
		e.preventDefault();
		if (checkInput(e)) {
			//checks
			try{

				const emailExists = await getDocument('Person',email)
				//checks if the email exist
				if(!emailExists){
					setError("Incorrect email.")
					return false;
				}
				// const pwMatched = await passwordMatch(email,password);
				// if(!pwMatched){
				// 	setError("Incorrect Password")
				// 	return false;
				// }
	
				const res = await signIn(e, { email, password });
				console.log(res);
				if(res.length === 0){
					setOpen(false);
				}
				else{
					setError(res);
					return false;
				}

			}
			catch(err){
				console.log(err);
			}

		}
	};


	const handlePasswordReset = async (e) => {
		e.preventDefault();
		const res = await resetPassword(emailReset);
		console.log(res);
		if(res === 'auth/user-not-found'){
			setError("There is no user with this email.")
		}
		else{
			setEmailSent(true);
		}
	}
	//<Redirect to={{ pathname: "/" }} />;

	return (
		<Dialog className="textFieldFormWrapper" open={open} onClose={() => setOpen(false)}>
			<DialogTitle className="DialogTitle">SIGN IN</DialogTitle>
			<DialogContent>
				<form className="textFieldFormWrapper" onSubmit={(e) => {handleForm(e)}}>
					{error ? <label style={{ color: "red" }}>{error}</label> : null}
					<TextField
						className="textFieldForm"
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
						className="textFieldForm"
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
					<button className="containerbtn" type="submit">
						Sign in
					</button>
				</form>
			</DialogContent>
			<DialogContent>
			<button className="containerbtn" onClick={() => setForgotPassword(true)}>
						Forgot Password?
			</button>
			{forgotPassword && 
						<form onSubmit={(e) => handlePasswordReset(e)}>
							<TextField className="textFieldForm" autoFocus margin="dense" label="Email Address"  type="email" fullWidth variant="standard" value={emailReset}
							onChange={(event) => {setEmailReset(event.target.value)}}/>
							<button className="containerbtn" type="submit">Reset Password</button>
							{emailSent && <Alert severity="success">Check your inbox for further instructions.</Alert>}
						</form>
						}
			</DialogContent>
			<DialogActions>
				<button className="closebtn"  onClick={() => setOpen(false)}>X</button>
			</DialogActions>
		</Dialog>
	);
};

export default Signin;