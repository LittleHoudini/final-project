/*****************************************
 * * IMPORT LIBRARIES
 *****************************************/

 import React, { Component } from 'react';
 import { home_page_squares } from '../../data/products';
 import CreateSquare from '../createSquare/CreateSquare';
 import './main.css';
 /*****************************************
  * * CREATE REACT FUNCTION COMPONENT
  *****************************************/
 
 //Main Screen - Home Page
 export default class Main extends Component {
   render(){
   return (
     <main className="main">
       <CreateSquare data={home_page_squares} type='square'/>
     </main>
   );
 }
}