/*****************************************
 * * IMPORT LIBRARIES
 *****************************************/
import React from 'react';
import {Navbar,Container, Nav, NavDropdown} from 'react-bootstrap';
import './nav.css';
import HeartSmallLogo from '../../images/kiss_logo_heart_red_small.png';
import Square from '../square/Square';
import {store_page_squares, 
  starters_page_squares,
  extras_page_squares,
  burgers_page_squares,
  cocktails_page_squares,
  combos_page_squares,
  drinks_page_squares} from '../main/data';
import Main from '../main/Main';
import Store from '../store/Store';
import MainImage from '../mainImage/MainImage';
import ProductSquare from '../productSquare/ProductSquare';
import{
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom';


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
            <NavDropdown.Item as={Link} to={"/home/starters"}>STARTERS</NavDropdown.Item>
            <NavDropdown.Item as={Link} to={"/home/extras"}>EXTRAS</NavDropdown.Item>
            <NavDropdown.Item as={Link} to={"/home/burgers"}>BURGERS</NavDropdown.Item>
            <NavDropdown.Item as={Link} to={"/home/combos"}>COMBOS</NavDropdown.Item>
            <NavDropdown.Item as={Link} to={"/home/drinks"}>DRINKS</NavDropdown.Item>
            <NavDropdown.Item as={Link} to={"/home/desserts"}>DESSERTS</NavDropdown.Item>
          </NavDropdown>
        <Nav.Link as={Link} to={"/"}>HOME PAGE</Nav.Link>
          <Nav.Link as={Link} to={"/store"}>OUR STORE</Nav.Link>
          <Nav.Link>ORDER NOW</Nav.Link>
        </Nav>
        <Nav>
          <Nav.Link>LOGIN</Nav.Link>
        </Nav>
      </Navbar.Collapse>
      </Container>
    </Navbar>
    <MainImage/>
    <Routes>
    <Route path="/home/starters" 
    element={starters_page_squares.map((item,index) => (
        <div key={index}>
          <ProductSquare data={item} />
        </div>))
 }/>


      <Route path="/home/extras"     
        element={extras_page_squares.map((item,index) => (
        <div key={index}>
          <ProductSquare data={item} />
        </div>))
       }/>
      <Route path="/home/burgers"  
      element={burgers_page_squares.map((item,index) => (
        <div key={index}>
          <ProductSquare data={item} />
        </div>))
       }/>
      <Route path="/home/combos"  
      element={combos_page_squares.map((item,index) => (
        <div key={index}>
          <ProductSquare data={item} />
        </div>))
       }/>
      <Route path="/home/drinks"  
      element={drinks_page_squares.map((item,index) => (
        <div key={index}>
          <ProductSquare data={item} />
        </div>))
       }/>
      <Route path="/home/cocktails"  
      element={cocktails_page_squares.map((item,index) => (
        <div key={index}>
          <ProductSquare data={item} />
        </div>))
       }/>

      <Route path="/" exact element={<Main/>}/>
      <Route path="/store" element={<Store/>}/>
    </Routes>
    </Router>
   );
 }
 export default Navbar1;
 


