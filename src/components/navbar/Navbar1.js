/*****************************************
 * * IMPORT LIBRARIES
 *****************************************/
import React from 'react';
import {Navbar,Container, Nav, NavDropdown} from 'react-bootstrap';
import './nav.css'
import HeartSmallLogo from '../../images/kiss_logo_heart_red_small.png'
import Square from '../square/Square';
import {store_page_squares} from '../main/data'
import{
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom'
import Main from '../main/Main';
 /*****************************************
  * * CREATE REACT FUNCTION COMPONENT
  *****************************************/
 
 function Navbar1() {
   return (
     <Router>
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
            <NavDropdown.Item>STARTERS</NavDropdown.Item>
            <NavDropdown.Item>EXTRAS</NavDropdown.Item>
            <NavDropdown.Item>BURGERS</NavDropdown.Item>
            <NavDropdown.Item>COMBOS</NavDropdown.Item>
            <NavDropdown.Item>DRINKS</NavDropdown.Item>
            <NavDropdown.Item>DESSERTS</NavDropdown.Item>
          </NavDropdown>
        <Nav.Link as={Link} to={"/home"}>HOME PAGE</Nav.Link>
          <Nav.Link as={Link} to={"/store"}>OUR STORE</Nav.Link>
          <Nav.Link>ORDER NOW</Nav.Link>
        </Nav>
        <Nav>
          <Nav.Link>LOGIN</Nav.Link>
        </Nav>
      </Navbar.Collapse>
      </Container>
    </Navbar>

    <Routes>
    <Route path="/home" element={<Main/>}/>
      {/* <Route path="/store" element={<Square data={squares[0]}/>}/>  */}
      <Route path="/store" element={
        store_page_squares.map((item,index) => (
          <div key={index}>
            <Square data={item} />
          </div>
        ))
      }/>
    </Routes>

    </Router>
      
   );
 }
 
 export default Navbar1;
 


