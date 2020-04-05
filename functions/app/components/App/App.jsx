import React, { useEffect } from 'react'
import HomeRegion from '../HomeRegion'
import './App.css'

const App = ({ isServerRendered, rawData }) => {
  useEffect(() => {
    // Make external links open in a new tab
    document.querySelectorAll('a').forEach(element => {
      const firstCharacterOfLink = element.getAttribute('href').slice(0, 1)
      if (firstCharacterOfLink !== '/' && firstCharacterOfLink !== '#') {
        element.setAttribute('target', '_blank')
      }
    })
  }, [])

  return (
    <>
      <HomeRegion region={rawData.regions[0]} lastUpdateFormatted={rawData.lastUpdateFormatted} />
    </>
  )
}

export default App