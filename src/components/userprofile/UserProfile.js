import React, { useEffect, useState, useContext } from "react";
import "./userprofile.css";
import { UserContext } from "../../App";
import { getEmailForInfoUpdate, getDocument, phoneNumberExistForInfoUpdate, updateInfo } from "../../firebase/Users";

export const UserProfile = () => {
	//context to pass down current user logged in
	const currentUser = useContext(UserContext);
	const [error, setError] = useState("");
	// const [passwordShown, setPasswordShown] = useState(false);
	const [values, setValues] = useState({
		firstName: "",
		lastName: "",
		phoneNumber: "",
		city: "",
		street: "",
		homeNumber: "",
		email: "",
		// password: "",
	});
	//deconstruct object values
	const { firstName, lastName, phoneNumber, city, street, homeNumber, email, password } = values;

	//changing state based on input
	const handleChange = name => event => {
		setValues({ ...values, [name]: event.target.value });
	};

	const checkInput = e => {
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

		return true;
	};

	const handleForm = async e => {
		e.preventDefault();
		if (checkInput(e)) {
			try {
				//if we manage to get the document(email), means the user already registered
				const checkNumberExist = await phoneNumberExistForInfoUpdate(currentUser, phoneNumber);
				if (checkNumberExist) {
					setError("Phone number already in use.");
					return false;
				}

				// checks if email exist in database
				const getDoc = await getEmailForInfoUpdate(currentUser, email);
				if (getDoc) {
					setError("Email address already in use.");
					return false;
				}

				//if we are here it means no document(email) and phone number is not registered.
				updateInfo(currentUser, values);
				return true;
			} catch (err) {
				console.log(err);
			}
		}
	};

	// fetching user data based on current user logged in
	useEffect(() => {
		let isMounted = true;
		if (currentUser) {
			//fetch data from collection 'Person' if theres user logged in
			getDocument("Person", currentUser)
				.then(result => {
					if (isMounted) {
						setValues(result);
					}
				})
				.catch(err => {
					console.log(err);
				});
		}
		return () => {
			isMounted = false;
		};
	}, [currentUser]);

	return (
		<div className="wrapper2">
			<div className="titleDiv">
				<h1>{currentUser} ברוכ/ה הבאה </h1>
				<p>
					על מנת לעדכן את פרטי המשתמש המחובר יש לשנות את תוכן הערך וללחוץ על כפתור השמירה. אנא וודאו שהכתובת במערכת זוהי הכתובת העדכנית
					שלכם, תודה.
				</p>
			</div>
			{/* <div className="personalDataBox"> */}
			
				<section className="personalDetailsUpdate">
					
					<form onSubmit={e => {handleForm(e);}}>
					{error ? <label style={{ color: "red" }}>{error}</label> : null}
						<label>שם פרטי</label>
						<input placeholder="First Name" value={firstName} onChange={handleChange("firstName")} />
						<label>שם משפחה</label>
						<input placeholder="Last Name" value={lastName} onChange={handleChange("lastName")} />
						<label>מספר טלפון</label>
						<input placeholder="Phone Number" value={phoneNumber} onChange={handleChange("phoneNumber")} />
						<label>עיר</label>
						<input placeholder="City" value={city} onChange={handleChange("city")} />
						<label>רחוב</label>
						<input placeholder="Street" value={street} onChange={handleChange("street")} />
						<label>מספר בית</label>
						<input placeholder="Home Number" value={homeNumber} onChange={handleChange("homeNumber")} />
						<button type="submit">שמירת פרטים</button>
					</form>
					
				</section>
			</div>
		// </div>
	);
};
