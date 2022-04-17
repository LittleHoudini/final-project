/*****************************************
 * * IMPORT LIBRARIES
 *****************************************/

 import React from 'react';


 import './book.css'
 /*****************************************
  * * CREATE REACT FUNCTION COMPONENT
  *****************************************/
 
 
 // pascal case
 function Book(props) {
   const {author, title, year,desc, image} = props.details;
   
   return (
       <div className='book'>
           <h1>Book Author : {author}</h1>
           <img src={image} alt="book"/>
           <p>Book Title : {title}</p>
           <p>Book Year : {year}</p>
           <p>Book Description : {desc}</p>
       </div>
   );
 }
 
 export default Book;
 