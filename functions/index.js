const fs = require('fs').promises;
const moment = require('moment')
const functions = require('firebase-functions');
const getRawData = require('./getRawData')

// Enable server-side React
require('@babel/register') 
require.extensions['.css'] = () => {};
const render = require('./app/serverIndex.jsx')

let rawData
let lastFetchedAt

const startupHasCompleted = getRawData().then(data => {
  rawData = data
  lastFetchedAt = moment()
})


exports.app = functions.https.onRequest(async (req, res) => {  
  if (!rawData) {
    await startupHasCompleted
  }

  if (req.url.includes('?cache=false')) {
    rawData = await getRawData()
    lastFetchedAt = moment()
  }

  const isDataStale = moment().diff(lastFetchedAt, 'minutes') > 5
  if (isDataStale) {
    // Kick off an update but continue for now with stale data
    getRawData().then(data => {
      rawData =  data
      lastFetchedAt = moment()
    })
  }

  rawData.lastUpdateFormatted = 'Last updated ' + moment(rawData.lastUpdateTimestamp).fromNow()

  const indexHtml = await fs.readFile('./index.html', 'utf-8')
  const indexHtmlWithData = indexHtml.replace('RAW_DATA_FROM_SERVER', '`' + JSON.stringify(rawData) + '`')
  const indexHtmlEscapedForJs = indexHtmlWithData.replace(/\\/g, "\\\\")
  const indexHtmlWithReact = indexHtmlEscapedForJs.replace(
    '<div id="root"></div>',
    render({ rawData, path: req.path })
  )
  res.send(indexHtmlWithReact);
});
