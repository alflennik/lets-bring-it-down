const functions = require('firebase-functions')
const serve = require('./server')

exports.serve = functions.https.onRequest(async (req, res) => {
  await serve(req, res)
})
