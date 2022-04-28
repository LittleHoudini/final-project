/*****************************************
 * * IMPORT LIBRARIES
 *****************************************/
import React from 'react';
import {Navbar,Container, Nav, NavDropdown} from 'react-bootstrap';
// import {Navigate as Redirect} from "react-router-dom";

import './nav.css';
import HeartSmallLogo from '../../images/kiss_logo_heart_red_small.png';
import {Link} from 'react-router-dom';
import { useContext } from "react";
import { UserContext } from '../../App';
import Signout from '../authentication/Signout';

 /*****************************************
  * * CREATE REACT FUNCTION COMPONENT
  *****************************************/
 function Navbar1(){
   const currentUser = useContext(UserContext);
   return (
    <Navbar collapseOnSelect expand="lg"  variant="dark" className="navbar">
      <Container>
      <img
            alt=""
            src={HeartSmallLogo}
            width="10" 
            height="10" 
            className="d-inline-block align-top logo-image-nav"/>
      <Navbar.Brand>KISS</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="me-auto">
        <NavDropdown title="MENU" id="collasible-nav-dropdown">
            <NavDropdown.Item as={Link} to={"/starters"}>STARTERS</NavDropdown.Item>
            <NavDropdown.Item as={Link} to={"/extras"}>EXTRAS</NavDropdown.Item>
            <NavDropdown.Item as={Link} to={"/burgers"}>BURGERS</NavDropdown.Item>
            <NavDropdown.Item as={Link} to={"/combos"}>COMBOS</NavDropdown.Item>
            <NavDropdown.Item as={Link} to={"/drinks"}>DRINKS</NavDropdown.Item>
            <NavDropdown.Item as={Link} to={"/desserts"}>DESSERTS</NavDropdown.Item>
          </NavDropdown>
        <Nav.Link as={Link} to={"/"}>HOME PAGE</Nav.Link>
          <Nav.Link as={Link} to={"/store"}>OUR STORE</Nav.Link>
          <Nav.Link>ORDER NOW</Nav.Link>
          <Nav.Link as={Link} to={"/adminmain"}>פעולות מנהל</Nav.Link>
        </Nav>
        {currentUser ?
          <Nav>
            <Nav.Link>{currentUser}</Nav.Link>
            <Signout/>
          </Nav> 
          :
          <Nav>
            <Nav.Link as={Link} to={'/signup'}>SIGN UP</Nav.Link>
            <Nav.Link as={Link} to={'/signin'}>SIGN IN</Nav.Link>
          </Nav>
        }
      </Navbar.Collapse>
      </Container>
    </Navbar>
   );
 }

 export default Navbar1;
 
 


