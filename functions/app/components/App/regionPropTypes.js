import PropTypes from 'prop-types'

const regionPropTypes = PropTypes.shape({
  name: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  image: PropTypes.string, // regions/alaska.svg
  dailyInfectionRates: PropTypes.arrayOf(
    PropTypes.shape({
      formattedValue: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired
    })
  )
})

export default regionPropTypes