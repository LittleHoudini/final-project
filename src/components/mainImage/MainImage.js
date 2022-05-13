/*****************************************
 * * IMPORT LIBRARIES
 *****************************************/

 import React, { Component } from 'react'; 
 import HeartLogo from '../../images/kiss_logo_red.png';
 import Beach from '../../images/beach_with_people.png';
 import './mainimage.css'
 /*****************************************
  * * CREATE REACT FUNCTION COMPONENT
  *****************************************/
 
 //Main image below navbar 
 export default class MainImage extends Component {
   render(){
   return (
     <div className='main'>
       <div className='parent'>
         <img className='beach-img' src={Beach} alt="Beach with people"/>
         <img className='heart-img' src={HeartLogo} alt="Kissvibe logo"/>
       </div>   
     </div>
   );
 }
}
 

 