import React, { useEffect } from 'react'
import HomeRegion from '../HomeRegion'
import RegionTile from '../RegionTile'
import './App.css'
import { useLocation } from 'react-router-dom'

const App = ({ isServerRendered, rawData }) => {
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
      <div id="home" />
      <HomeRegion region={region} lastUpdateFormatted={rawData.lastUpdateFormatted} />
      <div id="states" className="region-tiles">
        {rawData.regions.slice(1).map(region => (
          <RegionTile key={region.slug} region={region} />
        ))}
      </div>
    </>
  )
}

export default App