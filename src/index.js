import React, {StrictMode} from 'react';
import ReactDOM from 'react-dom';

import './index.css';


import App from './App'



// JSX - JavaScript extension
ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>
  , 
  document.querySelector('#root'));

// const h1 = document.createElement('h1');
// h1.textContent = 'Hello Class';
// document.getElementById('root').append(h1);
