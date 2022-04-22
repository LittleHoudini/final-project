/*****************************************
 * * IMPORT LIBRARIES
 *****************************************/

 import React from 'react';
 import Styles from './adminpanel.module.css';
 
 /*****************************************
  * * CREATE REACT FUNCTION COMPONENT
  *****************************************/

 function AdminMain(props) {
    const {title} = props.data;
   return (
       <div className={Styles.wrapper3}>
        <button className={Styles.btn}>{title}</button>
       </div>
   );
 }
 
 export default AdminMain;
 