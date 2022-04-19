/*****************************************
 * * IMPORT LIBRARIES
 *****************************************/

import React from 'react';
import {MDBFooter } from "mdbreact";
import * as FaIcons from "react-icons/fa";
import './footer.css';
/*****************************************
 * * CREATE REACT FUNCTION COMPONENT
 *****************************************/

function Footer() {
  return (
    <MDBFooter bgcolor='light' className='text-center text-lg-start text-muted'>
    <section className='d-flex justify-content-center justify-content-lg-between p-4 border-bottom'>
      <div className='me-5 d-none d-lg-block'>
        <span>Get connected with us on social networks:</span>
      </div>

      <div>
        <a href='#' className='me-4 text-reset'>
          <i><FaIcons.FaInstagram/></i>
        </a>
        <a href='#' className='me-4 text-reset'>
          <i><FaIcons.FaFacebook/></i>
        </a>
        <a href='#' className='me-4 text-reset'>
          <i><FaIcons.FaTiktok/></i>
        </a>
      </div>
    </section>
    <section className=''>
      <div className='container text-center text-md-start mt-5'>
        <div className='row mt-3'>
          <div className='col-md-3 col-lg-4 col-xl-3 mx-auto mb-4'>
            <h6 className='text-uppercase fw-bold mb-4'>
              <i className='fas fa-gem me-3'></i><FaIcons.FaAngleDoubleRight/> KISSVIBE <FaIcons.FaAngleDoubleLeft/>
            </h6>
             <p> 
              דיינר אמריקאי בסגנון שנות ה80’. בקיס מבחר מנות אמריקאיות ומגוון של מנות פיוז׳ן. ההמבורגר עשוי מ100% בשר בקר טרי הנקצץ מדי יום. שירות משלוחים פעיל ברחבי הקריות מדי יום שעות פעילות : א' 18:00 - ועד אחרון הלקוחות, ב - ש' 12:30 - ועד אחרון הלקוחות.  
             </p>
          </div>

          <div className='col-md-2 col-lg-2 col-xl-2 mx-auto mb-4'>
            <h6 className='text-uppercase fw-bold mb-4'>Products</h6>
            <p>
              <a href='#!' className='text-reset'>
                Burgers
              </a>
            </p>
            <p>
              <a href='#!' className='text-reset'>
                Coctails
              </a>
            </p>
            <p>
              <a href='#!' className='text-reset'>
                Extras
              </a>
            </p>
            <p>
              <a href='#!' className='text-reset'>
                Others
              </a>
            </p>
          </div>

          <div className='col-md-3 col-lg-2 col-xl-2 mx-auto mb-4'>
            <h6 className='text-uppercase fw-bold mb-4'>Useful links</h6>
            <p>
              <a href='#!' className='text-reset'>
                Pricing
              </a>
            </p>
            <p>
              <a href='#!' className='text-reset'>
                Settings
              </a>
            </p>
            <p>
              <a href='#!' className='text-reset'>
                Orders
              </a>
            </p>
            <p>
              <a href='#!' className='text-reset'>
                Help
              </a>
            </p>
          </div>

          <div className='col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4'>
            <h6 className='text-uppercase fw-bold mb-4'>Contact</h6>
            <p>
              <i className='fas fa-home me-3'></i> שדרות משה גושן 1, קרית מוצקין
            </p>
            <p>
              <i className='fas fa-envelope me-3'></i>
              kissvibe@gmail.com
            </p>
            <p>
              <i className='fas fa-phone me-3'></i> +9721234567890
            </p>
          </div>
        </div>
      </div>
    </section>

    <div className='text-center p-4' style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
      &copy; {new Date().getFullYear()} Copyright:
      <a className='text-reset fw-bold' href='https://mdbootstrap.com/'>
        kissvibe.co.il
      </a>
    </div>
  </MDBFooter>
  );
}

export default Footer;