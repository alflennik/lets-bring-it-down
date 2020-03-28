const fs = require('fs').promises;
const functions = require('firebase-functions');
const rawData = require('./rawData')

exports.app = functions.https.onRequest(async (req, res) => {
  const indexHtml = await fs.readFile('./index.html', 'utf-8')
  const indexHtmlWithData = indexHtml.replace('RAW_DATA_FROM_SERVER', '`' + JSON.stringify(rawData) + '`')
  res.send(indexHtmlWithData);
});
