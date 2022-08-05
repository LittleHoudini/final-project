import React, { useEffect, useState } from "react";
import "./userprofile.css";
// import HeartSmallLogo from "../../images/kiss_logo_heart_red_small.png";
import { useContext } from "react";
import { UserContext } from "../../App";
import { getEmailForInfoUpdate, getDocument } from "../../firebase/Users";
import { phoneNumberExistForInfoUpdate } from "../../firebase/Users";
import { updateInfo } from "../../firebase/Users";
// import { FiEye } from "react-icons/fi";

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
	const handleChange = (name) => (event) => {
		setValues({ ...values, [name]: event.target.value });
	};

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

		return true;
	};

	const handleForm = async (e) => {
		e.preventDefault();
		if (checkInput(e)) {
		try{
			//if we manage to get the document(email), means the user already registered
			const checkNumberExist = await phoneNumberExistForInfoUpdate(currentUser,phoneNumber);
			if(checkNumberExist){
				setError("Phone number already in use.")
				return false;
			}

			// checks if email exist in database
			const getDoc = await getEmailForInfoUpdate(currentUser, email);
			if(getDoc){
				setError("Email address already in use.")
				return false;
			}

			//if we are here it means no document(email) and phone number is not registered.
			updateInfo(currentUser, values)
			return true;
		}	
		catch(err){
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
				.then((result) => {
					// console.table(result);
					//console.log(result.classification);
					if (isMounted) {
						//set the values to input fields
						setValues(result);
					}
				})
				.catch((err) => {
					console.log(err);
				});
		}
		return () => {
			isMounted = false;
		};
	}, [currentUser]);

	// const togglePasswordVisiblity = () => {
	// 	setPasswordShown(passwordShown ? false : true);
	// };

	return (
		<div className="wrapper2">
			<div className="wrappershoppingcart">
				<section className="personalDetailsUpdate">
				<h1> ברוכ/ה הבאה </h1>
				<h1> {currentUser} </h1>
					<h1>שינוי פרטים אישיים </h1>
					{error ? <label style={{ color: "red" }}>{error}</label> : null}
					<form onSubmit={(e) => {handleForm(e)}}>
						<label>First Name</label>
						<input  placeholder="First Name" value={firstName} onChange={handleChange("firstName")}/>
						<label>Last Name</label>
						<input placeholder="Last Name" value={lastName} onChange={handleChange("lastName")} />
						<label>Phone Number</label>
						<input placeholder="Phone Number" value={phoneNumber} onChange={handleChange("phoneNumber")} />
						<label>City</label>
						<input placeholder="City" value={city} onChange={handleChange("city")} />
						<label>Street</label>
						<input placeholder="Street" value={street} onChange={handleChange("street")} />
						<label>Home Number</label>
						<input placeholder="Home Number" value={homeNumber} onChange={handleChange("homeNumber")} />
						{/* <label>Email</label> */}
						{/* <input placeholder="Email" value={email} onChange={handleChange("email")} /> */}

						
						{/* <input  placeholder="Password" type={passwordShown ? "text" : "password"} value={password} onChange={handleChange("password")} /> */}
						{/* <FiEye onClick={togglePasswordVisiblity} /> */}
						<br></br>
						<button className="savebtn" type="submit">
						שמירת פרטים
					</button>
					</form>

				</section>
			</div>
		</div>
	);
};
