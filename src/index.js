import React, {StrictMode} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App'





// JSX - JavaScript extension
ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>
  , 
  document.querySelector('#root'));