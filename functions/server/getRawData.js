const slugify = require('slugify')
const getSheetsData = require('./getSheetsData')

const slugsWithoutImages = ['puerto-rico']

const getRegion = async ({ name, dailyInfectionRates }) => {
  const slug = slugify(name, { lower: true })

  let image = null
  if (!slugsWithoutImages.includes(slug)) {
    image = `/regions/${slug}.svg`
  }

  return {
    name,
    dailyInfectionRates,
    image,
    slug: slugify(name, { lower: true })
  }
}

const getRawData = async () => {
  const { dailyInfectionRatesByRegion, lastUpdateTimestamp, faqHtml } = await getSheetsData()

  const regions = await Promise.all(dailyInfectionRatesByRegion.map(getRegion))

  return { regions, lastUpdateTimestamp, faqHtml }
}

module.exports = getRawData
