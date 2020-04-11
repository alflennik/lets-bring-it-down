import React from 'react'
import Arrow from './Arrow'
import styled from 'styled-components'

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

export default DownFromYesterday
