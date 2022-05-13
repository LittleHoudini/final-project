/*****************************************
 * * IMPORT LIBRARIES
 *****************************************/
import React, { useState } from "react";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import "./nav.css";
import HeartSmallLogo from "../../images/kiss_logo_heart_red_small.png";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../App";
import Signout from "../authentication/Signout";
import { SigninPage } from "../pages/signin/SigninPage";
import { SignupPage } from "../pages/signup/SignupPage";

/*****************************************
 * * CREATE REACT FUNCTION COMPONENT
 *****************************************/
function Navbar1() {
	//state
	const currentUser = useContext(UserContext);
	const [openSignIn, setOpenSignIn] = useState(false);
	const [openSignUp, setOpenSignUp] = useState(false);

	//sign in pop up state toggle
	const handleOpenSignIn = () => {
		setOpenSignIn((prev) => !prev);
	};
	//sign up pop up state toggle
	const handleOpenSignUp = () => {
		setOpenSignUp((prev) => !prev);
	};
	return (
		<Navbar collapseOnSelect expand="lg" variant="dark" className="navbar1">
			<Container className="navbarcontainer">
				<img alt="" src={HeartSmallLogo} width="10" height="10" className="d-inline-block align-top logo-image-nav" />
				<Navbar.Brand>KISS</Navbar.Brand>
				<Navbar.Toggle aria-controls="responsive-navbar-nav" />
				<Navbar.Collapse id="responsive-navbar-nav">
					<Nav className="me-auto">
						<NavDropdown title="MENU" id="collasible-nav-dropdown">
							<NavDropdown.Item as={Link} to={"/menucategories"}>
								CATEGORIES
							</NavDropdown.Item>
							<NavDropdown.Item as={Link} to={"/starters"}>
								STARTERS
							</NavDropdown.Item>
							<NavDropdown.Item as={Link} to={"/extras"}>
								EXTRAS
							</NavDropdown.Item>
							<NavDropdown.Item as={Link} to={"/burgers"}>
								BURGERS
							</NavDropdown.Item>
							<NavDropdown.Item as={Link} to={"/combos"}>
								COMBOS
							</NavDropdown.Item>
							<NavDropdown.Item as={Link} to={"/drinks"}>
								DRINKS
							</NavDropdown.Item>
							<NavDropdown.Item as={Link} to={"/desserts"}>
								DESSERTS
							</NavDropdown.Item>
							<NavDropdown.Item as={Link} to={"/coctails"}>
								COCTAILS
							</NavDropdown.Item>
						</NavDropdown>
						<Nav.Link as={Link} to={"/"}>
							HOME PAGE
						</Nav.Link>
						<Nav.Link as={Link} to={"/store"}>
							OUR STORE
						</Nav.Link>
						<Nav.Link as={Link} to={"/orderway"}>
							ORDER NOW
						</Nav.Link>
						<Nav.Link as={Link} to={"/shoppingcart"}>
							SHOPPING CART
						</Nav.Link>
						<Nav.Link as={Link} to={"/productpopup"}>
							productpopupexample
						</Nav.Link>
						<Nav.Link as={Link} to={"/shoppingcart"}>
							shoppingcartexample
						</Nav.Link>
						<NavDropdown title="פעולות מנהל" id="collasible-nav-dropdown">
							<NavDropdown.Item as={Link} to={"/adminmain"}>
								פעולות מנהל
							</NavDropdown.Item>
							<NavDropdown.Item as={Link} to={"/reporttype"}>
								דוחות
							</NavDropdown.Item>
							<NavDropdown.Item as={Link} to={"/adminmain"}>
								זמן אמת
							</NavDropdown.Item>
							<NavDropdown.Item as={Link} to={"/adminmain"}>
								מלאי
							</NavDropdown.Item>
						</NavDropdown>
					</Nav>
					{currentUser ? (
						//if user is logged in
						<Nav>
							<NavDropdown title={currentUser} id="collasible-nav-dropdown">
								<NavDropdown.Item as={Link} to={"/profile"}>
									Profile
								</NavDropdown.Item>
							</NavDropdown>
							<Signout />
						</Nav>
					) : (
						//if user is not logged in
						<Nav>
							<Nav.Link onClick={handleOpenSignIn}>SIGN IN</Nav.Link>
							<SigninPage openSignIn={openSignIn} setOpenSignIn={setOpenSignIn} />
							<Nav.Link onClick={handleOpenSignUp}>SIGN UP</Nav.Link>
							<SignupPage openSignUp={openSignUp} setOpenSignUp={setOpenSignUp} />
						</Nav>
					)}
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
}

export default Navbar1;
