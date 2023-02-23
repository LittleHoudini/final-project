/*****************************************
 * * IMPORT LIBRARIES
 *****************************************/

import React, { Component } from "react";
import { MDBFooter } from "mdbreact";
import * as FaIcons from "react-icons/fa";
import "./footer.css";
/*****************************************
 * * CREATE REACT FUNCTION COMPONENT
 *****************************************/

//Footer
export default class Footer extends Component {
	render() {
		return (
			<MDBFooter bgcolor="light" className="text-center text-lg-start text-muted footercontainer">
				<section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom"></section>

				<section className="">
					<div className="container text-center text-md-start mt-5">
						<div className="row mt-3">
							<div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
								<h6 className="text-uppercase fw-bold mb-4">
									<i className="fas fa-gem me-3"></i>
									<FaIcons.FaAngleDoubleRight />
									קיס בורגר <FaIcons.FaAngleDoubleLeft />
								</h6>
								<p>
									דיינר אמריקאי בסגנון שנות ה80’. בקיס מבחר מנות אמריקאיות ומגוון של מנות פיוז׳ן. ההמבורגר עשוי מ100% בשר בקר טרי הנקצץ מדי
									יום. שירות משלוחים פעיל ברחבי הקריות מדי יום שעות פעילות : א' 18:00 - ועד אחרון הלקוחות, ב - ש' 12:30 - ועד אחרון הלקוחות.
								</p>
							</div>

							<div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
								<h6 className="text-uppercase fw-bold mb-4">תפריט</h6>
								<p>
									<a href="#!" className="text-reset">
										בורגר
									</a>
								</p>
								<p>
									<a href="#!" className="text-reset">
										קוקטיילים
									</a>
								</p>
								<p>
									<a href="#!" className="text-reset">
										תוספות
									</a>
								</p>
								<p>
									<a href="#!" className="text-reset">
										ראשונות
									</a>
								</p>
								<p>
									<a href="#!" className="text-reset">
										החנות שלנו
									</a>
								</p>
							</div>

							<div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
								<h6 className="text-uppercase fw-bold mb-4">לינקים חיצוניים</h6>
								<p>
									<a href="#!" className="text-reset">
										אינסטגרם
									</a>
								</p>
								<p>
									<a href="#!" className="text-reset">
										טיקטוק
									</a>
								</p>
								<p>
									<a href="#!" className="text-reset">
										פייסבוק
									</a>
								</p>
								{/* <p>
									<a href="#!" className="text-reset">
										GOOGLE
									</a>
								</p> */}
							</div>

							<div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
								<h6 className="text-uppercase fw-bold mb-4">צור קשר</h6>
								<p>
									<i className="fas fa-home me-3"></i> שדרות משה גושן 1, קרית מוצקין
								</p>
								<p>
									<i className="fas fa-envelope me-3"></i>
									kissvibe@gmail.com
								</p>
								<p>
									<i className="fas fa-phone me-3"></i> +9721234567890
								</p>
							</div>
						</div>
					</div>
				</section>

				<div className="text-center p-4 copyright" style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}>
					&copy; {new Date().getFullYear()} Copyright:
					<a className="text-reset fw-bold" href="https://mdbootstrap.com/">
						kissvibe.co.il
					</a>
				</div>
			</MDBFooter>
		);
	}
}
