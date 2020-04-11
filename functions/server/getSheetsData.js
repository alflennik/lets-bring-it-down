const { GoogleSpreadsheet } = require('google-spreadsheet')
const moment = require('moment')
const Markdown = require('markdown-it')
const functions = require('firebase-functions')

const markdown = new Markdown()

const loadSheet = async () => {
  const { sheets } = functions.config()
  const doc = new GoogleSpreadsheet('1D7XaT8E9rsarTX00Co_ksHlWIt-IeEsFOnr5KvjbiuI')
  await doc.useServiceAccountAuth({
    client_email: sheets.client_email,
    private_key: sheets.private_key.replace(/\\n/g, '\n')
  })
  await doc.loadInfo()
  const sheet = doc.sheetsById['218962479']
  await sheet.loadCells('A1:AI54')
  return sheet
}

const getSheetsData = async () => {
  const sheet = await loadSheet()

  const dailyInfectionRatesByRegion = []
  for (let row = 1; row < 54; row++) {
    let region = {}
    const regionNameColumn = 2
    region.name = sheet.getCell(row, regionNameColumn).formattedValue
    region.dailyInfectionRates = []
    for (let column = 4; column < 34; column++) {
      const cell = sheet.getCell(row, column)
      if (cell.formattedValue) {
        region.dailyInfectionRates.push({
          value: cell.value === null ? 0 : cell.value, // 0 will be returned as null
          formattedValue: cell.formattedValue
        })
      } else {
        region.dailyInfectionRates.push(null)
      }
    }
    dailyInfectionRatesByRegion.push(region)
  }

  const lastUpdateUnix = sheet.getCellByA1('B2').value
  const lastUpdateTimestamp = moment.unix(lastUpdateUnix).format()

  const faqMarkdown = sheet.getCellByA1('B6').value
  const faqHtml = markdown.render(faqMarkdown)
  return { dailyInfectionRatesByRegion, lastUpdateTimestamp, faqHtml }
}

module.exports = getSheetsData
