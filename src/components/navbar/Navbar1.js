/*****************************************
 * * IMPORT LIBRARIES
 *****************************************/
import React from 'react';
import {Navbar,Container, Nav, NavDropdown} from 'react-bootstrap';
import './nav.css';
import HeartSmallLogo from '../../images/kiss_logo_heart_red_small.png';
import Main from '../main/Main';
import CreateSquare from '../createSquare/CreateSquare';
import * as products from '../../data/products.js';
import MainImage from '../mainImage/MainImage';
import styles from './mainform.module.css'
import * as adminmain from '../../data/adminmain.js'
import PopUpConnection from '../popupconnection/popUpConnection';
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
          <Nav.Link as={Link} to={"/home/adminmain"}>פעולות מנהל</Nav.Link>
        </Nav>
        <Nav>
        <Nav.Link as={Link} to={"/home/login"}>LOGIN</Nav.Link>
    
        </Nav>
      </Navbar.Collapse>
      </Container>
    </Navbar>
    <MainImage/>
    <div className={styles.wrapper}> 
    <Routes>      
      <Route  path="/home/starters" element={<CreateSquare data={products.starters_page_squares} type="productsquare"/>}/>
      <Route path="/home/starters" element={<CreateSquare data={products.starters_page_squares} type="productsquare"/>}/>
      <Route path="/home/extras" element={<CreateSquare data={products.extras_page_squares} type="productsquare"/>}/>
      <Route path="/home/burgers" element={<CreateSquare data={products.burgers_page_squares} type="productsquare"/>}/>
      <Route path="/home/combos" element={<CreateSquare data={products.combos_page_squares} type="productsquare"/>}/>
      <Route path="/home/drinks" element={<CreateSquare data={products.drinks_page_squares} type="productsquare"/>}/>
      <Route path="/home/coctails" element={<CreateSquare data={products.cocktails_page_squares} type="productsquare"/>}/>
      <Route path="/" exact element={<Main/>}/>
      <Route path="/store" element={<CreateSquare data={products.store_page_squares} type="productsquare"/>}/>
      <Route path="/home/adminmain" element={<CreateSquare data={adminmain.admin_main_btn} type="adminmain"/>}/>
      <Route path="/home/login" element={<popUpConnection />}/>
    </Routes>
    </div>
    </Router>
   );
 }
 export default Navbar1;
 


