/*****************************************
 * * IMPORT LIBRARIES
 *****************************************/

import React from 'react';
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";
import { BsInstagram } from "react-icons/fa";



import './footer.css'
/*****************************************
 * * CREATE REACT FUNCTION COMPONENT
 *****************************************/

function Footer() {
  return (
    <MDBFooter className="font-small pt-4 mt-4 footer">
      <MDBContainer fluid className="text-center text-md-left">
        <MDBRow>
     
          <MDBCol md="6">
            <h5 className="title">חפשו אותנו</h5>
            <ul>
              <li className="list-unstyled">
                <a href="#!" className="footer-social-link">INSTAGRAM</a>
              </li>
              <li className="list-unstyled">
                <a href="#!"  className="footer-social-link">FACEBOOK</a>
              </li>
              <li className="list-unstyled">
                <a href="#!"  className="footer-social-link">TIKTOK</a>
              </li>
              <li className="list-unstyled">
                <a href="#!"  className="footer-social-link">HOMEPAGE</a>
              </li>
          
            </ul>
          </MDBCol>

          <MDBCol md="6">
            <h5 className="title" >קיס בורגר</h5>
            {/* האם עדיף לעשות כDATA?<  */}
            <p> 
             דיינר אמריקאי בסגנון שנות ה80’. בקיס מבחר מנות אמריקאיות ומגוון של מנות פיוז׳ן. ההמבורגר עשוי מ100% בשר בקר טרי הנקצץ מדי יום. שירות משלוחים פעיל ברחבי הקריות מדי יום שעות פעילות : א' 18:00 - ועד אחרון הלקוחות, ב - ש' 12:30 - ועד אחרון הלקוחות. 
         שדרות משה גושן 1 קרית מוצקין 
            </p>
          </MDBCol>

          
        </MDBRow>

        
      </MDBContainer>
      <div className="footer-copyright text-center py-3">
        <MDBContainer fluid>
          &copy; {new Date().getFullYear()} Copyright: <a href="https://www.kissvibe.co.il">KISSVIBE</a>
        </MDBContainer>
      </div>
    </MDBFooter>
  );
}

export default Footer;


// the footer icons: 
// BsInstagram
// BsFacebook
// AiOutlineHome / AiOutlineHome
// FaTiktok