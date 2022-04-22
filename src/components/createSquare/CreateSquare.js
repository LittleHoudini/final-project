/*****************************************
 * * IMPORT LIBRARIES
 *****************************************/

import React from 'react';
import components from '../../data/components';
 /*****************************************
  * * CREATE REACT FUNCTION COMPONENT
  *****************************************/

 function CreateSquare(props) {
  const MyComponent = components[props.type];
  return (
      props.data.map((item,index) => (
      <div key={index}>
        <MyComponent type={props.type} data={item}/>
      </div>
      ))
  );
 }
 
 export default CreateSquare;
 