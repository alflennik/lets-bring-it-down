const fs = require('fs').promises;
const moment = require('moment')
const functions = require('firebase-functions');
const getSheetsData = require('./getSheetsData')

let rawData
let lastFetchedAt

const startupHasCompleted = getSheetsData().then(data => {
  lastFetchedAt = moment()
  rawData = data
})


exports.app = functions.https.onRequest(async (req, res) => {
  if (!rawData) {
    await startupHasCompleted
  }

  const isDataStale = moment().diff(lastFetchedAt, 'minutes') > 5
  if (isDataStale) {
    // Kick off an update but continue for now with stale data
    getSheetsData().then(data => {
      lastFetchedAt = moment()
      rawData =  data
    })
  }

  const indexHtml = await fs.readFile('./index.html', 'utf-8')
  const indexHtmlWithData = indexHtml.replace('RAW_DATA_FROM_SERVER', '`' + JSON.stringify(rawData) + '`')
  res.send(indexHtmlWithData);
});
