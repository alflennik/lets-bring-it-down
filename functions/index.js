const fs = require('fs').promises;
const functions = require('firebase-functions');

exports.app = functions.https.onRequest(async (req, res) => {
  const indexHtml = await fs.readFile('./index.html', 'utf-8')
  res.send(indexHtml);
});
