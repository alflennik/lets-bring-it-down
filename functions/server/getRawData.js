const slugify = require('slugify')
const moment = require('moment-timezone')
const getSheetsData = require('./getSheetsData')

const slugsWithoutImages = ['puerto-rico']

const getRawData = async () => {
  const { dailyNewCaseGrowthByRegion, lastUpdateTimestamp, faqHtml } = await getSheetsData()

  const lastUpdatedDate = moment(lastUpdateTimestamp).format('YYYY-MM-DD')
  const today = moment().format('YYYY-MM-DD')
  let dayFormatted
  if (lastUpdatedDate === today) {
    dayFormatted = ''
  } else {
    dayFormatted = moment(lastUpdateTimestamp).format('MMM D [at]')
  }
  const timeFormatted = moment(lastUpdateTimestamp).format('h:mm A z')
  const lastUpdateFormatted = `Last Updated ${dayFormatted} ${timeFormatted}`

  const regions = dailyNewCaseGrowthByRegion.map(({ name, dailyNewCaseGrowth: rawRates }) => {
    const slug = slugify(name, { lower: true })

    let image = null
    if (!slugsWithoutImages.includes(slug)) {
      image = `/regions/${slug}.svg`
    }

    const dailyNewCaseGrowth = rawRates.map((rate, index) => {
      if (rate === null) return null

      const { value, formattedValue } = rate

      const isIncreasing = !rawRates[index + 1] || rawRates[index + 1].value <= value

      const date = moment(lastUpdateTimestamp).subtract(index, 'days').format('YYYY-MM-DD')
      const formattedDate = date === today ? 'Today' : moment(date).format('MMM D')

      return { date, formattedDate, value, formattedValue, isIncreasing }
    })

    return { name, dailyNewCaseGrowth, image, slug }
  })

  return { regions, lastUpdateFormatted, faqHtml }
}

module.exports = getRawData
