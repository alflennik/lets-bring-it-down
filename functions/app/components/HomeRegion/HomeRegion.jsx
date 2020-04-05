import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import SmoothScrollLink from '../SmoothScrollLink'
import regionPropTypes from '../App/regionPropTypes'
import './HomeRegion.css'

      // Populate primary region data with the United States as a fallback
      // const slug = window.location.pathname.slice(1)
      // const region = rawData.regions.find(data => data.slug === slug) || rawData.regions[0]

      // document.querySelector('#yesterday-arrow').addEventListener('click', () => {
      //   document.querySelector('#center-card').classList.add('flip-card-flipped')
      //   document.querySelector('#yesterday-arrow').style.opacity = 0
      //   document.querySelector('#tomorrow-arrow').style.opacity = 1
      // })
      // document.querySelector('#tomorrow-arrow').addEventListener('click', () => {
      //   document.querySelector('#center-card').classList.remove('flip-card-flipped')
      //   document.querySelector('#tomorrow-arrow').style.opacity = 0
      //   document.querySelector('#yesterday-arrow').style.opacity = 1
      // })

const HomeRegion = ({ region, lastUpdateFormatted }) => {
  return (
    <main className="above-fold">
      <header className="header">
        <Link className="header-title" to="/">
          <img src="logo.svg" alt="Let's Bring It Down" />  
        </Link>
        <div className="header-menu">
          <SmoothScrollLink className="header-states" id="#states">States</SmoothScrollLink>
          <SmoothScrollLink className="header-faq" id="#faq">FAQ</SmoothScrollLink>
        </div>
      </header>

      <div className="center">
        {region.image 
          ? <img className="center-region-image" alt="Picture of region" src={region.image} />
          : null}
        <div id="center-card" className="flip-card">
          <div className="flip-card-inner">
            <div className="flip-card-front">
              <div className="center-infection-rate">
                Infection Spread Rate<br /><span>Today</span>
              </div>
              <div className="center-number">{region.dailyInfectionRates[0].formattedValue}</div>
              <div className="center-region-name">{region.name}</div>
            </div>
            <div className="flip-card-back">
              <div className="center-infection-rate">
                Infection Spread Rate<br /><span>Yesterday</span>
              </div>
              <div className="center-number">{region.dailyInfectionRates[1].formattedValue}</div>
              <div className="center-region-name">{region.name}</div>
            </div>
          </div>
        </div>
        <div className="center-arrow-wrapper">
          <img 
            id="yesterday-arrow"
            className="center-yesterday-arrow"
            src="angle-left-solid.svg"
            alt="View yesterday"
          />
          <img 
            id="tomorrow-arrow"
            className="center-tomorrow-arrow"
            src="angle-right-white.svg"
            alt="View tomorrow"
            style={{ opacity: '0'}}
          />
        </div>
        <div className="center-last-update">{lastUpdateFormatted}</div>
      </div>

      <SmoothScrollLink className="go-down" id="#states">
        <svg viewBox="0 0 1024 1024"><path d="M512 64q91 0 174 35 81 34 143 96t96 143q35 83 35 174t-35 174q-34 81-96 143t-143 96q-83 35-174 35t-174-35q-81-34-143-96T99 686q-35-83-35-174t35-174q34-81 96-143t143-96q83-35 174-35zm0-64Q373 0 255 68.5T68.5 255 0 512t68.5 257T255 955.5t257 68.5 257-68.5T955.5 769t68.5-257-68.5-257T769 68.5 512 0zm22 695l258-257q9-10 9-23t-9-23q-10-9-23-9t-23 9L511 627 278 394q-10-10-23-10t-23 10q-9 9-9 22t9 23l256 256q10 9 23 9t23-9z"></path></svg>
      </SmoothScrollLink>
    </main>
  )
}

HomeRegion.propTypes = {
  region: regionPropTypes.isRequired,
  lastUpdateFormatted: PropTypes.string.isRequired,
}

export default HomeRegion