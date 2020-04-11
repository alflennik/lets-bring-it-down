import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Arrow from './Arrow'

const WrapperDiv = styled.div`
  white-space: nowrap;
`

const DownFromYesterday = ({ today, yesterday }) => {
  const downFromYesterday = today.value < yesterday.value

  const isInGreenZone = today.value <= 0

  let arrowColor
  if (downFromYesterday && isInGreenZone) {
    arrowColor = 'white'
  } else if (downFromYesterday) {
    arrowColor = '#5dffda'
  } else {
    arrowColor = '#1d2458'
  }

  return (
    <WrapperDiv>
      <Arrow color={arrowColor} size='12px' direction={downFromYesterday ? 'down' : 'up'} />
      &nbsp;from&nbsp;
      {yesterday.formattedValue}
    </WrapperDiv>
  )
}

DownFromYesterday.propTypes = {
  today: PropTypes.shape({
    value: PropTypes.number,
    formattedValue: PropTypes.string
  }).isRequired,
  yesterday: PropTypes.shape({
    value: PropTypes.number,
    formattedValue: PropTypes.string
  }).isRequired
}

export default DownFromYesterday
