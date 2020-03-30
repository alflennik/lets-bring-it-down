const path = require('path')
const fs = require('fs').promises;
const getSheetsData = require('./getSheetsData')
const slugify = require('slugify')

const getRegion = async ({ name, dailyInfectionRates }) => {
  const slug = slugify(name, { lower: true })

  let imageExists = true
  try {
    await fs.access(path.resolve(__dirname, `../public/regions/${slug}.svg`))
  } catch (error) {
    imageExists = false
  }
  let image = null
  if (imageExists) {
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
  const {
    dailyInfectionRatesByRegion, 
    lastUpdateTimestamp, 
    faqHtml
  } = await getSheetsData()

  const regions = await Promise.all(dailyInfectionRatesByRegion.map(getRegion))

  return { regions, lastUpdateTimestamp, faqHtml }
}

module.exports = getRawData