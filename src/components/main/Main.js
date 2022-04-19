/*****************************************
 * * IMPORT LIBRARIES
 *****************************************/

import React from 'react';
import Square from '../square/Square';

import './main.css';
import {home_page_squares} from './data';
/*****************************************
 * * CREATE REACT FUNCTION COMPONENT
 *****************************************/

function Main() {
  return (
    <main className="main">
      {
      home_page_squares.map((item,index) => (
        <div key={index}>
          <Square data={item} />
        </div>
      ))
      }      
    </main>
  );
}

export default Main;
