import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useLocation } from 'react-router-dom'
import styled, { css } from 'styled-components'

const Wrapper = styled.div`
  width: 100%;
  height: ${props => props.height};
  perspective: 1500px;
`

const Inner = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.8s;
  transform-style: preserve-3d;
  -moz-backface-visibility: hidden; /* Fixes transparency quirk in Firefox */

  ${props =>
    props.isFlipped &&
    css`
      transform: rotateY(-180deg);
    `}
`

const Side = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  -webkit-backface-visibility: hidden; /* Safari */
  backface-visibility: hidden;

  ${props =>
    props.isBackside &&
    css`
      transform: rotateY(180deg);
    `}
`

const ArrowWrapper = styled.div`
  position: absolute;
  top: -7px;
  left: 50%;
  transform: translateX(-50%);
  width: 97vw;
  max-width: 340px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`

const ArrowImg = styled.img`
  width: 15px;
  cursor: pointer;
  transition: opacity 0.3s linear;
`

const FlipCard = ({ height, front, back }) => {
  const location = useLocation()

  const [isFlipped, setIsFlipped] = useState(false)
  useEffect(() => {
    setIsFlipped(false)
  }, [location])

  return (
    <>
      <Wrapper height={height}>
        <Inner isFlipped={isFlipped}>
          <Side>{front}</Side>
          <Side isBackside>{back}</Side>
        </Inner>
      </Wrapper>
      <ArrowWrapper>
        <ArrowImg
          style={{ opacity: isFlipped ? 0 : 1 }}
          className='center-yesterday-arrow'
          src='angle-left-solid.svg'
          alt='View back of card'
          onClick={() => {
            setIsFlipped(true)
          }}
        />
        <ArrowImg
          style={{ opacity: isFlipped ? 1 : 0 }}
          className='center-tomorrow-arrow'
          src='angle-right-white.svg'
          alt='View front of card'
          onClick={() => {
            setIsFlipped(false)
          }}
        />
      </ArrowWrapper>
    </>
  )
}

FlipCard.propTypes = {
  height: PropTypes.string.isRequired,
  front: PropTypes.node.isRequired,
  back: PropTypes.node.isRequired
}

export default FlipCard
