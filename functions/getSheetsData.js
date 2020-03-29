const { GoogleSpreadsheet } = require('google-spreadsheet');
const slugify = require('slugify')
const moment = require('moment')
const Markdown = require('markdown-it');
const functions = require('firebase-functions');

const markdown = new Markdown()

const getSheetsData = async () => {
  const { sheets } = functions.config()
  const doc = new GoogleSpreadsheet('1D7XaT8E9rsarTX00Co_ksHlWIt-IeEsFOnr5KvjbiuI');
  await doc.useServiceAccountAuth({
    client_email: sheets.client_email,
    private_key: sheets.private_key.replace(/\\n/g, '\n')
  });
  await doc.loadInfo();
  const sheet = doc.sheetsById['97441358'];
  await Promise.all([sheet.loadCells('A1:B54'), sheet.loadCells('C1:D2')])

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
  const lastUpdateTimestamp = moment.unix(lastUpdateUnix).format()
  
  const faqMarkdown = sheet.getCellByA1('D2').value
  const faqHtml = markdown.render(faqMarkdown)
  return { lastUpdateTimestamp, regions, faqHtml }
}

module.exports = getSheetsData