import React from "react";
import { NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { signOut } from "../../firebase/Users";

const Signout = () => {
	return (
		<NavDropdown.Item as={Link} to={"/"} onClick={() => signOut()}>
			SIGN OUT
		</NavDropdown.Item>
	);
};

export default Signout;
