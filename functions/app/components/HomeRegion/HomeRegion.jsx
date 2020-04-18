import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Textfit as TextFit } from 'react-textfit'
import Graph from '../Graph'
import SmoothScrollLink from '../SmoothScrollLink'
import DownFromYesterday from '../DownFromYesterday'
import regionPropTypes from '../App/regionPropTypes'
import './HomeRegion.css'
import FlipCard from '../FlipCard/FlipCard'

const HomeRegion = ({ region, lastUpdateFormatted }) => {
  const [dateOffset, setDateOffset] = useState(0)

  useEffect(() => {
    const { isIncreasing } = region.dailyNewCaseGrowth[dateOffset]
    document.body.style['background-color'] = isIncreasing ? '#ff485e' : '#2ac29f'
  }, [region.slug, region.dailyNewCaseGrowth, dateOffset])

  return (
    <main className='above-fold'>
      <header className='header'>
        <Link className='header-title' to='/'>
          <img src='logo.svg' alt="Let's Bring It Down" />
        </Link>
        <div className='header-menu'>
          <SmoothScrollLink className='header-states' id='#states'>
            States
          </SmoothScrollLink>
          <SmoothScrollLink className='header-faq' id='#faq'>
            FAQ
          </SmoothScrollLink>
        </div>
      </header>

      <div className='center'>
        {region.image ? (
          <img className='center-region-image' alt='Region outline' src={region.image} />
        ) : null}

        <FlipCard
          front={
            <div className='center-wrap'>
              <div className='center-new-case-growth'>
                <TextFit mode='single'>New case growth</TextFit>
              </div>
              <div className='center-region-name'>
                <TextFit mode='single' min={9} max={80}>
                  {region.name}
                </TextFit>
              </div>
              <div className='center-number'>
                {region.dailyNewCaseGrowth[dateOffset].formattedValue}
              </div>
              <DownFromYesterday
                today={region.dailyNewCaseGrowth[dateOffset]}
                yesterday={region.dailyNewCaseGrowth[dateOffset + 1]}
              />
              <Graph
                index={dateOffset}
                dailyNewCaseGrowth={region.dailyNewCaseGrowth}
                onFocus={setDateOffset}
              />
            </div>
          }
          back={<strong>Back</strong>}
        />
        <div className='center-last-update'>{lastUpdateFormatted}</div>
      </div>

      <SmoothScrollLink className='go-down' id='#states'>
        <svg viewBox='0 0 1024 1024'>
          <path d='M512 64q91 0 174 35 81 34 143 96t96 143q35 83 35 174t-35 174q-34 81-96 143t-143 96q-83 35-174 35t-174-35q-81-34-143-96T99 686q-35-83-35-174t35-174q34-81 96-143t143-96q83-35 174-35zm0-64Q373 0 255 68.5T68.5 255 0 512t68.5 257T255 955.5t257 68.5 257-68.5T955.5 769t68.5-257-68.5-257T769 68.5 512 0zm22 695l258-257q9-10 9-23t-9-23q-10-9-23-9t-23 9L511 627 278 394q-10-10-23-10t-23 10q-9 9-9 22t9 23l256 256q10 9 23 9t23-9z' />
        </svg>
      </SmoothScrollLink>
    </main>
  )
}

HomeRegion.propTypes = {
  region: regionPropTypes.isRequired,
  lastUpdateFormatted: PropTypes.string.isRequired
}

export default HomeRegion
