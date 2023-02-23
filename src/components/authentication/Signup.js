import React, { useState } from "react";
import { getDocument, signUp,phoneNumberExist } from "../../firebase/Users";
import "./sign.css";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

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
	const handleChange = name => event => {
		setValues({ ...values, [name]: event.target.value });
	};

	// SignUp_Handle

	//checks all the fields are correctly filled
	const checkInput = e => {
		e.preventDefault();
		if (firstName.toString().length < 1) {
			setError("שם פרטי לא תקין");
			return false;
		}
		if (lastName.toString().length < 1) {
			setError("שם משפחה לא תקין");
			return false;
		}

		if (phoneNumber.toString().length !== 10) {
			setError("מספר טלפון חייב להיות 10 ספרות");
			return false;
		}

		if (city.toString().length < 1) {
			setError("עיר לא תקינה");
			return false;
		}

		if (street.toString().length < 1) {
			setError("רחוב לא תקין");
			return false;
		}

		if (Number(homeNumber) < 1) {
			setError("מספר בית לא תקין ");
			return false;
		}

		let re =
			/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		if (!re.test(email)) {
			setError("פורמט אימייל לא תקין");
			return false;
		}

		if (password.toString().length < 6) {
			setError("הסיסמא חייבת להיות לפחות 6 תווים");
			return false;
		}
		return true;
	};

	//if checkinput return true, sign up the user
	const handleForm = async e => {
		e.preventDefault();
		if (checkInput(e)) {
			try {
				//if we manage to get the document(email), means the user already registered
				const checkNumberExist = await phoneNumberExist(phoneNumber);
				if (checkNumberExist) {
					setError("המספר טלפון כבר בשימוש");
					return false;
				}

				// checks if email exist in database
				const getDoc = await getDocument("Person", email);
				if (getDoc) {
					setError("כתובת האימייל כבר בשימוש");
					return false;
				}

				//if we are here it means no document(email) and phone number is not registered.
				signUp(e, { firstName, lastName, phoneNumber, city, street, homeNumber, email, password });
				setOpen(false);
				return true;
			} catch (err) {
				console.log(err);
			}
		}
	};

	return (
		<Dialog open={open} onClose={() => setOpen(false)}>
			<DialogTitle dir="rtl" className="DialogTitle">
				רישום משתמש חדש
			</DialogTitle>
			<DialogContent>
				<form
					dir="rtl"
					className="sign-div"
					onSubmit={e => {
						handleForm(e);
					}}
				>
					{error ? <label style={{ color: "red" }}>{error}</label> : null}
					<label className="label1"> שם פרטי</label>
					<input
						className="TextField1"
						margin="dense"
						direction="rtl"
						value={firstName}
						onChange={handleChange("firstName")}
						variant="outlined"
					/>
					<label className="label1"> שם משפחה</label>
					<input className="TextField1" margin="dense" direction="rtl" value={lastName} onChange={handleChange("lastName")} />
					<label className="label1"> מספר טלפון נייד</label>
					<input className="TextField1" margin="dense" direction="rtl" value={phoneNumber} onChange={handleChange("phoneNumber")} />
					<label className="label1"> עיר</label>
					<input className="TextField1" margin="dense" direction="rtl" value={city} onChange={handleChange("city")} />
					<label className="label1"> רחוב</label>
					<input className="TextField1" margin="dense" direction="rtl" value={street} onChange={handleChange("street")} />
					<label className="label1"> מספר בית</label>
					<input className="TextField1" direction="rtl" value={homeNumber} onChange={handleChange("homeNumber")} />
					<label className="label1">דואר אלקטרוני</label>
					<input className="TextField1" direction="rtl" value={email} onChange={handleChange("email")} />
					<label className="label1"> סיסמא</label>
					<input className="TextField1" margin="dense" direction="rtl" value={password} onChange={handleChange("password")} />
					<button className="containerbtn signBtn" type="submit">
						הרשם
					</button>
				</form>
			</DialogContent>
			<DialogActions>
				<button className="containerbtn" onClick={() => setOpen(false)}>
					X
				</button>
			</DialogActions>
		</Dialog>
	);
};

export default Signup;
