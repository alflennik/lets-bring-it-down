const functions = require('firebase-functions')
const moment = require('moment-timezone')
const serve = require('./server')

moment.tz.setDefault('America/New_York')

exports.serve = functions.https.onRequest(async (req, res) => {
  await serve(req, res)
})
