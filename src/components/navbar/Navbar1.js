/*****************************************
 * * IMPORT LIBRARIES
 *****************************************/

import React from 'react';
import {Navbar,Container, Nav, NavDropdown} from 'react-bootstrap';
import './nav.css'
import HeartSmallLogo from '../../images/kiss_logo_heart_red_small.png'

 /*****************************************
  * * CREATE REACT FUNCTION COMPONENT
  *****************************************/
 
 function Navbar1() {
   return (
    <Navbar collapseOnSelect expand="lg"  variant="dark" className="navbar">
    <Container>

    <img
          alt=""
          src={HeartSmallLogo}
          width="10" 
          height="10" 
          className="d-inline-block align-top logo-image-nav"/>
    <Navbar.Brand href="#home">KISS</Navbar.Brand>

    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    <Navbar.Collapse id="responsive-navbar-nav">
      <Nav className="me-auto">
      <NavDropdown title="MENU" id="collasible-nav-dropdown">
          <NavDropdown.Item href="#action/3.1">STARTERS</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.2">EXTRAS</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.3">BURGERS</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.3">COMBOS</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.3">DRINKS</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.3">DESSERTS</NavDropdown.Item>
        </NavDropdown>
      <Nav.Link href="#features">HOME PAGE</Nav.Link>
        <Nav.Link href="#features">OUR STORE</Nav.Link>
        <Nav.Link href="#pricing">ORDER NOW</Nav.Link>
   
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
 


