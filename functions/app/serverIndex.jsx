import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import App from './components/App'
import { ServerStyleSheet } from 'styled-components'

const render = ({ path, rawData }) => {
  const sheet = new ServerStyleSheet()

  const context = {}

  const rootHtml = ReactDOMServer.renderToString(
    sheet.collectStyles(
      <StaticRouter location={path} context={context}>
        <App isServerRendered rawData={rawData} />
      </StaticRouter>
    )
  )

  const styleTags = sheet.getStyleTags()
  sheet.seal()

  return `${styleTags}<div id="root">${rootHtml}</div>`
}

module.exports = render
