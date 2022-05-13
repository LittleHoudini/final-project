import React, { useEffect, useState } from "react";
import "./userprofile.css";
import HeartSmallLogo from "../../images/kiss_logo_heart_red_small.png";
import { useContext } from "react";
import { UserContext } from "../../App";
import { getDocument } from "../../firebase/Users";
import { FiEye } from "react-icons/fi";

export const UserProfile = () => {
	//context to pass down current user logged in
	const currentUser = useContext(UserContext);
	const [passwordShown, setPasswordShown] = useState(false);
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
	//deconstruct object values
	const { firstName, lastName, phoneNumber, city, street, homeNumber, email, password } = values;

	//changing state based on input
	const handleChange = (name) => (event) => {
		setValues({ ...values, [name]: event.target.value });
	};

	// fetching user data based on current user logged in
	useEffect(() => {
		let isMounted = true;
		if (currentUser) {
			//fetch data from collection 'Person' if theres user logged in
			getDocument("Person", currentUser)
				.then((result) => {
					console.table(result);
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

	const togglePasswordVisiblity = () => {
		setPasswordShown(passwordShown ? false : true);
	};

	return (
		<div className="wrapper2">
			<div className="wrappershoppingcart">
				<section className="orderdetails">
					<div className="userpfp">
						<br></br>
						<p className="orderdetail"> ברוכ\ה הבא </p>
						<br></br>
						<p className="orderdetail"> לעריכת פרטים אישיים </p>
					</div>

					<div className="customerpfp">
						<img alt="" src={HeartSmallLogo} width="10" height="10" className="d-inline-block align-top align-right logo-image-nav" />
					</div>
				</section>

				<section className="personaldetailsupdate">
					<h1>שינוי פרטים אישיים </h1>
					<form>
						<input placeholder="First Name" value={firstName} onChange={handleChange("firstName")} />
						<input placeholder="Last Name" value={lastName} onChange={handleChange("lastName")} />
						<input placeholder="Phone Number" value={phoneNumber} onChange={handleChange("phoneNumber")} />
						<input placeholder="City" value={city} onChange={handleChange("city")} />
						<input placeholder="Street" value={street} onChange={handleChange("street")} />
						<input placeholder="Home Number" value={homeNumber} onChange={handleChange("homeNumber")} />
						<input placeholder="Email" value={email} onChange={handleChange("email")} />
						<input placeholder="Password" type={passwordShown ? "text" : "password"} value={password} onChange={handleChange("password")} />
						<FiEye onClick={togglePasswordVisiblity} />
						<br></br>
					</form>
					<button className="savebtn" type="submit">
						שמירת פרטים
					</button>
				</section>
				<section className="orderslistcuntainer">
					<div className="orderslist">
						<p className="orderdetail">מספר הזמנה</p>
						<p className="orderdetail"> תאריך </p>
						<p className="orderdetail"> סכום הזמנה </p>
					</div>
				</section>

				<section className="savebtncontainer">
					<button className="savebtn">שמירה</button>
				</section>
			</div>
		</div>
	);
};
