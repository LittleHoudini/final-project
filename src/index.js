import ReactDOM from "react-dom";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import React, {StrictMode} from 'react';

// JSX - JavaScript extension
ReactDOM.render(
	<StrictMode>
	<BrowserRouter>
		<App />
	</BrowserRouter>
	</StrictMode>,
	document.querySelector("#root")
);
