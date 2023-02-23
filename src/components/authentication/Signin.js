import React, { useState } from "react";
import { getDocument, signIn, resetPassword } from "../../firebase/Users";
import "./sign.css";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Alert from "@mui/material/Alert";

const Signin = ({ open, setOpen }) => {
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
			setError("פורמט האימייל לא תקין");
			return false;
		}
		if (password.toString().length < 6) {
			setError("הסיסמא חייבת להיות 6 תווים לפחות");
			return false;
		}
		return true;
	};

	//if checkinput return true, will sign in the user
	const handleForm = async e => {
		e.preventDefault();
		if (checkInput(e)) {
			//checks
			try {
				const emailExists = await getDocument("Person", email);
				//checks if the email exist
				if (!emailExists) {
					setError("אימייל לא תקין");
					return false;
				}

				const res = await signIn(e, { email, password });
				//if length equals 0 means there are no errors on server side
				if (res.length === 0) {
					setOpen(false);
				} else {
					setError(res);
					return false;
				}
			} catch (err) {
				console.log(err);
			}
		}
	};

	const handlePasswordReset = async e => {
		e.preventDefault();
		if(emailReset === ""){
			setError("שדה אימייל לאיפוס סיסמא לא יכול להיות ריק")
			return;
		}
		const res = await resetPassword(emailReset);
		console.log(res);
		if (res === "auth/user-not-found") {
			setError("לא קיים משתמש עם האימייל המוזן");
		} else {
			setError("");
			setEmailSent(true);
		}
	};

	return (
		<Dialog className="textFieldFormWrapper" open={open} onClose={() => setOpen(false)}>
			<DialogActions style={{width: "16%"}}>
				<button className="containerbtn exitbtn" onClick={() => setOpen(false)}>
					X
				</button>
			</DialogActions>
			<DialogTitle dir="rtl" className="DialogTitle">
				התחברות
			</DialogTitle>
			
			<DialogContent>
				<form
					dir="rtl"
					className="textFieldFormWrapper"
					onSubmit={e => {
						handleForm(e);
					}}
				>
					{error ? <label style={{ color: "red" }}>{error}</label> : null}
					<label className="label1" dir="rtl">
						דואר אלקטרוני
					</label>
					<input
						className="TextField1"
						autoFocus
						type="email"
						value={email}
						onChange={event => {
							setEmail(event.target.value);
						}}
					/>
					<label className="label1" dir="rtl">
						סיסמא
					</label>
					<input
						className="TextField1"
						autoFocus
						type="password"
						value={password}
						onChange={event => {
							setPassword(event.target.value);
						}}
					/>
					<button className="containerbtn signBtn" type="submit">
						התחבר
					</button>
				</form>
			</DialogContent>
			<DialogContent>
				<button dir="rtl" className="containerbtn frgBtn" onClick={() => setForgotPassword(true)}>
					שכחתם סיסמא?
				</button>
				{forgotPassword && (
					<form dir="rtl" onSubmit={e => handlePasswordReset(e)} className="textFieldFormWrapper">
					<label className="label1" dir="rtl">
						דואר אלקטרוני לשחזור סיסמא
					</label>
						<input
							className="TextField1"
							autoFocus
							type="email"
							value={emailReset}
							onChange={event => {
								setEmailReset(event.target.value);
							}}
						/>
						<button className="containerbtn resetPwBtn" type="submit">
							שחזור
						</button>
						{emailSent && <Alert severity="success" style={{width: "80%"}}>נשלח למייל האישי שלך מייל לשחזור סיסמא</Alert>}
					</form>
				)}
			</DialogContent>

		</Dialog>
	);
};

export default Signin;
