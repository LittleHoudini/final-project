/*****************************************
 * * IMPORT LIBRARIES
 *****************************************/

import React from 'react';
import {Navbar,Container, Nav, NavDropdown} from 'react-bootstrap';


 /*****************************************
  * * CREATE REACT FUNCTION COMPONENT
  *****************************************/
 
 function Navbar1() {
   return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
    <Container>
    <Navbar.Brand href="#home">KISSVIBE</Navbar.Brand>
    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    <Navbar.Collapse id="responsive-navbar-nav">
      <Nav className="me-auto">
        <Nav.Link href="#features">Contact Us</Nav.Link>
        <Nav.Link href="#pricing">About</Nav.Link>
        <NavDropdown title="Menu" id="collasible-nav-dropdown">
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
 


