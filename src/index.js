import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './Firebase.Config';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
//import 'simplebar/dist/simplebar.min.css'

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
