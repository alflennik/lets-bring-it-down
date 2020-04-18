import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'

const flipAnimationDurationMs = 500

const Svg = styled.svg`
  fill: ${props => props.color};
  width: ${props => props.size};
  ${props => props.transformationCss};
`

const Path = styled.path`
  ${props =>
    props.isHidden &&
    css`
      display: none;
    `}
`

const Arrow = ({ size, color, direction }) => {
  // Due to a bug in Chrome - that transformations will prevent an element's back face from being
  // hidden - transformations need to be removed when the animation completes (The component's back
  // face will be used by the FlipCard component)
  const [currentBaseDirection, setCurrentBaseDirection] = useState(direction)

  const isAnimating = currentBaseDirection !== direction

  let transformationCss
  const baseTransformation = `color 100ms linear`
  if (isAnimating) {
    transformationCss = css`
      transform: rotate(180deg);
      transition: ${baseTransformation},
        transform ${flipAnimationDurationMs}ms cubic-bezier(0.85, 0, 0.15, 1);
    `
  } else {
    transformationCss = css`
      transform: none;
      transition: ${baseTransformation};
    `
  }

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (currentBaseDirection !== direction) {
        setCurrentBaseDirection(direction)
      }
    }, flipAnimationDurationMs)
    return () => {
      clearTimeout(timeoutId)
    }
  }, [currentBaseDirection, direction])

  return (
    <Svg size={size} color={color} transformationCss={transformationCss} viewBox='0 0 448 512'>
      <Path
        isHidden={currentBaseDirection === 'down'}
        d='M34.9 289.5l-22.2-22.2c-9.4-9.4-9.4-24.6 0-33.9L207 39c9.4-9.4 24.6-9.4 33.9 0l194.3 194.3c9.4 9.4 9.4 24.6 0 33.9L413 289.4c-9.5 9.5-25 9.3-34.3-.4L264 168.6V456c0 13.3-10.7 24-24 24h-32c-13.3 0-24-10.7-24-24V168.6L69.2 289.1c-9.3 9.8-24.8 10-34.3.4z'
      />
      <Path
        isHidden={currentBaseDirection === 'up'}
        d='M413.1 222.5l22.2 22.2c9.4 9.4 9.4 24.6 0 33.9L241 473c-9.4 9.4-24.6 9.4-33.9 0L12.7 278.6c-9.4-9.4-9.4-24.6 0-33.9l22.2-22.2c9.5-9.5 25-9.3 34.3.4L184 343.4V56c0-13.3 10.7-24 24-24h32c13.3 0 24 10.7 24 24v287.4l114.8-120.5c9.3-9.8 24.8-10 34.3-.4z'
      />
    </Svg>
  )
}

Arrow.propTypes = {
  size: PropTypes.string,
  color: PropTypes.string,
  direction: PropTypes.oneOf(['up', 'down']).isRequired
}

Arrow.defaultProps = {
  size: null,
  color: null
}

export default Arrow
