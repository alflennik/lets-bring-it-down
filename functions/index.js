const fs = require('fs').promises;
const { GoogleSpreadsheet } = require('google-spreadsheet');
const functions = require('firebase-functions');
const rawData = require('./rawData')
const secrets = require('../secrets')

exports.app = functions.https.onRequest(async (req, res) => {
  const doc = new GoogleSpreadsheet('1D7XaT8E9rsarTX00Co_ksHlWIt-IeEsFOnr5KvjbiuI');
  await doc.useServiceAccountAuth({
    client_email: secrets.client_email, // process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    private_key: secrets.private_key // process.env.GOOGLE_PRIVATE_KEY,
  });
  await doc.loadInfo();
  const sheet = doc.sheetsById['97441358'];
  await sheet.loadCells('A1:B54');
  const sheetsData = {}
  // for (let x = 0; x < 1; x++) {
  //   let headerCell = sheet.getCell(0, x)
  //   const header = headerCell.formattedValue
  //   for (let y = 1; y < 53; y++) {
  //     sheetsData[header] = sheet.getCell(x, y).formattedValue
  //   }
  // }
  console.log(
    sheet.getCell(0, 0).formattedValue,
    sheet.getCell(1, 0).formattedValue,
    // sheet.getCell(0, 1).formattedValue,
    // sheet.getCell(0, 2).formattedValue,
    // sheet.getCell(0, 3).formattedValue,
    // sheet.getCell(1, 1).formattedValue,
    // sheet.getCell(1, 2).formattedValue,
    // sheet.getCell(1, 3).formattedValue,
  )
  // console.log(sheetsData)

  const indexHtml = await fs.readFile('./index.html', 'utf-8')
  const indexHtmlWithData = indexHtml.replace('RAW_DATA_FROM_SERVER', '`' + JSON.stringify(rawData) + '`')
  res.send(indexHtmlWithData);
});
