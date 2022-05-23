import Burger from "../images/original_burger.jpg";
import Drinks from "../images/drinks.png";
import Sticker from "../images/sticker.png";
import FrontView from "../images/front_view.JPG";

// menu - extras images
// import Fries from "../images/Products/extras/fries.jpg";
// import GreenSalad from "../images/Products/extras/green-salad.jpg";
// menu - burgers and combos images
import CheeseBurger from "../images/Products/burgers/cheese-burger.jpg";
import Crispyburger from "../images/Products/burgers/crispy-burger.jpg";
import OriginalBurger from "../images/Products/burgers/original-burger.jpg";
import VeggiBurger from "../images/Products/burgers/veggi-burger.jpg";
import SmashBurger from "../images/Products/burgers/smash_burger.jpeg";
import PhilliesSteak from "../images/Products/burgers/phillies_steak.jpg";


export const home_page_squares = [
	{
		title: "MENU",
		image: Burger,
		path: "/store",
	},
	{
		title: "ORDER NOW",
		image: Drinks,
		path: "/store",
	},
	{
		title: "OUR STORE",
		image: Sticker,
		path: "/store",
	},
	{
		title: "HOME PAGE",
		image: FrontView,
		path: "/store",
	},
];

export const menu_categories = [
	{
		title: "STARTERS",
		image: Burger,
		path: "/",
	},
	{
		title: "EXTRAS",
		image: Drinks,
		path: "/",
	},
	{
		title: "BURGERS",
		image: Sticker,
		path: "/",
	},
	{
		title: "COMBOS",
		image: FrontView,
		path: "/",
	},
	{
		title: "DRINKS",
		image: FrontView,
		path: "/",
	},
	{
		title: "DESSERTS",
		image: FrontView,
		path: "/",
	},
	{
		title: "COCTAILS",
		image: FrontView,
		path: "/",
	},
];



export const combos_page_squares = [
	{
		title: "אוריגינל",
		image: OriginalBurger,
		text: "רוטב הבית (kiss) חסה מלפפון חמוץ ובצל",
		price: "48.00",
	},
	{
		title: "קריספי צ'יקן",
		image: Crispyburger,
		text: "רוטב קיסר פרגית קריספית חסה ובצל מוחמץ",
		price: "52.00",
	},
	{
		title: "צ'יזבורגר",
		image: CheeseBurger,
		text: "רוטב הבית (kiss) בצל חמוצים וגאודה",
		price: "52.00",
	},
	{
		title: "ווג'י בורגר",
		image: VeggiBurger,
		text: "רוטב קיסר, רוקט, בטטה בפאנקו, גבינת בושה צלויה, אגוזי מלך, דבש ובצל מוחמץ",
		price: "52.00",
	},
	{
		title: "דאבל סמאש",
		image: SmashBurger,
		text: "שתי קציצות סמאש צדר נגיעת מיונז בצל קצוץ דק וחמוצים",
		price: "57.00",
	},
	{
		title: "פילה צ'יז סטייק",
		image: PhilliesSteak,
		text: "לחמניית קראסט אנטריקוט בצל חרוך חלפיניו גבינה אמריקאית ואיולי שום.",
		price: "64.00",
	},
];

