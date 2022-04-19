/*****************************************
 * * IMPORT LIBRARIES
 *****************************************/

 import React from 'react'; 
 import HeartLogo from '../../images/kiss_logo_red.png';
 import Beach from '../../images/beach_with_people.png';
 /*****************************************
  * * CREATE REACT FUNCTION COMPONENT
  *****************************************/
 
 function MainImage() {
   return (
     <div className='main'>
       <div className='parent'>
         <img className='beach-img' src={Beach} alt="Beach with people"/>
         <img className='heart-img' src={HeartLogo} alt="Kissvibe logo"/>
       </div>   
     </div>
   );
 }
 
 export default MainImage;
 