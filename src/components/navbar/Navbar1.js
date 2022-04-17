/*****************************************
 * * IMPORT LIBRARIES
 *****************************************/

import React from 'react';
import {Navbar,Container, Nav, NavDropdown} from 'react-bootstrap';
import './nav.css'
import LogoImage from '../../images/kiss_logo.png'

 /*****************************************
  * * CREATE REACT FUNCTION COMPONENT
  *****************************************/
 
 function Navbar1() {
   return (
    <Navbar collapseOnSelect expand="lg"  variant="dark" className="navbar">
    <Container>

    <img
        src={LogoImage}
        className="d-inline-block align-top logo-image-nav"
        alt="logo nav"
      />
    <Navbar.Brand href="#home">KISSVIBE</Navbar.Brand>

    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    <Navbar.Collapse id="responsive-navbar-nav">
      <Nav className="me-auto">
      <Nav.Link href="#features">HOME PAGE</Nav.Link>
        <Nav.Link href="#features">OUR STORE</Nav.Link>
        <Nav.Link href="#pricing">ORDER NOW</Nav.Link>
        <NavDropdown title="MENU" id="collasible-nav-dropdown">
          <NavDropdown.Item href="#action/3.1">STARTERS</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.2">EXTRAS</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.3">BURGERS</NavDropdown.Item>
        </NavDropdown>
      </Nav>
      <Nav>
        <Nav.Link href="#login">LOGIN</Nav.Link>
      </Nav>
    </Navbar.Collapse>
    </Container>
  </Navbar>
   );
 }
 
 export default Navbar1;
 


