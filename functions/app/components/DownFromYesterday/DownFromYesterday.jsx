import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Arrow from './Arrow'

const WrapperDiv = styled.div`
  white-space: nowrap;
`

const DownFromYesterday = ({ today, yesterday }) => {
  const downFromYesterday = today.value < yesterday.value
  return (
    <WrapperDiv>
      <Arrow
        size='12px'
        color={downFromYesterday ? '#5dffda' : '#1d2458'}
        direction={downFromYesterday ? 'down' : 'up'}
      />
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
