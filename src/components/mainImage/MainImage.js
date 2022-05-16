/*****************************************
 * * IMPORT LIBRARIES
 *****************************************/

// import HeartLogo from "../../images/kiss_logo_red.png";
// import Beach from "../../images/beach_with_people.png";
import "./mainimage.css";

import { getDocument } from "../../firebase/Users";
import { useEffect, useState } from "react";
/*****************************************
 * * CREATE REACT FUNCTION COMPONENT
 *****************************************/

//Main image below navbar
export const MainImage  = () => {
	const [imagesData, setImagesData] = useState({
		beach: "",
		heartLogo: ""
	});

	useEffect(()=> {
		getDocument("Product",'images')
		.then((res) => {
			setImagesData(res);
		})
		.catch((err) => console.log(err))
	},[])

	// console.log(imagesData.beach);
	// console.log(imagesData.heartLogo);

	return (

		<div className="main">
			<div className="parent">
				<img className="beach-img" src={imagesData.beach} alt="Beach with people" />
				<img className="heart-img"  src={imagesData.heartLogo} alt="Kissvibe logo" />
			</div>
		</div>
		
	);
	
}
