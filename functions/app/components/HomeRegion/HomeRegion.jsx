import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Link, useLocation } from 'react-router-dom'
import { Textfit as TextFit } from 'react-textfit'
import styled, { css } from 'styled-components'
import Graph from '../Graph'
import SmoothScrollLink from '../SmoothScrollLink'
import DownFromYesterday from '../DownFromYesterday'
import regionPropTypes from '../App/regionPropTypes'
import FlipCard from '../FlipCard/FlipCard'

const WrapperDiv = styled.div`
  color: white;
  height: 100vh;
  min-height: 500px;
  position: relative;
`

const Header = styled.header`
  display: grid;
  grid-template-columns: minmax(150px, 300px) auto;
  grid-gap: 1.5rem;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  padding: 1.5rem;
`

const HeaderTitleLink = styled(Link)`
  color: white;
  text-decoration: none;

  img {
    display: block;
    width: 100%;
  }
  span {
    display: inline-block;
    color: #ff485e;
    background-color: white;
    padding: 2px 3px;
    text-transform: uppercase;
  }
`

const HeaderSmoothScrollLink = styled(SmoothScrollLink)`
  color: white;
  text-decoration: none;
  font-size: 20px;
`

const HeaderMenuDiv = styled.div`
  display: flex;
  font-weight: bold;
  align-items: center;
  & > :first-child {
    margin-right: 1.5rem;
  }
  @media (max-width: 600px) {
    .header-faq,
    .header-states {
      font-size: 16px;
    }
    .header-menu > :first-child {
      margin-right: 0.75rem;
    }
  }
`

const CenteredDiv = styled.div`
  text-align: center;
  position: absolute;
  left: 15px;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
`

const VerticallyCenter = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  ${props =>
    props.separateContent &&
    css`
      height: 100%;
      max-height: 250px;
      justify-content: space-between;
    `};
`

const BigNumberDiv = styled.div`
  font-size: 100px;
  font-weight: bold;
  line-height: 1;
`

const CardHeadlineStyles = css`
  font-size: 18px;
  font-weight: bold;
  text-transform: uppercase;
  white-space: nowrap;
`

const LabelDiv = styled.div`
  ${CardHeadlineStyles}
  line-height: 1;
  margin: 0 auto;
`

const ValueDiv = styled.div`
  ${CardHeadlineStyles}
  margin-top: 5px;
  letter-spacing: 6px;
  line-height: 1;
  width: 290px;
`

const LastUpdateDiv = styled.div`
  font-size: 17px;
  font-weight: 500;
  margin-top: 80px;
`

const RegionImg = styled.img`
  position: absolute;
  max-width: 900px;
  width: 100%;
  max-height: 70vh;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: -1;
`

const GoDownSmoothScrollLink = styled(SmoothScrollLink)`
  position: absolute;
  width: 30px;
  height: 30px;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  svg {
    fill: white;
  }
  @media (max-height: 500px) {
    display: none;
  }
`

const HomeRegion = ({ region, lastUpdateFormatted }) => {
  const [dateOffset, setDateOffset] = useState(0)
  const location = useLocation()

  useEffect(() => {
    const { isIncreasing } = region.dailyNewCaseGrowth[dateOffset]
    document.body.style['background-color'] = isIncreasing ? '#ff485e' : '#2ac29f'
  }, [region.slug, region.dailyNewCaseGrowth, dateOffset])

  useEffect(() => {
    setDateOffset(0)
  }, [location.pathname])

  return (
    <WrapperDiv>
      <Header>
        <HeaderTitleLink to='/'>
          <img src='logo.svg' alt="Let's Bring It Down" />
        </HeaderTitleLink>
        <HeaderMenuDiv>
          <HeaderSmoothScrollLink id='#states'>States</HeaderSmoothScrollLink>
          <HeaderSmoothScrollLink id='#faq'>FAQ</HeaderSmoothScrollLink>
        </HeaderMenuDiv>
      </Header>

      <CenteredDiv>
        {region.image ? <RegionImg alt='Region outline' src={region.image} /> : null}

        <FlipCard
          height='350px'
          front={
            <VerticallyCenter>
              <LabelDiv>New case growth</LabelDiv>
              <ValueDiv>
                <TextFit mode='single' min={9} max={80}>
                  {region.name}
                </TextFit>
              </ValueDiv>
              <BigNumberDiv>{region.dailyNewCaseGrowth[dateOffset].formattedValue}</BigNumberDiv>
              <DownFromYesterday
                today={region.dailyNewCaseGrowth[dateOffset]}
                yesterday={region.dailyNewCaseGrowth[dateOffset + 1]}
              />
              <Graph
                index={dateOffset}
                dailyNewCaseGrowth={region.dailyNewCaseGrowth}
                onFocus={setDateOffset}
              />
            </VerticallyCenter>
          }
          back={
            <VerticallyCenter separateContent>
              <div>
                <LabelDiv>Total New Cases</LabelDiv>
                <ValueDiv>
                  <TextFit mode='single' min={9} max={80}>
                    {region.totalNewCases}
                  </TextFit>
                </ValueDiv>
              </div>
              <div>
                <LabelDiv>New case doubling in</LabelDiv>
                <ValueDiv>
                  <TextFit mode='single' min={9} max={80}>
                    {region.dailyNewCaseGrowth[dateOffset].doublingInDays} days
                  </TextFit>
                </ValueDiv>
              </div>
            </VerticallyCenter>
          }
        />
        <LastUpdateDiv>{lastUpdateFormatted}</LastUpdateDiv>
      </CenteredDiv>

      <GoDownSmoothScrollLink id='#states'>
        <svg viewBox='0 0 1024 1024'>
          <path d='M512 64q91 0 174 35 81 34 143 96t96 143q35 83 35 174t-35 174q-34 81-96 143t-143 96q-83 35-174 35t-174-35q-81-34-143-96T99 686q-35-83-35-174t35-174q34-81 96-143t143-96q83-35 174-35zm0-64Q373 0 255 68.5T68.5 255 0 512t68.5 257T255 955.5t257 68.5 257-68.5T955.5 769t68.5-257-68.5-257T769 68.5 512 0zm22 695l258-257q9-10 9-23t-9-23q-10-9-23-9t-23 9L511 627 278 394q-10-10-23-10t-23 10q-9 9-9 22t9 23l256 256q10 9 23 9t23-9z' />
        </svg>
      </GoDownSmoothScrollLink>
    </WrapperDiv>
  )
}

HomeRegion.propTypes = {
  region: regionPropTypes.isRequired,
  lastUpdateFormatted: PropTypes.string.isRequired
}

export default HomeRegion
