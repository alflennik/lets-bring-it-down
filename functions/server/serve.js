const fs = require('fs').promises
const moment = require('moment')
const getRawData = require('./getRawData')

// Enable server-side React
require.extensions['.css'] = () => {}
require('@babel/register')
const render = require('../app/serverIndex.jsx')

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

  rawData.lastUpdateFormatted = `Last updated ${moment(rawData.lastUpdateTimestamp).fromNow()}`

  if (serverRenderedPages[req.path]) {
    res.send(serverRenderedPages[req.path])
  } else {
    const indexHtml = await fs.readFile('./index.html', 'utf-8')
    const indexHtmlWithData = indexHtml.replace(
      'RAW_DATA_FROM_SERVER',
      `\`${JSON.stringify(rawData)}\``
    )
    const indexHtmlEscapedForJs = indexHtmlWithData.replace(/\\/g, '\\\\')
    const indexHtmlWithReact = indexHtmlEscapedForJs.replace(
      '<div id="root"></div>',
      render({ rawData, path: req.path })
    )
    res.send(indexHtmlWithReact)
    serverRenderedPages[req.path] = indexHtmlWithReact
  }

  await dataRefreshed
}

module.exports = serve
