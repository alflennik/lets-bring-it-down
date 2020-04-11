import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { useLocation } from 'react-router-dom'
import HomeRegion from '../HomeRegion'
import RegionTile from '../RegionTile'
import './App.css'
import regionPropTypes from './regionPropTypes'

const App = ({ rawData }) => {
  const location = useLocation()

  const slug = location.pathname.slice(1)
  const region = rawData.regions.find(data => data.slug === slug) || rawData.regions[0]

  useEffect(() => {
    // Make external links open in a new tab
    document.querySelectorAll('a').forEach(element => {
      const firstCharacterOfLink = element.getAttribute('href').slice(0, 1)
      if (firstCharacterOfLink !== '/' && firstCharacterOfLink !== '#') {
        element.setAttribute('target', '_blank')
      }
    })
  }, [])

  useEffect(() => {
    document.querySelector('#home').scrollIntoView({ behavior: 'smooth' })
  }, [location.pathname])

  return (
    <>
      <div id='home' />
      <HomeRegion region={region} lastUpdateFormatted={rawData.lastUpdateFormatted} />
      <div id='states' className='region-tiles'>
        {rawData.regions.slice(1).map(tileRegion => (
          <RegionTile key={tileRegion.slug} region={tileRegion} />
        ))}
      </div>
    </>
  )
}

App.propTypes = {
  rawData: PropTypes.shape({
    lastUpdateFormatted: PropTypes.string.isRequired,
    regions: PropTypes.arrayOf(regionPropTypes).isRequired
  }).isRequired
}

export default App
