import Burger from "../images/original_burger.jpg";
import Drinks from "../images/drinks.png";
import Sticker from "../images/sticker.png";
import FrontView from "../images/front_view.JPG";
// menu - starters images
import BafuloWings from "../images/Products/starters/bafulo-wings.JPG";
import GarlicWings from "../images/Products/starters/garlic-wings.JPG";
import CizerSalad from "../images/Products/starters/cizer-salad.jpg";
import Nuggets from "../images/Products/starters/nuggets.jpg";
import Pickels from "../images/Products/starters/pickels.jpg";

import CheddarSticks from "../images/Products/starters/cheddar_sticks.jpg";

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
// menu - drinks images
import Bear from "../images/Products/drinks/bear.jpg";
import CocaCola from "../images/Products/drinks/cocacola.png";
import CocaZero from "../images/Products/drinks/colazero.png";
import Sprite from "../images/Products/drinks/sprite.png";
import Fuztea from "../images/Products/drinks/fuztea.jpg";
import Grapes from "../images/Products/drinks/grapes.jpg";
import Soda from "../images/Products/drinks/soda.jpg";
import Water from "../images/Products/drinks/water.jpg";
// menu -  сocktails images
import BadBoyBeny from "../images/Products/cocktailes/bad_boy_beny.jpg";
import FreshPrime from "../images/Products/cocktailes/fresh_prime.jpg";
import SimplyRed from "../images/Products/cocktailes/simply_red.jpg";
import PinkKiss from "../images/Products/cocktailes/pink_kiss.jpg";

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

export const store_page_squares = [
	{
		title: "STORE TEST 1",
		image: Burger,
		text: "SEND NUDES",
	},
	{
		title: "STORE TEST 2",
		image: Drinks,
	},
];

export const burgers_page_squares = [
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

export const starters_page_squares = [
	{
		title: "באפלו ווינגס",
		image: BafuloWings,
		text: "כנפיים פיקנטיות ברוטב אמריקאי עם דיפ של גבינה כחולה",
		price: "39.00",
	},
	{
		title: "גארליק פרמז'ן",
		image: GarlicWings,
		text: "כנפיים ברוטב גבינתי של שום פרמזן ותבלינים",
		price: "39.00",
	},
	{
		title: "סלט קיסר",
		image: CizerSalad,
		text: "חסה, קרוטונים, איולי קיסר ופרמז'ן",
		price: "28.00",
	},
	{
		title: "נאגטס",
		image: Nuggets,
		text: "5 יחידות של נגסי עוף בעבודת יד ומוגש עם רוטב איולי קרמל",
		price: "26.00",
	},
	{
		title: "פיקלס",
		image: Pickels,
		text: "כנפיים פיקנטיות ברוטב אמריקאי עם דיפ של גבינה כחולה",
		price: "22.00",
	},
	{
		title: "צ'דר סטיקס",
		image: CheddarSticks,
		text: "כנפיים פיקנטיות ברוטב אמריקאי עם דיפ של גבינה כחולה",
		price: "28.00",
	},
];


// export const extras_page_squares = [
// 	{
// 		title: "צ'יפס",
// 		image: Fries,
// 		text: "",
// 		price: "19.00",
// 	},
// 	{
// 		title: "סלט ירוק",
// 		image: GreenSalad,
// 		text: "",
// 		price: "19.00",
// 	},
// 	{
// 		title: "טבעות בצל - חסר",
// 		image: GreenSalad,
// 		text: "",
// 		price: "22.00",
// 	},
// ];

export const drinks_page_squares = [
	{
		title: "פחית קולה",
		image: CocaCola,
		price: "10.00",
	},
	{
		title: "פחית זירו",
		image: CocaZero,
		price: "10.00",
	},
	{
		title: "ספרייט",
		image: Sprite,
		price: "10.00",
	},
	{
		title: "פיוזטי",
		image: Fuztea,
		text: "",
		price: "10.00",
	},
	{
		title: "ענבים",
		image: Grapes,
		price: "10.00",
	},
	{
		title: "סודה",
		image: Soda,
		price: "10.00",
	},
	{
		title: "מים מינרלים",
		image: Water,
		price: "10.00",
	},
	{
		title: "בירה לאגר אמריקאית ",
		image: Bear,
		price: "19.00",
	},
];

export const cocktails_page_squares = [
	{
		title: "BAD BOY BENY",
		image: BadBoyBeny,
		text: "על בסיס רום בטעם מלון",
		price: "19.00",
	},
	{
		title: "FRESH PRIME",
		image: FreshPrime,
		text: "על בסיס רום בטעם ליצ'י ופספילורה",
		price: "19.00",
	},
	{
		title: "SIMPLY RED",
		image: SimplyRed,
		text: "על בסיס גי'ן בטעם פירות יער",
		price: "19.00",
	},
	{
		title: "PINK KISS",
		image: PinkKiss,
		text: "קוקטייל בסיס ליקר בטעם ליצי",
		price: "19.00",
	},
];
