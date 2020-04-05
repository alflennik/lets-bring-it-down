import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import App from './components/App';
import 'smoothscroll-polyfill'

const rawData = window.rawData
delete window.rawData

ReactDOM.hydrate(
  <BrowserRouter>
    <App isServerRendered={false} rawData={rawData} />
  </BrowserRouter>, 
  document.getElementById('root')
);