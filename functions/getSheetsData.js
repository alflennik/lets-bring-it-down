const { GoogleSpreadsheet } = require('google-spreadsheet');
const slugify = require('slugify')
const moment = require('moment')
const secrets = require('../secrets')

const getSheetsData = async () => {
  const doc = new GoogleSpreadsheet('1D7XaT8E9rsarTX00Co_ksHlWIt-IeEsFOnr5KvjbiuI');
  await doc.useServiceAccountAuth({
    client_email: secrets.client_email, // process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    private_key: secrets.private_key // process.env.GOOGLE_PRIVATE_KEY,
  });
  await doc.loadInfo();
  const sheet = doc.sheetsById['97441358'];
  await sheet.loadCells('A1:C54');
  const regions = []
  for (let y = 1; y < 54; y++) {
    let region = {}
    for (let x = 0; x < 2; x++) {
      let column = sheet.getCell(0, x).formattedValue
      region[column] = sheet.getCell(y, x).formattedValue
    }
    region.slug = slugify(region.name, { lower: true })
    regions.push(region)
  }
  regions[0].image = 'united-states.svg'

  const lastUpdateUnix = sheet.getCellByA1('C2').value
  const lastUpdate = moment.unix(lastUpdateUnix).format()
  return { lastUpdate, regions }
}

module.exports = getSheetsData