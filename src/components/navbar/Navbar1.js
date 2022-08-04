/*****************************************
 * * IMPORT LIBRARIES
 *****************************************/
 import React, { useEffect, useState } from "react";
 import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
 import "./nav.css";
 import HeartSmallLogo from "../../images/kiss_logo_heart_red_small.png";
 import { Link } from "react-router-dom";
 import { useContext } from "react";
 import { UserContext } from "../../App";
 import Signout from "../authentication/Signout";
 import { SigninPage } from "../pages/signin/SigninPage";
 import { SignupPage } from "../pages/signup/SignupPage";
 import { getUserClassification } from "../../firebase/Users";
 import { useCart} from "react-use-cart";
 
 /*****************************************
  * * CREATE REACT FUNCTION COMPONENT
  *****************************************/
 function Navbar1() {
	 //state
	 const currentUser = useContext(UserContext);
	 const [openSignIn, setOpenSignIn] = useState(false);
	 const [openSignUp, setOpenSignUp] = useState(false);
	 const [openOrderWayPage, setOpenOrderWayPage] = useState(false);
	 const [userType, setUserType] = useState("");
	 const {totalUniqueItems} = useCart();
 
 
	 useEffect(() => {
		 if (currentUser) {
			 //checks user classification to determine if hes admin or worker
			 getUserClassification(currentUser)
				 .then(result => {
					 console.log("result = " , result);
					 setUserType(result);
				 })
				 .catch(err => {
					 console.log("error in fetching classification : ", err);
				 });
		 }
		 return () => {
			 setUserType("");
		 };
	 }, [currentUser]);
 
	 const checkUserType = () => {
		 if(userType === 'admin'){
			 return (
				 <NavDropdown title="Admin" id="collasible-nav-dropdown">
				 <NavDropdown.Item as={Link} to={"/admin/stock"}>
					 Stock
				 </NavDropdown.Item>
				 <NavDropdown.Item as={Link} to={"/admin/manageorders"}>
					 Manage Orders
				 </NavDropdown.Item>
				 <NavDropdown.Item as={Link} to={"/admin/addproduct"}>
					 Add Product
				 </NavDropdown.Item>
			 </NavDropdown>
			 )
		 }
		 if(userType === 'worker'){
			 return <Nav><Nav.Link>WORKER</Nav.Link></Nav>
		 }
		 return null;
	 };
	 const type = checkUserType();
 
	 //sign in pop up state toggle
	 const handleOpenSignIn = () => {
		 setOpenSignIn(prev => !prev);
	 };
	 //sign up pop up state toggle
	 const handleOpenSignUp = () => {
		 setOpenSignUp(prev => !prev);
	 };
	 //order way pop up state toggle
	 const handleOpenOrderWayPage = () => {
		 setOpenOrderWayPage(prev => !prev);
	 };
 
	 return (
		 <Navbar collapseOnSelect expand="lg" variant="dark" className="navbar1">
			 <Container className="navbarcontainer">
				 <img alt="" src={HeartSmallLogo} width="10" height="10" className="d-inline-block align-top logo-image-nav" />
				 <Navbar.Brand>KISS</Navbar.Brand>
				 <Navbar.Toggle aria-controls="responsive-navbar-nav" />
				 <Navbar.Collapse id="responsive-navbar-nav">
					 <Nav className="me-auto">
					 <Nav.Link as={Link} to={"/"}>
							 HOME PAGE
						 </Nav.Link>
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
						 <Nav.Link as={Link} to={"/store"}>
							 OUR STORE
						 </Nav.Link>
				  
						 <Nav.Link as={Link} to={"/shoppingcart"}>
							 {
								 totalUniqueItems > 0 ? `SHOPPING CART (${totalUniqueItems})` : 'SHOPPING CART'
							 }
						 </Nav.Link>
					
						 
					 </Nav>
					 {currentUser ? (
						 //if user is logged in
						 <Nav>
							 <NavDropdown title={currentUser} id="collasible-nav-dropdown">
								 <NavDropdown.Item as={Link} to={"/profile"}>
									 Profile
								 </NavDropdown.Item>
								 <NavDropdown.Item as={Link} to={"/orders"}>
									 My Orders
								 </NavDropdown.Item>
								 <Signout />
							 </NavDropdown>
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
					 {type}
				 </Navbar.Collapse>
			 </Container>
		 </Navbar>
	 );
 }
 
 export default Navbar1;
 