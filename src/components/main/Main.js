/*****************************************
 * * IMPORT LIBRARIES
 *****************************************/

 import React from 'react';
 import { home_page_squares } from '../../data/products';
 import CreateSquare from '../createSquare/CreateSquare';
 import './main.css';
 // import {home_page_squares} from './data';
 /*****************************************
  * * CREATE REACT FUNCTION COMPONENT
  *****************************************/
 
 function Main() {
   return (
     <main className="main">
       <CreateSquare data={home_page_squares} type='square'/>
     </main>
   );
 }
 
 export default Main; 