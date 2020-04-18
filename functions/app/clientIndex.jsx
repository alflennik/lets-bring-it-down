import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import smoothscroll from 'smoothscroll-polyfill'
import App from './components/App'

smoothscroll.polyfill()

const rawData = window.rawData // eslint-disable-line prefer-destructuring
delete window.rawData

ReactDOM.hydrate(
  <BrowserRouter>
    <App isServerRendered={false} rawData={rawData} />
  </BrowserRouter>,
  document.getElementById('root')
)
