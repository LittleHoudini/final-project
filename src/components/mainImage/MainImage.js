/*****************************************
 * * IMPORT LIBRARIES
 *****************************************/

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
			localStorage.setItem('photos', JSON.stringify(res));
			setImagesData(res);
		})
		.catch((err) => console.log(err))

	},[]);


	useEffect(() => {
		const photos = JSON.parse(localStorage.getItem('photos'));
		if (photos) {
		 setImagesData(photos);
		}
	  }, []);

	return (
		<div className="main">
			<div className="parent">
				<img className="beach-img" src={imagesData.beach} alt="Beach with people" />
				<img className="heart-img"  src={imagesData.heartLogo} alt="Kissvibe logo" />

			</div>
		</div>
	);
	
}
