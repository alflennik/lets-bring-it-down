const { GoogleSpreadsheet } = require('google-spreadsheet')
const moment = require('moment-timezone')
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
  const sheet = doc.sheetsById['1858367492']
  await sheet.loadCells('A1:CC54')
  return sheet
}

const getSheetsData = async () => {
  const sheet = await loadSheet()

  const dailyNewCaseGrowthByRegion = []
  for (let row = 1; row < 54; row += 1) {
    const region = {}
    const regionNameColumn = 2
    const totalNewCasesColumn = 3
    region.name = sheet.getCell(row, regionNameColumn).formattedValue
    region.dailyNewCaseGrowth = []
    for (let column = 7; column < 37; column += 1) {
      const cell = sheet.getCell(row, column)
      if (cell.formattedValue) {
        region.dailyNewCaseGrowth.push({
          value: cell.value === null ? 0 : cell.value, // 0 will be returned as null
          formattedValue: cell.formattedValue
        })
      } else {
        region.dailyNewCaseGrowth.push(null)
      }
    }

    region.totalNewCases = sheet.getCell(row, totalNewCasesColumn).value

    dailyNewCaseGrowthByRegion.push(region)
  }

  const lastUpdateUnix = sheet.getCellByA1('B2').value
  const lastUpdateTimestamp = moment.unix(lastUpdateUnix).format()

  const faqMarkdown = sheet.getCellByA1('B6').value
  const faqHtml = markdown.render(faqMarkdown)
  return { dailyNewCaseGrowthByRegion, lastUpdateTimestamp, faqHtml }
}

module.exports = getSheetsData
