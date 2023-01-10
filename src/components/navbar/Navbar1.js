/*****************************************
 * * IMPORT LIBRARIES
 *****************************************/
import React, { useEffect, useState, useContext } from "react";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import "./nav.css";
import { Link } from "react-router-dom";
import { UserContext } from "../../App";
import Signout from "../authentication/Signout";
import { SigninPage } from "../pages/signin/SigninPage";
import { SignupPage } from "../pages/signup/SignupPage";
import { getUserClassification } from "../../firebase/Users";
import { useCart } from "react-use-cart";
import { getMisc } from "../../firebase/Orders";
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
/*****************************************
 * * CREATE REACT FUNCTION COMPONENT
 *****************************************/
const StyledBadge = styled(Badge)(({ theme }) => ({
	'& .MuiBadge-badge': {
	//   border: `2px solid ${theme.palette.background.paper}`,
	  padding: '0 4px',
	},
  }));

function Navbar1() {
	//state
	const currentUser = useContext(UserContext);
	const [openSignIn, setOpenSignIn] = useState(false);
	const [openSignUp, setOpenSignUp] = useState(false);
	const [image, setImage] = useState("");
	const [userType, setUserType] = useState("");
	const { totalUniqueItems } = useCart();

	useEffect(() => {
		let isMounted = true;
		if (isMounted) {
			getMisc("NavbarImage")
				.then(res => {
					setImage(res.image);
				})
				.catch(err => console.log(err));
		}
		return () => (isMounted = false);
	}, []);

	useEffect(() => {
		if (currentUser) {
			//checks user classification to determine if hes admin or worker
			getUserClassification(currentUser)
				.then(result => {
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
		if (userType === "admin") {
			return (
				<Nav className="navAdmin">
					<NavDropdown title="Admin" id="collasible-nav-dropdown">
						<NavDropdown.Item as={Link} to={"/admin/panel"}>
							Admin Panel
						</NavDropdown.Item>
						<NavDropdown.Item as={Link} to={"/admin/stock"}>
							Stock
						</NavDropdown.Item>
						<NavDropdown.Item as={Link} to={"/admin/manageorders"}>
							Manage Orders
						</NavDropdown.Item>
						<NavDropdown.Item as={Link} to={"/admin/addproduct"}>
							Add Product
						</NavDropdown.Item>
						<NavDropdown.Item as={Link} to={"/admin/chart"}>
							Chart
						</NavDropdown.Item>
						<NavDropdown.Item as={Link} to={"/admin/weeklychart"}>
							Weekly Chart
						</NavDropdown.Item>
					</NavDropdown>
				</Nav>
			);
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

	return (
		<Navbar collapseOnSelect expand="lg" variant="dark" className="navbar1">
			<Container className="navbarcontainer">
				<img alt="" src={image} width="10" height="10" className="d-inline-block align-top logo-image-nav" />
				<Navbar.Brand>KISS</Navbar.Brand>
				<Navbar.Toggle aria-controls="responsive-navbar-nav" />
				<Navbar.Collapse id="responsive-navbar-nav">
					<Nav className="me-auto">
						{userType === 'admin' ? 						
						<Nav.Link as={Link} to={"/admin/panel"}>
							ADMIN PANEL
						</Nav.Link> : null}
						
						<Nav.Link as={Link} to={"/home"}>
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

						{/* <Nav.Link as={Link} to={"/shoppingcart"}>
							{totalUniqueItems > 0 ? `SHOPPING CART (${totalUniqueItems})` : "SHOPPING CART"}
						</Nav.Link> */}

						<Nav.Link as={Link} to={"/shoppingcart"}>
							<StyledBadge badgeContent={totalUniqueItems} color="secondary">
								<ShoppingCartIcon />
							</StyledBadge>
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
