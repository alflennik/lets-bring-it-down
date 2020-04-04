import React from 'react';
import ReactDOMServer from 'react-dom/server';
import App from './components/App';

const render = () => {
  return ReactDOMServer.renderToString(<App isServerRendered />);
}

module.exports = render
