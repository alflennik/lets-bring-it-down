import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom'
import App from './components/App';

const render = ({ path, rawData }) => {
  const context = {}

  return ReactDOMServer.renderToString(
    <StaticRouter location={path} context={context}>
      <App isServerRendered rawData={rawData} />
    </StaticRouter>
  );
}

module.exports = render
