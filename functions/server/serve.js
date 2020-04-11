const fs = require('fs').promises
const moment = require('moment-timezone')
const getRawData = require('./getRawData')

// Enable server-side React
require('@babel/register')
// Disable requiring CSS which won't work in Node (remove when styled-components is used everywhere)
require.extensions['.css'] = () => {}

let rawData
let lastFetchedAt
let serverRenderedPages = {}

const startupHasCompleted = getRawData().then(data => {
  rawData = data
  lastFetchedAt = moment()
})

const serve = async (req, res) => {
  if (!rawData) {
    await startupHasCompleted
  }

  if (req.url.includes('?cache=false')) {
    rawData = await getRawData()
    lastFetchedAt = moment()
    serverRenderedPages = {}
  }

  let dataRefreshed
  const isDataStale = moment().diff(lastFetchedAt, 'minutes') > 5
  if (isDataStale) {
    // Kick off an update but continue for now with stale data
    dataRefreshed = getRawData().then(data => {
      rawData = data
      lastFetchedAt = moment()
      serverRenderedPages = {}
    })
  }

  if (serverRenderedPages[req.path]) {
    res.send(serverRenderedPages[req.path])
  } else {
    let reactRenderedSuccessfully
    let reactRoot
    try {
      const render = require('../app/serverIndex.jsx') // eslint-disable-line
      reactRoot = render({ rawData, path: req.path })
      reactRenderedSuccessfully = true
    } catch (error) {
      // Render errors are swallowed on the server because the client's error messages are prettier
      reactRenderedSuccessfully = false
      reactRoot = `<div id="root"></div>`
    }

    const indexHtmlWithoutData = await fs.readFile('./index.html', 'utf-8')
    const indexHtml = indexHtmlWithoutData
      .replace('RAW_DATA_FROM_SERVER', `\`${JSON.stringify(rawData)}\``)
      .replace(/\\/g, '\\\\') // Backslashes must be doubled when JSON is embedded in a JS string

    if (reactRenderedSuccessfully) {
      const indexHtmlWithSsr = indexHtml.replace('<div id="root"></div>', reactRoot)
      serverRenderedPages[req.path] = indexHtmlWithSsr
      res.send(indexHtmlWithSsr)
    } else {
      res.send(indexHtml)
    }
  }

  await dataRefreshed
}

module.exports = serve
